/*
    改文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 用于创建store
import {createStore, applyMiddleware} from 'redux';
// 引入为Count组件服务的reducer
import countReducer from './count_reducer';
// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk';

// 暴露store
export default createStore(countReducer, applyMiddleware(thunk))