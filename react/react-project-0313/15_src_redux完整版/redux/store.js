/*
    改文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 用于创建store
import {createStore} from 'redux';
// 引入为Count组件服务的reducer
import countReducer from './count_reducer';

// 暴露store
export default createStore(countReducer)