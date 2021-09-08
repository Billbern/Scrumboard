import * as d3 from 'd3';
import moment from 'moment';
import { Component, createRef } from "react";
import { connect } from 'react-redux';


class HeatMap extends Component {

    static timeout = null;

    constructor() {
        super();
        this.heatRef = createRef();
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            const newData = this.genData(this.props);
            this.createMap(newData);
        }, 300)
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    genData(props) {
        let xpos = 1;
        let ypos = 1;
        let data = [[], [], [], [], []];
        let width = (parseInt(d3.select('#heatCon').style('width')) - 72) / 14;
        let height = (parseInt(d3.select('#heatCon').style('height')) - 64) / 5;
        for (let k = 0; k < 5; k++) {
            for (let j = 0; j < 14; j++) {
                data[k].push({ x: xpos, y: ypos, width, height, week: k + 1, day: j + 1, value: 0 })
                xpos += width;
            }
            xpos = 1;
            ypos += height;
        }
        props.state.forEach(item => {
            data[Math.ceil(moment(item.createAt).date() / 7) - 1].forEach(content => {
                if (moment(item.createAt).month() < moment().month()) {
                    if ((content.day) === moment(item.createAt).day() + 1) {
                        content.value += 1;
                        content.date = item.createAt;
                    }
                } else {
                    if ((content.day - 7) === moment(item.createAt).day() + 1) {
                        content.value += 1;
                        content.date = item.createAt;
                    }
                }
            })
        })
        return data;
    }

    createMap(data) {
        const colors = ['rgb(0,76,109)', 'rgb(105, 150, 179)', 'rgb(171, 210, 236)', 'rgb(193, 231, 255)'];
        const margin = { top: 32, right: 24, bottom: 32, left: 48 }
        const speck = {
            mnt: [moment().subtract(1, 'month').format('MMM'), moment().format('MMM')],
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            width: parseInt(d3.select('#heatCon').style('width')) - margin.left - margin.right,
            height: parseInt(d3.select('#heatCon').style('height')) - margin.top - margin.bottom,
            color: d => d.value === 0 ? colors[3] : d.value < 5 ? colors[2] : d.value > 5 && d.value < 10 ? colors[1] : colors[0],
            text: d => (d.value === 0) || (d.value === 1)  ? `Activity ${d.value}` : `${d.date ? moment(d.date).format('MMM DD, YYYY') : ''}\nActivities ${d.value}`,
        }
        const svg = d3.select(this.heatRef.current);
        const group = svg.append('g').attr("transform", `translate(${margin.left}, ${margin.top})`)

        const mAxis = d3.axisBottom(d3.scaleBand().domain(d3.range(2)).range([0, speck.width]))
            .tickFormat(i => speck.mnt[i]).tickSizeInner(0)
        group.append('g').attr("transform", `translate(0, -${margin.top / 1.5})`)
            .call(mAxis).attr("font-size", 14).call(g => g.select(".domain").remove())
        const xAxis = d3.axisBottom(d3.scaleBand().domain(d3.range(14)).range([0, speck.width]))
            .tickFormat(i => i >= 7 ? speck.days[i - 7] : speck.days[i]).tickSizeOuter(0)
        group.append('g').attr("transform", `translate(0, ${speck.height})`)
            .call(xAxis).attr("font-size", 14).call(g => g.select(".domain").remove())
        const yAxis = d3.axisLeft(d3.scaleBand().domain(d3.range(5)).range([0, speck.height]))
            .tickFormat(i => `Wk ${i + 1}`).tickSizeOuter(0)
        group.append('g').call(yAxis).attr("font-size", 14).call(g => g.select(".domain").remove())

        const row = group.selectAll(".row").data(data).enter().append("g").attr("class", "row")
        row.selectAll(".cell").data(d => d).enter().append("rect").attr("class", "cell")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("width", d => d.width)
            .attr("height", d => d.height)
            .style("fill", d => speck.color(d))
            .style("stroke", "#fff")
            .style("stroke-width", 4)
            .append("title").text(d => speck.text(d))

    }

    render() {
        return (
            <div id="heatCon" className="h-full flex items-center justify-center">
                <svg className="h-full w-full" ref={this.heatRef}>

                </svg>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state.scrumer.logs
    }
}

export default connect(mapStateToProps,)(HeatMap);