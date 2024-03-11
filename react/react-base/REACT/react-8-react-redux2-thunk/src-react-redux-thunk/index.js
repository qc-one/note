import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.scss';
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';
// 在根组件外部包裹上Provider组件，并为其传入store

// 	目的，让Provider里面的所有的容器组件都可以使用到store里的东西

// 	Provider是通过context属性将自己的东西传递到内部子级组件中的
ReactDOM.render(
    <Provider store = { store }>
        <App />
    </Provider>
, document.getElementById('root'));


registerServiceWorker();
