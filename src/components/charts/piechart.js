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
        let completed = { name: "completed", total: 0, percent: 0, max: data.tasks.length };
        let notcompleted = { name: "notcompleted", total: 0, percent: 0, max: data.tasks.length }
        for (let i = 0; i < data.tasks.length; i++) {
            if (data.tasks[i].stage === "done") {
                completed.total += 1
                completed.percent += Number((data.tasks[i].reward) / (data.stats.rewards)) * 100;
            } else {
                notcompleted.total += 1
                notcompleted.percent += Number((data.tasks[i].reward) / (data.stats.rewards)) * 100;
            }
        };
        return [completed, notcompleted];
    }

    createPie(data) {
        const specs = {
            color: ["#003f5c", "#bc5090"],
            height: parseInt(d3.select('#pieCon').style('height')),
            margin: 16, width: parseInt(d3.select('#pieCon').style('width')),
            comp: data => data.name === "completed" ? `${((data.total / data.max) * 100).toFixed(2)}%` : `${((data.total / data.max) * 100).toFixed(2)}%`,
        }
        const radius = (Math.min(specs.width, specs.height) / 2) - specs.margin;
        const svg = d3.select(this.pieRef.current)
        const arc = d3.arc().innerRadius(80).outerRadius(radius).padAngle(1).padRadius(4)
        const pie = d3.pie().sort(null).startAngle(1.5 * Math.PI).endAngle(3.5 * Math.PI).value(d => d.total)

        const g = svg.append("g").attr("transform", `translate(${specs.width / 2}, ${specs.height / 2})`)
        const mg = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");
        mg.append("path").style("fill", (d, i) => specs.color[i]).transition().ease(d3.easeSinInOut)
            .delay((d, i) => (i + 1) * 500).duration(500).attrTween('d', d => {
                let i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                return t => { d.endAngle = i(t); return arc(d) }
            })
        mg.append('text').attr("transform", d => `translate(${arc.centroid(d)})`).attr("dy", "14")
            .transition().delay(1000).text(d => specs.comp(d.data)).attr("fill", "#fff").attr("font-size", 14)
        const legends = svg.append('g').attr('transform', `translate(${(specs.width - 90) / 2}, ${(specs.height - 72) / 2})`)
            .selectAll(".legends").data(data)
        const legend = legends.enter().append("g").classed(".legends", true).attr("transform", (d,i) => `translate(0, ${(i+1) * 24})`);  
        legend.append("rect").attr("width", 14).attr("height", 14).attr("fill", (d, i) => specs.color[i] );
        legend.append("text").text(d => d.name === "completed" ? "Done" : "Not Done" ).attr("x", 24).attr("y", 12);
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