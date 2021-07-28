import { Component } from "react";


class TaskView extends Component {
    constructor(props){
        super(props);
        this.name = this.props.name;
        this.points = "24 pts";
        this.styles = {
            "To do": ["bg-off-wine-dark", "to-off-wine-light"], 
            "In progress": ["bg-off-gray-dark", "to-off-gray-light"], 
            "In test / review": ["bg-off-pink-dark", "to-off-pink-light"],
            "Done": ["bg-off-cyan-dark", "to-off-cyan-light"]
        }
    }
    render(){
        return(
            <div className="h-full">
                <div className="flex items-center justify-between mb-2">
                    <h4 className={`${this.styles[this.name][0]}` + " text-white py-1 px-2 rounded shadow-sm"}>{this.name}</h4>
                        <span className="text-gray-500">{this.points}</span>
                </div>
                <div className={"h-9/10 bg-gradient-to-b from-transparent " + `${this.styles[this.name][1]}`}>

                </div>
            </div>
        )
    }
}

export default TaskView;