import * as d3 from 'd3';
import { connect } from 'react-redux';
const { Component, createRef } = require("react");


class BarChart extends Component {

    static timeout = null;

    constructor() {
        super();
        this.barRef = createRef();
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            const newData = this.groupData(this.props.state);
            this.createHist(newData);
        }, 100);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
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
        const color = ["#bc5090", '#003f5c', '#58508d', '#249c90']
        const margin = { top: 32, right: 24, bottom: 32, left: 48 };
        const width = parseInt(d3.select('#barCon').style('width')) - margin.left - margin.right;
        const height = parseInt(d3.select('#barCon').style('height')) - margin.bottom - margin.top;
        let display = () => {
            d3.selectAll('rect.tasks').transition().ease(d3.easeCubicInOut).duration(1000)
                .attr('y', d => y(d.value)).attr('height', d => height - y(d.value))
                .delay((d, i) => 1000 / ((i + 1) * 5));
        }

        const svg = d3.select(this.barRef.current)
        const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`)

        const x = d3.scaleBand().domain(data.map(d => d.name)).range([0, width]).padding(0.2)
        g.append("g").attr("transform", `translate(0 ,${height})`)
            .call(d3.axisBottom(x)).attr('font-size', 14);

        const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
        g.append("g").call(d3.axisLeft(y).ticks(null, data.format)).attr('font-size', 14)
            .call(g => g.select(".domain").remove())

        g.selectAll("smt").data(data).join("rect")
            .attr("x", d => x(d.name)).attr("width", x.bandwidth())
            .attr("height", d => height - y(0)).attr("y", d => y(0))
            .attr("fill", (d, i) => color[i]).attr('class', 'tasks');

        display();
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