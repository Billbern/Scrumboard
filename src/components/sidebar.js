import { Component } from "react";
import { connect } from "react-redux";
import TaskForm from './forms/taskform';


// display form for adding data
class SideBar extends Component {

    render(){
        
        return(
            <div className={`${ this.props.state.user.button.sidebar ? "right-0" : "-right-1/4" } transition-right duration-500 ease-in-out absolute bottom-0 h-sub pt-8 w-3/12 z-888`}>
                <div className="h-full w-full transition-display duration-750 ease-in-out rounded bg-white shadow-xl">
                    {/* form */}
                    <TaskForm/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        state: state.scrumer
    }
}


export default connect(mapStateToProps, )(SideBar);