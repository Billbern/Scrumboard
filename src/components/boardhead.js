import moment from "moment";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import {  toggleSideBar } from "../utils/reducer";
import RewardIcon from "./icons/reward";
import CalendarIcon from "./icons/calendar";
import ClockIcon from "./icons/clock";


// Display Board stats 
function BoardHead({ select }) {

    // set component state
    const [today] = useState(new Date());

    const state = useSelector(state => state.scrumer);
    const dispatch = useDispatch();

    // change global state button sidebar
    function toggleSidebar() {
        dispatch(toggleSideBar());
    }

    return (
        <section className="mb-11">
            <div className="grid grid-cols-8 gap-0.5">
                <div className="col-span-4">
                    {
                        select === 'text'
                            ?
                            <h1 className="text-lg font-semibold uppercase"> Welcome {localStorage.getItem('username')}</h1>
                            :
                            ""
                    }
                </div>
                <div className="col-span-4">
                    <div className="flex justify-end">
                        {
                            select === 'buttons'
                                ?
                                <>
                                    <button onClick={toggleSidebar} className="bg-green-500 hover:bg-off-cyan-dark text-sm text-white rounded shadow-sm hover:shadow-lg py-1 px-2 mr-4">
                                        {
                                            state.user.button.sidebar ?
                                                <>
                                                    <FontAwesomeIcon className="mr-2" icon={faTimes} />
                                                    Close
                                                </>
                                                :
                                                <>
                                                    <FontAwesomeIcon className="mr-2" icon={faPlus} />
                                                    Item
                                                </>

                                        }
                                    </button>
                                    <button className="bg-white shadow-sm hover:shadow-lg rounded px-2">
                                        <FontAwesomeIcon className="text-off-gray-dark" icon={faFilter} />
                                    </button>
                                </>
                                :
                                ""
                        }

                    </div>
                </div>
                <div className="col-span-8">
                    {
                        select === 'text'
                            ?
                            <div className="text-sm">
                                <span className="mr-2 py-0.5 pr-2 border-r-2 border-gray-300 border-right">
                                    <RewardIcon />
                                    <span className="mr-0.5">
                                        {
                                            state.stats.rewards
                                        }
                                    </span>
                                    pts
                                </span>
                                <span className="mr-2 py-0.5 pr-2 border-r-2 border-gray-300 border-right">
                                    <CalendarIcon />
                                    <span className="mr-0.5">
                                        {moment(today).format("MMM DD")}
                                    </span>
                                    -
                                    <span className="ml-0.5">
                                        {/* display enddate or today */}
                                        {
                                            moment(state.stats.enddate).format("MMM DD")
                                        }
                                    </span>,
                                    <span>
                                        {moment(today).format("YYYY")}
                                    </span>
                                </span>
                                <span className="mr-2 py-0.5 pr-2">
                                    <ClockIcon />
                                    <span className="mr-0.5">
                                        {/* days till all task are done */}
                                        {
                                            moment(state.stats.enddate).diff(moment(today), "days")
                                        }
                                    </span> days
                                </span>
                            </div>
                            :
                            ""
                    }
                </div>
            </div>
        </section>
    );
}

export default BoardHead;