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
        let width = (parseInt(d3.select('#heatCon').style('width')) - 72) / 7;
        let height = (parseInt(d3.select('#heatCon').style('height')) - 64) / 5;
        let data = [[], [], [], [], []];
        for (let k = 0; k < 5; k++) {
            for (let j = 0; j < 7; j++) {
                data[k].push({ x: xpos, y: ypos, width, height, week: k + 1, day: j + 1, value: 0 })
                xpos += width;
            }
            xpos = 1;
            ypos += height;
        }
        props.state.forEach(item => {
            data[Math.ceil(moment(item.createAt).date() / 7) - 1].forEach(content => {
                if( content.day === moment(item.createAt).day() + 1 ){
                    content.value += 1;
                    content.date = item.createAt;
                }
            })
        })
        return data;
    }

    createMap(data) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const speck = {
            color: d => d.value === 0 ? "#efefef": d.value < 5 ? "#94bbd7" : d.value > 5 && d.value < 10 ? "#76aacc" : "#1978b6",
            margin: { top: 16, right: 24, bottom: 16, left: 24 },
            width: parseInt(d3.select('#heatCon').style('width')) - 24,
            height: parseInt(d3.select('#heatCon').style('height')) - 32
        }
        const svg = d3.select(this.heatRef.current);

        const group = svg.append('g').attr("transform", `translate(${speck.margin.left + 24}, ${speck.margin.top * 2})`)

        const row = group.selectAll(".row").data(data).enter().append("g").attr("class", "row")
        row.selectAll(".cell").data(d => d).enter().append("rect").attr("class", "cell")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("width", d => d.width)
            .attr("height", d => d.height)
            .style("fill", d => speck.color(d) ).style("stroke", "#fff").style("stroke-width", 4)
            .append("title").text(d => d.value === 0 ? `Activity ${d.value}` : `${ d.date ? moment(d.date).format('MMM DD, YYYY') : ''}\nActivities ${d.value}`)

        const xAxis = d3.axisBottom(d3.scaleBand().domain(d3.range(7)).range([speck.margin.left + 24, speck.width]))
            .tickFormat(i => days[i]).tickSizeOuter(0)
        svg.append('g').attr("transform", `translate(0, ${speck.height})`)
            .call(xAxis).call(g => g.select(".domain").remove())
        const yAxis = d3.axisLeft(d3.scaleBand().domain(d3.range(5)).range([speck.margin.top * 2 , speck.height]))
            .tickFormat(i => `Wk ${i + 1}`).tickSizeOuter(0)
        svg.append('g').attr("transform", `translate(${speck.margin.left + 24}, 0)`)
            .call(yAxis).call(g => g.select(".domain").remove())
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

const mapStateToProps = state =>{
    return {
        state : state.scrumer.logs
    }
}

export default connect(mapStateToProps, )(HeatMap);