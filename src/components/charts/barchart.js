import * as d3 from 'd3';
import { connect } from 'react-redux';
const { Component, createRef } = require("react");

let timer = null;

class BarChart extends Component {

    
    constructor() {
        super();
        this.barRef = createRef();
    }
    
    componentDidMount() {
        timer = setTimeout(() => {
            const newData = this.groupData(this.props.state);
            this.createHist(newData);
        }, 100);
    }

    componentWillUnmount() {
        clearTimeout(timer);
    }


    groupData(state) {
        let done = { name: 'Done', value: 0 }
        let todo = { name: 'Todo', value: 0 }
        let intest = { name: 'In Test/Review', value: 0 }
        let inprogress = { name: 'In Progress', value: 0 }
        state.tasks.forEach(item => {
            if (item.stage === 'done') {
                done.value += (parseInt(item.reward) / parseInt(state.stats.rewards)) * 100;
            }
            if (item.stage === 'todo') {
                todo.value += (parseInt(item.reward) / parseInt(state.stats.rewards)) * 100;
            }
            if (item.stage === 'inprogress') {
                inprogress.value += (parseInt(item.reward) / parseInt(state.stats.rewards)) * 100;
            }
            if (item.stage === 'intest/review') {
                intest.value += (parseInt(item.reward) / parseInt(state.stats.rewards)) * 100;
            }
        })
        return [todo, inprogress, intest, done]
    }


    createHist(data) {
        const margin = { top: 30, right: 0, bottom: 30, left: 0 };
        const width = parseInt(d3.select('#barCon').style('height'));
        const height = parseInt(d3.select('#barCon').style('height'));

        const x = d3.scaleBand().domain(d3.range(data.length))
            .range([margin.left, width - margin.right]).padding(0.1)
        const y = d3.scaleLinear().domain([0, 100]).nice()
            .range([height - margin.bottom, margin.top]);

        const xAxis = g => g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0));
        const yAxis = g => g.attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
        .attr("x", - margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y));
        
        const svg = d3.select(this.barRef.current).attr("viewBox", [0, 0, width, height]);
        svg.append('style').text('g g text { font-size: 14px; font-weight: 500;');
        svg.append("g").attr("fill", "steelblue").selectAll("rect").data(data).join("rect")
            .attr("x", (d, i) => x(i)).attr("y", d => y(d.value))
            .attr("height", d => y(0) - y(d.value)).attr("width", x.bandwidth());

        svg.append("g").call(xAxis);

        svg.append("g").call(yAxis);
    }


    render() {
        return (
            <div id="barCon" className="h-full flex items-center justify-center">
                <svg className="h-full w-full" ref={this.barRef}>

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

export default connect(mapStateToProps,)(BarChart);