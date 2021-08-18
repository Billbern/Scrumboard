import { Component } from 'react';
import axios from 'axios';
import { Context } from "../utils/store";
import Task from "./task";


// acts as a container for global state tasks 
export default class TaskContainer extends Component {

    // access app context
    static contextType = Context;

    constructor(props){
        super(props);
        // make class methods
        this.updateData = this.updateData.bind(this);
        this.handleOnDrop = this.handleOnDrop.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleAllowDrop = this.handleAllowDrop.bind(this);
        
    }

    async updateData(id){
        const stageName = this.props.name.replace(/\s/g, '').toLowerCase();
        try {
            const {status} = await axios.put(`/task/${id}`, { stage: stageName });
            if(status === 200){
                this.context.dispatch({ type: 'UPDATE_TASK', payload: {id: id, stage: stageName}});
            }
        } catch (err) {
            console.error(err);
        }
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
    handleOnDrop(e){
        this.updateData(e.dataTransfer.getData('task'));
        e.preventDefault();
    }

    render(){

        // access global state and functions
        const { state } = this.context;

        return(
            <div className={`h-9/10 w-full px-1 pt-3 bg-gradient-to-b from-transparent ${this.props.color}`} onDrop={ this.handleOnDrop } onDragOver={ this.handleAllowDrop }>
                {     
                    state.tasks.length !== 0
                    ?
                        state.tasks.map((item, key)=>{
                            
                            return  item.stage === this.props.name.replace(/\s/g, '').toLowerCase() 
                                    ? <Task key={key} data={item} dragStart={this.handleDragStart}  /> 
                                    : ''
                            
                        })
                    : ''
                }
            </div>
        );
    }
}
