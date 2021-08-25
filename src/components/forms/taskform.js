import axios from 'axios';
import moment from "moment";
import { useState } from "react";
import { connect } from 'react-redux';
import { getData } from '../../utils/fetchtasksdata';
import { addTasks, setEndate, setRewards } from '../../utils/reducer';


// display form and handle data 
function TaskForm(props){


    // access component state and functions 
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [reward, setReward] = useState("");
    const [timed, setTimed] = useState("");

    // handle data from form on submission
    function handleSubmit(e){
        
        if(title && tag && reward && timed){
            const payload = { id: `F-${new Date().getTime() % 1000}`, stage: "todo", 
                            title: title, tag: tag, reward: reward, timed: timed 
                        };
            sendTask(payload); setTag(""); setTitle("");setTimed("");setReward("");
        }
        e.preventDefault();
    }

    async function sendTask(payload) {
        try {
            const { status } = await axios.post('/task', payload);
            if(status === 200){
                getData(props);
            }
        } catch (err) {
            console.error(err);
        }
    }

    // control input and component state
    function handleChange(e){
        if(e.target.name === 'title'){
            setTitle(e.target.value);
        }else if(e.target.name === 'tag'){
            setTag(e.target.value);
        }else if(e.target.name=== 'reward'){
            setReward(e.target.value);
        }else if(e.target.name=== 'timed'){
            setTimed(e.target.value);
        }
    }

    return(
        <div className="pt-2 px-4">
            <h2 className="text-lg font-semibold text-center mb-5">Add Task</h2>
            <form onSubmit={ handleSubmit } className="w-full border-2 py-2 px-3">
                <div className="w-full grid grid-cols-6 gap-3">
                    <div className="w-full col-span-6 ">
                        <label htmlFor="title">Title</label>
                        <input className="w-full form-input border-gray-600 bg-gray-200 rounded py-0.5 mt-1" onChange={  handleChange } type="text" name="title" value={title} />
                    </div>
                    <div className="w-full col-span-3">
                        <label htmlFor="tag">Tag</label>
                        <input className="w-full form-input border-gray-600 bg-gray-200 rounded py-0.5 mt-1" onChange={ handleChange} type="text" name="tag" value={tag} />
                    </div>
                    <div className="w-full col-span-3">
                        <label htmlFor="reward">Reward</label>
                        <input className="w-full form-input border-gray-600 bg-gray-200 rounded py-0.5 mt-1" onChange={ handleChange} type="number" min="1" max="100" name="reward" value={reward} />
                    </div>
                    <div className="w-full col-span-4">
                        <label htmlFor="timed">End Date</label>
                        <input className="w-full form-input border-gray-600 rounded py-0.5 px-2 mt-1" onChange={ handleChange} type="date" name="timed" value={timed} pattern="\d{4}-\d{2}-\d{2}" min={moment(new Date()).format("YYYY-MM-DD")} />
                    </div>
                </div>

                <div className="flex items-center justify-end py-2">
                    <input className="form-input border-none text-white bg-green-500 hover:bg-green-600 px-8 rounded" type="submit" value="Add" />
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        addTasks: (data) => dispatch(addTasks(data)), 
        setEndate: () => dispatch(setEndate()), 
        setRewards: () => dispatch(setRewards())
    }
}

export default connect(null, mapDispatchToProps)(TaskForm);