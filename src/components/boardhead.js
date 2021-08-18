import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../utils/store";
import moment from "moment";


// Display Board stats 
function BoardHead(){

    // access global state and functions 
    const {state, dispatch} = useContext(Context);
    // set component state
    const [today] = useState(new Date());

    // change global state button sidebar
    function toggleSidebar(){
        dispatch({type: "TOGGLE_SIDEBAR"})
    }

    // update global state enddate and rewards 
    // value upon state.tasks change
    useEffect(()=>{
        dispatch({type: 'SET_ENDDATE'});
        dispatch({type: 'SET_REWARDS'});
    }, [state.tasks, dispatch])

    return(
        <section className="mb-11">
            <div className="grid grid-cols-8 gap-0.5">
                <div className="col-span-4">
                    <h1 className="text-lg font-semibold uppercase"> Welcome { localStorage.getItem('username') }</h1>
                </div>
                <div className="col-span-4">
                    <div className="flex justify-end">
                        <button onClick={toggleSidebar} className="bg-green-500 hover:bg-off-cyan-dark text-sm text-white rounded shadow-sm hover:shadow-lg py-1 px-2 mr-4">
                            {
                                state.user.button.sidebar ?
                                    <>
                                        <FontAwesomeIcon className="mr-2" icon={faTimes}/>
                                        Close
                                    </>
                                :
                                    <>
                                        <FontAwesomeIcon className="mr-2" icon={faPlus}/>
                                        Item
                                    </>

                            }
                        </button>
                        <button className="bg-white shadow-sm hover:shadow-lg rounded px-2">
                            <FontAwesomeIcon className="text-off-gray-dark" icon={faFilter}/>
                        </button>
                    </div>
                </div>
                <div className="col-span-8">
                    <div className="text-sm">
                        <span className="mr-2 py-0.5 pr-2 border-r-2 border-gray-300 border-right">
                            <svg className="w-4 h-4 inline-block mr-1 fill-current" viewBox="0 0 489.946 489.946" xmlns="http://www.w3.org/2000/svg">
                                <path d="m203.885 77.033c-22.44-12.922-51.979-20.039-83.172-20.039-31.194 0-60.731 7.117-83.172 20.039-23.991 13.815-37.292 32.68-37.53 53.172h-0.011v229.685c0 40.969 53.023 73.061 120.713 73.061s120.714-32.092 120.714-73.061v-229.403h-5e-3c-0.119-20.601-13.436-39.575-37.537-53.454zm16.542 145.663c0 28.323-45.663 52.251-99.714 52.251-54.05 0-99.713-23.928-99.713-52.251v-3.864c21.566 19.125 57.829 31.447 99.713 31.447 41.885 0 78.147-12.323 99.714-31.447v3.864zm0 45.667c0 28.324-45.663 52.252-99.714 52.252-54.05 0-99.713-23.929-99.713-52.252v-3.863c21.566 19.124 57.829 31.447 99.713 31.447 41.885 0 78.147-12.323 99.714-31.447v3.863zm-199.427 41.805c21.566 19.125 57.829 31.447 99.713 31.447 41.885 0 78.147-12.323 99.714-31.448v3.865c0 28.323-45.663 52.251-99.714 52.251-54.05 0-99.713-23.928-99.713-52.251v-3.864zm199.427-133.141c0 28.323-45.663 52.251-99.714 52.251-54.05 1e-3 -99.713-23.928-99.713-52.251v-4.755c21.566 18.99 57.829 31.225 99.713 31.225 41.885 0 78.147-12.236 99.714-31.225v4.755zm-172.406-81.795c19.303-11.116 45.119-17.237 72.692-17.237 27.574 0 53.39 6.122 72.693 17.237 17.172 9.888 27.021 22.839 27.021 35.531 0 28.043-45.663 51.734-99.714 51.734-54.05 0-99.713-23.691-99.713-51.734 0-12.692 9.849-25.643 27.021-35.531zm72.692 316.72c-54.05 0-99.713-23.841-99.713-52.062v-4.053c21.566 19.124 57.829 31.447 99.713 31.447 41.885 0 78.147-12.323 99.714-31.447v4.054c0 28.22-45.664 52.061-99.714 52.061z"/>
                                <path d="m489.943 262.987c-0.074-20.641-13.396-39.656-37.538-53.558-22.44-12.922-51.979-20.039-83.173-20.039-31.193 0-60.731 7.117-83.172 20.039-24.209 13.94-37.541 33.022-37.541 53.729v0.016 92.406c0 40.801 53.023 72.762 120.713 72.762s120.714-31.961 120.714-72.762v-92.594h-3e-3zm-20.997 46.436c0 28.323-45.663 52.252-99.714 52.252-54.05 0-99.713-23.928-99.713-52.252v-4.755c21.566 18.99 57.828 31.225 99.713 31.225s78.147-12.235 99.714-31.225v4.755zm-172.406-81.795c19.303-11.116 45.119-17.237 72.692-17.237s53.39 6.122 72.693 17.237c17.172 9.888 27.021 22.839 27.021 35.531 0 28.043-45.663 51.734-99.714 51.734-54.05 0-99.713-23.691-99.713-51.734 1e-3 -12.692 9.849-25.643 27.021-35.531zm72.692 179.715c-54.05 0-99.713-23.704-99.713-51.762v-4.353c21.566 19.124 57.828 31.447 99.713 31.447s78.147-12.322 99.714-31.447v4.353c0 28.058-45.663 51.762-99.714 51.762z"/>
                            </svg>
                            <span className="mr-0.5">
                                { 
                                    state.stats.rewards    
                                }
                            </span>
                            pts
                        </span>
                        <span className="mr-2 py-0.5 pr-2 border-r-2 border-gray-300 border-right">
                            <svg className="inline-block w-4 h-4 mr-2 fill-current" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <circle cx="22" cy="24.5" r="1"/>
                                    <circle cx="29" cy="24.5" r="1"/>
                                    <circle cx="36" cy="24.5" r="1"/>
                                    <circle cx="43" cy="24.5" r="1"/>
                                    <circle cx="50" cy="24.5" r="1"/>
                                    <circle cx="8" cy="32.5" r="1"/>
                                    <circle cx="15" cy="32.5" r="1"/>
                                    <circle cx="22" cy="32.5" r="1"/>
                                    <circle cx="29" cy="32.5" r="1"/>
                                    <circle cx="36" cy="32.5" r="1"/>
                                    <circle cx="43" cy="32.5" r="1"/>
                                    <circle cx="50" cy="32.5" r="1"/>
                                    <circle cx="8" cy="39.5" r="1"/>
                                    <circle cx="15" cy="39.5" r="1"/>
                                    <circle cx="22" cy="39.5" r="1"/>
                                    <circle cx="29" cy="39.5" r="1"/>
                                    <circle cx="36" cy="39.5" r="1"/>
                                    <circle cx="43" cy="39.5" r="1"/>
                                    <circle cx="50" cy="39.5" r="1"/>
                                    <circle cx="8" cy="47.5" r="1"/>
                                    <circle cx="15" cy="47.5" r="1"/>
                                    <circle cx="22" cy="47.5" r="1"/>
                                    <circle cx="29" cy="47.5" r="1"/>
                                    <circle cx="36" cy="47.5" r="1"/>
                                    <path d="m0 2.5v53h58v-53h-15.10156c0.04531 0.2217566 0.07114 0.4501896 0.08594 0.6816406-0.075539-0.257943-0.123587-0.497133-0.08594-0.6816406h-6c0.066 0.323 0.101562 0.658 0.101562 1 0 0.00461 1.3e-5 0.00906 0 0.013672-0.094129-0.4007826-0.153534-0.7589565-0.101562-1.013672h-6c0.02528 0.1237012 0.04264 0.2500127 0.05859 0.3769531-0.050679-0.1331096-0.082254-0.2609785-0.05859-0.3769531h-16.89844zm2 13h54v38h-54z"/>
                                </g>
                            </svg>
                            
                            <span className="mr-0.5">
                                { moment(today).format("MMM DD") }
                            </span>
                             - 
                            <span className="ml-0.5">
                                {/* display enddate or today */}
                                {
                                    moment(state.stats.enddate).format("MMM DD")
                                }
                            </span>, 
                            <span>
                                { moment(today).format("YYYY") }
                            </span>
                        </span>
                        <span className="mr-2 py-0.5 pr-2"> 
                            <svg className="inline-block w-4 h-4 mr-2 fill-current" viewBox="0 0 83.001 83.001" xmlns="http://www.w3.org/2000/svg">
                                <path d="m41.5 0c-22.883 0-41.499 18.617-41.499 41.5 0 22.884 18.616 41.501 41.499 41.501s41.5-18.617 41.5-41.501c0-22.883-18.618-41.5-41.5-41.5zm0 77.001c-19.574 0-35.5-15.926-35.5-35.501s15.925-35.5 35.5-35.5 35.5 15.925 35.5 35.5-15.925 35.501-35.5 35.501z"/>
                                <path d="m53.508 45.32h-0.046l-8.962 0.134v-23.454c0-1.657-1.343-3-3-3s-3 1.343-3 3v26.5c0 6e-3 2e-3 0.012 2e-3 0.018 0 0.01-2e-3 0.019-2e-3 0.027 2e-3 0.122 0.025 0.237 0.041 0.354 0.01 0.073 0.011 0.148 0.025 0.22 0.027 0.129 0.072 0.249 0.115 0.37 0.022 0.063 0.036 0.129 0.062 0.189 0.052 0.123 0.122 0.235 0.189 0.35 0.031 0.051 0.054 0.107 0.087 0.157 0.076 0.111 0.167 0.21 0.257 0.311 0.038 0.042 0.069 0.09 0.109 0.131 0.097 0.096 0.206 0.177 0.315 0.26 0.044 0.033 0.083 0.073 0.128 0.104 0.118 0.08 0.247 0.143 0.376 0.205 0.045 0.021 0.085 0.051 0.131 0.07 0.15 0.063 0.31 0.107 0.472 0.146 0.03 7e-3 0.058 0.021 0.089 0.027 0.194 0.039 0.395 0.061 0.601 0.061h0.046l12.008-0.18c1.656-0.025 2.979-1.389 2.955-3.045-0.023-1.641-1.362-2.955-2.998-2.955z"/>
                            </svg>
                            <span className="mr-0.5">
                                {/* days till all task are done */}
                                {
                                    moment(state.stats.enddate).diff(moment(today), "days")
                                }
                            </span> days
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BoardHead;