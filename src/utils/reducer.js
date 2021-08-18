// Methods to update state 

const Reducer = (state, action) =>{
    switch (action.type){
        // Add task from Database
        case 'SET_TASKS':
            return{
                ...state,
                tasks: [
                    ...action.payload
                ]
            }
        case 'SET_USER':{
            return{
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: action.payload.loggedin,
                    name: action.payload.name
                }
            }
        }

        // Add task to state tasks
        case 'ADD_TASK':
            return {
                ...state,
                tasks: state.tasks.concat(action.payload)
            };

        // Update state task on movement
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task =>{
                    if(task.id === action.payload.id){
                        task.stage = action.payload.stage.replace(/\s/g, '').toLowerCase();
                    }
                    return task;
                })
            };
        
        //set state of sidebar
        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                user: {
                    ...state.user,
                    button: {
                        ...state.user.button,
                        sidebar: !state.user.button.sidebar
                    }
                }
            }
        //set switch between Done and Backlog
        case 'TOGGLE_EXTRAS':
            return {
                ...state,
                user: {
                    ...state.user,
                    button: {
                        ...state.user.button,
                        extras: !state.user.button.extras
                    }
                }
            }
        
        // set ending date for tasks 
        case 'SET_ENDDATE':
            return {
                ...state,
                stats: {
                    ...state.stats,
                    enddate: state.tasks.length >= 2 
                        ? [...state.tasks].sort(function(x,y){
                            return new Date(y.timed) - new Date(x.timed)
                        })[0].timed 
                        : state.tasks.length === 1 ? state.tasks[0].timed : new Date()
                }
            }
        
        // set total number of rewards 
        case 'SET_REWARDS':
            return {
                ...state,
                stats : {
                    ...state.stats,
                    rewards: state.tasks.reduce((accum, item)=>{
                        if(item.reward){
                            return accum + parseInt(item.reward) 
                        }
                        return accum
                    }, 0)
                }
            }
        default:
            return state;
    }
}

export default Reducer;