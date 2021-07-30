import { Component } from "react";
import { Context } from "../utils/store";
import TaskContainer from "./taskcontainer";

// display global state tasks associated to a name
class TaskView extends Component {

    // access app context
    static contextType = Context;

    render(){

        // access global state from context
        const { state } = this.context;

        return(
            <div className="h-full bg-off-white">
                <div className="flex items-center justify-between mb-2">
                    <h4 className={`${state.styles[this.props.name][0]}  text-white py-1 px-2 rounded shadow-sm`}>{this.props.name} ({ state.tasks.filter( task => { return task.stage === this.props.name.replace(/\s/g, '').toLowerCase() }).length })</h4>
                        <span className="text-gray-500">
                            {/* access the number global state tasks associated to this name */}
                            {   state.tasks.filter((item)=>{
                                    return item.stage === this.props.name.replace(/\s/g, '').toLowerCase() 
                                })
                                .reduce((accum, item)=> {
                                    return accum + parseInt(item.reward) 
                                }, 0)
                            } 
                            pts
                        </span>
                </div>

                {/* display global state tasks associated with this name */}
                <TaskContainer name={this.props.name} color={state.styles[this.props.name][1]} />
                
            </div>
        )
    }
}

export default TaskView;