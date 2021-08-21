import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

// Create State
const initialState = {
    tasks: [],
    logs: [],
    stats: { enddate: new Date(), rewards: 0 },
    user: {
        isLoggedIn: false,
        name: "",
        styles: {
            "To do": ["bg-off-wine-dark", "to-off-wine-light"],
            "In progress": ["bg-off-gray-dark", "to-off-gray-light"],
            "In test / review": ["bg-off-pink-dark", "to-off-pink-light"],
            "Done": ["bg-off-cyan-dark", "to-off-cyan-light"],
            "Backlog": ["bg-yellow-500", "to-off-yellow-light"]
        },
        button: {
            sidebar: false,
            extras: false,
        }
    }
};

export const scrumerSlice = createSlice({
    initialState,
    name: 'scrumer',
    reducers: {

        // Add tasks
        addTasks: (state, action) => {
            state.tasks = [...action.payload]
        },

        // add user
        addUser: (state, action) => {
            state.user.isLoggedIn = action.payload.loggedin;
            state.user.name= action.payload.name;
        },

        // Add task to state tasks
        addTask: (state, action) => {
            state.tasks = state.tasks.concat(action.payload)
        },

        // Update state task on movement
        updateTask: (state, action) => {

            state.tasks = state.tasks.filter(task => {
                if (task.id === action.payload.id) {
                    task.stage = action.payload.stage.replace(/\s/g, '').toLowerCase();
                }
                return task;
            })
        },

        //set state of sidebar
        toggleSideBar: (state) => {
            state.user.button.sidebar = !state.user.button.sidebar
        },

        //set switch between Done and Backlog
        toggleExtras: (state) => {
            state.user.button.extras= !state.user.button.extras
        },

        // set ending date for tasks 
        setEndate: (state) => {

            state.stats.enddate = state.tasks.length >= 2
                    ? [...state.tasks].sort(function (x, y) {
                        return moment(y.timed).subtract(moment(x.timed))
                    })[0].timed
                    : state.tasks.length === 1 ? state.tasks[0].timed : `${moment().format('YYYY-MM-DD')}`
        },

        // set total number of rewards 
        setRewards: (state) => {
            state.stats.rewards = state.tasks.reduce((accum, item) => {
                    if (item.reward) {
                        return accum + parseInt(item.reward)
                    }
                    return accum
                }, 0)
            
        }

    }
})

export const { addTask, addTasks, updateTask, addUser, setRewards, setEndate, toggleExtras, toggleSideBar } = scrumerSlice.actions;

export default scrumerSlice.reducer;