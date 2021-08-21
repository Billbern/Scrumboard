import { Component } from "react";
import moment from "moment";
import FileIcon from "./icons/file";
import ClockIcon from "./icons/clock";
import RewardIcon from "./icons/reward";


// visual representation of task
export default class Task extends Component {
    
    render(){
        
        return(
            <div className="bg-white text-sm shadow-lg rounded mb-4 select-none" draggable="true" onDragStart={ (e) =>  this.props.dragStart(e, this.props.data.id) } >
                <div className="py-2 px-3 flex flex-col">
                    {/* tasks data pertaining to id tags and user */}
                    <div className="w-full grid grid-cols-6 pt-1 mb-1.5">
                        <div className="col-span-5">
                            <div className="h-full inline-block mr-2">
                                <FileIcon />
                                {this.props.data.id}
                            </div>
                        
                            <div className="bg-white inline-block py-1 px-2 border-l-2 border-green-200 shadow w-max ">
                                {this.props.data.tag}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="h-full flex items-center justify-end">
                                {
                                    this.props.data.owner.username
                                }
                            </div>
                        </div>
                    </div>
                    {/* tasks data pertaining to title */}
                    <div className="w-full text-base pt-2 pb-1 border-b-2 rounded-b">
                        {this.props.data.title}
                    </div>

                    {/* tasks data pertaining to deadline */}
                    <div className="w-full pt-1.5 grid grid-cols-6">
                        {   
                            moment(this.props.data.timed).diff(moment(new Date()), 'days') < 3
                            ? 
                                <span className="w-max col-start-1 col-end-1 text-red-500">
                                    <ClockIcon />
                                </span>
                            :
                                ""
                        }
                        
                        {/* tasks data pertaining to weight or reward */}
                        <span className="w-max col-start-6 col-end-6">
                            <RewardIcon />
                            {this.props.data.reward}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}