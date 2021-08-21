import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';


class PieChart extends Component {


    constructor() {
        super();
        this.pieRef = createRef();
        this.groupData = this.groupData.bind(this);
    }


    componentDidMount() {
        const newData = this.groupData(this.props.state);
        this.createPie(newData);
    }


    groupData(data) {
        let resData = { completed: 0, notcompleted: 0 };
        for (let i = 0; i < data.tasks.length; i++) {
            if (data.tasks[i].stage === "done") {
                resData.completed += (Number(data.tasks[i].reward) / Number(data.stats.rewards)) * 100;
            } else {
                resData.notcompleted += (Number(data.tasks[i].reward) / Number(data.stats.rewards)) * 100;
            }
        };
        return resData.completed ? resData: { completed: 0, notcompleted: 100 };
    }

    createPie(data) {
        const width = parseInt(d3.select('#pieCon').style('height'));
        const height = parseInt(d3.select('#pieCon').style('height'));
        const margin = 10;
        const radius = (Math.min(width, height) / 2) - margin;
        const color = d3.scaleOrdinal().range(["#249c90", "#85104e"])
        const svg = d3.select(this.pieRef.current).attr("viewBox", [0, 0, width, height])
            .attr("width", width).attr("height", height)
            .append("g").attr("transform", `translate(${width / 2}, ${height / 2})`)
        svg.append('style').text('g{ transition: display 0.5s ease-in-out } g path {transition: display 0.2s ease}')
        const pie = d3.pie().value(d => d[1]);
        const dataReady = pie(Object.entries(data));
        svg.selectAll("path").data(dataReady).join("path").attr('d', d3.arc().innerRadius(96).outerRadius(radius))
            .attr('fill', d => color(d.data[0])).attr("stroke", "#4c4c4c").style("stroke-width", "2px").style("opacity", 0.7)
    }

    render() {
        return (
            <div id="pieCon" className="h-full flex items-center justify-center">
                <svg className="h-full w-full" ref={this.pieRef}>

                </svg>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        state: state.scrumer,
    }
}

export default connect(mapStateToProps,)(PieChart)