import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';



class PieChart extends Component {

    static timeout = null;

    constructor() {
        super();
        this.pieRef = createRef();
    }


    componentDidMount() {
        this.timeout = setTimeout(() => {
            const newDat = this.groupData(this.props.state);
            this.createPie(newDat);
        }, 100)
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }


    groupData(data) {
        let resData = { completed: 0, notcompleted: 0 };
        for (let i = 0; i < data.tasks.length; i++) {
            if (data.tasks[i].stage === "done") {
                resData.completed += Math.round((Number(data.tasks[i].reward) / Number(data.stats.rewards)) * 100);
            }
        };
        return { completed: resData.completed, notcompleted: 100 - resData.completed };
    }

    createPie(data) {
        const specs = {
            margin: 16, width: parseInt(d3.select('#pieCon').style('width')),
            height: parseInt(d3.select('#pieCon').style('height')),
            color: d3.scaleOrdinal().range(["#118AB2", "#9B2121"])
        }
        const radius = (Math.min(specs.width, specs.height) / 2) - specs.margin;
        const svg = d3.select(this.pieRef.current).append("g").attr("transform", `translate(${specs.width / 2}, ${specs.height / 2})`)
        svg.append('style').text('text{ font-size: 14px; font-weight: 500; } g{ transition: display 0.5s ease-in-out; } g path {transition: display 0.2s ease;}')
        svg.selectAll("path").data(d3.pie().value(d => d[1])(Object.entries(data))).join("path").attr('d', d3.arc().innerRadius(80).outerRadius(radius).padAngle(1).padRadius(4))
            .attr('fill', d => specs.color(d.data[0])).attr("stroke", "#efefef").style("stroke-width", "2").style("opacity", 0.7)
        const textg = svg.append('g').attr('transform', 'translate(-40, -8)')
        textg.append("text").text(`Finished: ${data.completed}%`)
        textg.append("text").attr('x', -21).attr('y', 24).text(`Not Finished ${data.notcompleted}%`)
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