import * as d3 from 'd3';
import moment from "moment";
import { connect } from 'react-redux';
const { Component, createRef } = require("react");


class HistoChart extends Component {

    constructor() {
        super();
        this.histRef = createRef();
    }

    componentDidMount() {
        const newData = this.groupData();
        this.createHist(newData);
    }


    groupData() {
        let tickets = [];
        this.props.state.tasks.forEach(item => {
            if (item.stage === 'todo') {
                tickets.push({x: moment().diff(moment(item.updatedAt), "days"), y: 0})
            }
            if (item.stage === 'inprogress') {
                tickets.push({x: moment().diff(moment(item.updatedAt), "days"), y: 25})
            }
            if (item.stage === 'intest/review') {
                tickets.push({x: moment().diff(moment(item.updatedAt), "days"), y: 50})
            }
            if (item.stage === 'done') {
                tickets.push({x: moment().diff(moment(item.updatedAt), "days"), y: 75})
            }
        })
        return tickets
    }


    createHist(data) {
        const bins = d3.bin().thresholds(14)(data);
        const margin = { top: 20, right: 5, bottom: 10, left: 20 }
        const width = parseInt(d3.select('#histCon').style('height'));
        const height = parseInt(d3.select('#histCon').style('height'));

        const x = d3.scaleLinear().domain([bins[0].x0, bins[bins.length - 1].x1]).range([margin.left, width - margin.right]);
        const y = d3.scaleLinear().domain([0, d3.max(bins, d => { return d.length })]).nice().range([height - margin.bottom, margin.top]);

        const svg = d3.select(this.histRef.current).attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom])
        svg.append("g").attr("fill", "steelblue").selectAll("rect").data(bins).join("rect").attr("x", d => x(d.x0) + 1)
            .attr("width", d => Math.max(0, x(d.x1) - 1))
            .attr("y", d => y(d.length)).attr("height", d => y(0) - y(d.length));

        const xAxis = g => g.attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
            .call(g => g.append("text").attr("x", width - margin.right)
                .attr("y", -4)
                .attr("fill", "currentColor")
                .attr("font-weight", "bold")
                .attr("text-anchor", "end")
                .text(data.x))
        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 4)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(data.y))
        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);
    }


    render() {
        return (
            <div id="histCon" className="h-full flex items-center justify-center">
                <svg className="h-full w-full" ref={this.histRef}>

                </svg>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state.scrumer
    }
}

export default connect(mapStateToProps,)(HistoChart);