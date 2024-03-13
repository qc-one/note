/*
    1、创建一个为Count组件服务的reducer，reducer的本质就是一个函数
    2、reducer函数会接收到两个参数，分别为：之前的状态(preState)、动作对象(action)
*/
import {INCREMENT, DECREMENT} from '../constant'

const initState = 0;
function countReducer(preState = initState, action) {
    let {type, data} = action;
    switch (type) {
        case INCREMENT:
            return preState + data;
        case DECREMENT:
            return preState - data;
        default: 
            return preState;
    }
       
}

export default countReducer