import { configureStore } from '@reduxjs/toolkit';
import scrumerReducer from './reducer';


export default configureStore({
    reducer: {
        scrumer: scrumerReducer,
    },
})