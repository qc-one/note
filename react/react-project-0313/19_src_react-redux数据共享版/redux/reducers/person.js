/*
    1、创建一个为Person组件服务的reducer，reducer的本质就是一个函数
    2、reducer函数会接收到两个参数，分别为：之前的状态(preState)、动作对象(action)
*/
import { ADD_PERSON } from '../constant'

const initState = [
    {id: 1, name: 'tom', age: 18}
];
function personReducer(preState = initState, action) {
    let {type, data} = action;
    switch (type) {
        case ADD_PERSON:
            return [data, ...preState];
        default: 
            return preState;
    }
       
}

export default personReducer