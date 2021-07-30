import {createContext, useReducer} from 'react';
import Reducer from './reducer';

// Create State
const initialState = {
    tasks: [
        {id: "", title: "", author: "", tag: "",  timed: '2021-06-19' , reward: "", stage: ""}
        
    ],
    stats: { enddate: '', rewards: 0 },
    styles: {
        "To do": ["bg-off-wine-dark", "to-off-wine-light"], 
        "In progress": ["bg-off-gray-dark", "to-off-gray-light"], 
        "In test / review": ["bg-off-pink-dark", "to-off-pink-light"],
        "Done": ["bg-off-cyan-dark", "to-off-cyan-light"],
        "Backlog": ["bg-yellow-500", "to-off-yellow-light"]
    },
    user: {
        name: "Bernard",
        pic: "" 
    },
    button: {
        sidebar: false,
        extras: false,
    }
};

// Component to handle state
const Store = ({children}) => {

    const [ state, dispatch ] = useReducer(Reducer, initialState);

    return (
        
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

// initialise state
export const Context = createContext(initialState);
export default Store;