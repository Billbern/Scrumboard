import axios from 'axios';
import { Component } from 'react';
import { connect } from 'react-redux';
import { updateTask, addTasks, setEndate, setRewards } from '../utils/reducer';
import Task from "./task";
import getData from '../utils/fetchtasksdata';

// acts as a container for global state tasks 
class TaskContainer extends Component {


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
                this.props.updateTask({id: id, stage: stageName});
                getData(this.props.addTasks, this.props.setEndate(), this.props.setRewards());
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

        return(
            <div className={`h-9/10 w-full px-1 pt-3 bg-gradient-to-b from-transparent ${this.props.color}`} onDrop={ this.handleOnDrop } onDragOver={ this.handleAllowDrop }>
                {     
                    this.props.state.tasks.length !== 0
                    ?
                        this.props.state.tasks.map((item, key)=>{
                            
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


const mapStateToProps = state =>{
    return {
        state: state.scrumer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTask: () => dispatch(updateTask),
        addTasks: (data) => dispatch(addTasks(data)),
        setEndate: () => dispatch(setEndate),
        setRewards: () => dispatch(setRewards)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);