import {Component} from 'react';
import BoardHead from '../components/boardhead';
import TaskView from '../components/taskview';
import SideBar from '../components/sidebar';
import { Context } from '../utils/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown } from "@fortawesome/free-solid-svg-icons";


// display tasks and movements
class Board extends Component {
    
    // access global state
    static contextType = Context;

    constructor(){
        super();
        // make handle change a class method
        this.handleChange = this.handleChange.bind(this);
    }

    // change global state extras value
    handleChange(dispatch){
        dispatch({type: "TOGGLE_EXTRAS"});
    }
    
    render(){

        // access global state and functions
        const {state, dispatch} = this.context;

        return(
            <main className="relative bg-off-white h-full">
                <div className="py-4 px-12 h-full">
                    {/* display global state data on all tasks */}
                    <BoardHead />
                    <section className="h-sub">
                        <div className="h-full grid grid-cols-9 gap-12">
                            
                            {/* segregate global state tasks into groups */}

                            {
                                ["To do", "In progress", "In test / review"].map((item, key)=>{
                                    return <div key={key} className="col-span-2"><TaskView name={item} /></div>
                                })
                            }

                            {/* create barrier regular global state tasks and extras  */}
                            <div className="col-span-3 h-full">
                                <div className="h-full grid grid-cols-3 gap-12">
                                    <div className="col-span-1">
                                        <div className="h-full flex justify-center">
                                            <div className="h-full absolute w-10 bg-gray-200 border border-off-gray-light">

                                                {/* Buttons for global state tasks extras  */}

                                                {
                                                    [{name: "Done", color: "text-off-cyan-dark",  checked: !state.button.extras}, 
                                                    {name: "Backlog", color: "text-yellow-500",  checked: state.button.extras}].map((item, key)=>{
                                                        return <div key={key} className="flex items-center justify-center my-0.5 py-6">
                                                                    <div className={`flex relative transform -rotate-90 ${item.color} font-semibold py-1.5 px-2`}>
                                                                        
                                                                        {/* display icon based on global state extras value  */}

                                                                        { item.checked 
                                                                            ? <span className="mr-1">
                                                                                <FontAwesomeIcon className="animate-bounce" icon={faLongArrowAltDown} />
                                                                                </span> 
                                                                            : "" 
                                                                        }
                                                                        <label htmlFor="extras" >{item.name}</label> 
                                                                        <input type="radio" name="extras" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={() => this.handleChange(dispatch) } checked={item.checked}/>
                                                                    </div>
                                                                </div>
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </div>

                                    {/* display extras based on global state extras */}
                                    <div className="col-span-2">
                                        {
                                            state.button.extras 
                                            ?
                                                <div className="h-full transition-height duration-750 ease-in-out">
                                                    <TaskView name="Backlog"/>
                                                </div>
                                            :
                                                <div className="h-full transition-height duration-750 ease-in-out">
                                                    <TaskView name="Done"/>
                                                </div>
                                                
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* add data to global state */}
                            <SideBar />
                        </div>
                    </section>

                </div>
            </main>
        )
    }
}


export default Board;