/* 
    专门为Count组件生成action对象
*/
import {INCREMENT, DECREMENT} from '../constant'

// 同步action，所谓同步action，其实就是action的值为对象
export function createDecrementAction(data) {
    return {type: DECREMENT, data}
}
export const createIncrementAction = (data) => ({type: INCREMENT, data}) // 万能的小括号

// 暴露异步action，所谓异步action，其实就是action的值为函数，异步action中一般都会调用同步action
export const createIncrementAsyncAction = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data));
        }, time);
    }
}