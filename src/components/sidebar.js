import { Component } from "react";
import TaskForm from '../components/taskform';
import { Context } from "../utils/store";


// display form for adding data
export default class SideBar extends Component {

    // access app context
    static contextType = Context;

    render(){
        
        // access state from context
        const {state} = this.context;

        return(
            <div className={`${ state.button.sidebar ? "right-0" : "-right-1/4" } transition-right duration-500 ease-in-out absolute bottom-0 h-sub pt-14 w-3/12 z-888`}>
                <div className="h-full w-full transition-display duration-750 ease-in-out rounded bg-white shadow-xl">
                    {/* form */}
                    <TaskForm/>
                </div>
            </div>
        );
    }
}