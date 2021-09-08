import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import { Provider } from 'react-redux';
import Store from "./utils/store";

import "./assets/css/main.css";
import reportWebVitals from './reportWebVitals';
import App from './App';


axios.defaults.baseURL = process.env.REACT_APP_API_ROUTE;
axios.defaults.withCredentials = true;
axios.defaults.headers = {'Content-Type': 'application/json'};


const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  rootElement
);

reportWebVitals();
