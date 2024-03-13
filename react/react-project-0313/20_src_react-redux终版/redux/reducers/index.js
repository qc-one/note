// 汇总reducer
import { combineReducers } from 'redux';

// 引入为Count组件服务的reducer
import countReducer from './count';
import personReducer from './person';

// 汇总所有的reducer
const allReducer = combineReducers({
    count: countReducer,
    person: personReducer
})
export default allReducer

