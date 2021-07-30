import { Component } from 'react';
import Task from "./task";
import { Context } from "../utils/store";


// acts as a container for global state tasks 
export default class TaskContainer extends Component {

    // access app context
    static contextType = Context;

    constructor(props){
        super(props);
        // make class methods
        this.handleOnDrop = this.handleOnDrop.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleAllowDrop = this.handleAllowDrop.bind(this);
        
    }

    // handle when child start moving 
    handleDragStart(e, id){
        e.dataTransfer.setData("task", id);
        e.dataTransfer.effectAllowed = "move";
    }

    // allow tasks to be received in a container
    handleAllowDrop(e){
        e.dataTransfer.dropEffect = "move";
        e.preventDefault();
    }

    // handle what happens when a task is added to container
    handleOnDrop(e, dispatch){
        dispatch({ 
            type: 'UPDATE_TASK', 
            payload: {
                id: e.dataTransfer.getData('task'), 
                stage: this.props.name
            }
        })
        e.preventDefault();
    }

    render(){

        // access global state and functions
        const { state, dispatch } = this.context;

        return(
            <div className={`h-9/10 w-full px-1 pt-3 bg-gradient-to-b from-transparent ${this.props.color}`} onDrop={e => this.handleOnDrop(e, dispatch) } onDragOver={this.handleAllowDrop}>
                {
                    
                    state.tasks.map((item, key)=>{
                        return  item.stage === this.props.name.replace(/\s/g, '').toLowerCase() 
                                ? <Task key={key} data={item} dragStart={this.handleDragStart}  /> 
                                : ''
                        
                    })
                }
            </div>
        );
    }
}
