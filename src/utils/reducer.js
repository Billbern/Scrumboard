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
            "To do": ["bg-off-wine-dark", "to-off-pink-light"],
            "In progress": ["bg-off-blue-dark", "to-off-gray-light"],
            "In test / review": ["bg-off-voilet-dark2", "to-off-wine-light"],
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

        /**
         * Add single task to the global store
         * @param {*} payload 
         */
        addTask: (state, action) => {
            state.tasks = state.tasks.concat(action.payload)
        },

        /**
         * Update tasks content in the global store
         * @param {*} payload 
         */
        updateTask: (state, action) => {

            state.tasks = state.tasks.filter(task => {
                if (task.id === action.payload.id) {
                    task.stage = action.payload.stage.replace(/\s/g, '').toLowerCase();
                }
                return task;
            })
        },

        /**
         * Add tasks to the global store
         * @param {*} payload 
         */
        addTasks: (state, action) => {
            state.tasks = [...action.payload];
        },

        /**
         * Add tasks logs to the global store
         * @param {*} payload 
         */
        addLogs: (state, action) => {
            state.logs = [...action.payload];
        },


        /**
         * Add User to the global store
         * @param {*} payload 
         */
        addUser: (state, action) => {
            state.user.isLoggedIn = action.payload.loggedin;
            state.user.name = action.payload.name;
        },

        /**
         * Set enddate in the global store
         * @param {*} payload 
         */
        setEndate: (state) => {
            state.stats.enddate = state.tasks.length >= 2
                ? [...state.tasks].sort(function (x, y) {
                    return moment(y.timed).subtract(moment(x.timed))
                })[0].timed
                : state.tasks.length === 1 ? state.tasks[0].timed : `${moment().format('YYYY-MM-DD')}`
        },

        /**
         * Set rewards in the global store
         * @param {*} payload 
         */
        setRewards: (state) => {
            state.stats.rewards = state.tasks.reduce((accum, item) => {
                if (item.reward) {
                    return accum + parseInt(item.reward)
                }
                return accum
            }, 0)

        },

        /**
         * Set side toggle state in the global store
         * @param {*} payload 
         */
        toggleSideBar: (state) => {
            state.user.button.sidebar = !state.user.button.sidebar
        },

        /**
         * Switch toggle state between Done and Backlogs in the global store
         * @param {*} payload 
         */
        toggleExtras: (state) => {
            state.user.button.extras = !state.user.button.extras
        },


    }
})

export const { addTask, addTasks, updateTask, addLogs,
     addUser, setRewards, setEndate, toggleExtras, toggleSideBar } = scrumerSlice.actions;

export default scrumerSlice.reducer;