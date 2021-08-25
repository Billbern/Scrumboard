const { Component, createRef } = require("react");


class HeatMap extends Component {

    constructor(){
        super();
        this.heatRef = createRef();
    }

    createMap(){
        
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


export default HeatMap;