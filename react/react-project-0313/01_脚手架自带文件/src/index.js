import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
/* 
  用于记录页面性能
*/
import reportWebVitals from './reportWebVitals';

/* 
  React.StrictMode检查App以及App里面的内容写的是否合理
*/
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
