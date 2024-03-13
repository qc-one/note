import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import store from './redux/store'
import { Provider } from 'react-redux'
/* 
  用于记录页面性能
*/
import reportWebVitals from './reportWebVitals';
/* 
  React.StrictMode检查App以及App里面的内容写的是否合理
*/
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 用Provider包裹组件，是为了让App所有的后代容器组件都能使用store */}
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// react-redux中的connect函数会jian监听store的变化，然后重新渲染组件
// 检测redux中状态的改变，如redux中的状态发生了改变，则重新渲染App组件
// store.subscribe(() => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <BrowserRouter>
//         <App/>
//       </BrowserRouter>
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
