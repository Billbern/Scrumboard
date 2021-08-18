import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./utils/store";
import "./assets/css/main.css";
import axios from 'axios';
import reportWebVitals from './reportWebVitals';


axios.defaults.baseURL = "http://localhost:2200/api/v1";
axios.defaults.withCredentials = true;
axios.defaults.headers = {'Access-Control-Allow-Origin': '*'}


ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
