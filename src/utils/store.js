import {createContext, useReducer} from 'react';
import Reducer from './reducer';

// Create State
const initialState = {
    url: 'http://127.0.0.1:2200/api/v1/',
    tasks: [],
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