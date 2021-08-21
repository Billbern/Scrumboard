import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import { Provider } from 'react-redux';
import Store from "./utils/store";

import "./assets/css/main.css";
import reportWebVitals from './reportWebVitals';
import App from './App';


axios.defaults.baseURL = "http://localhost:2200/api/v1";
axios.defaults.withCredentials = true;
axios.defaults.headers = {'Access-Control-Allow-Origin': '*'}

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
