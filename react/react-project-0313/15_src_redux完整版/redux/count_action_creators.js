/* 
    专门为Count组件生成action对象
*/
import {INCREMENT, DECREMENT} from './constant'

export function createDecrementAction(data) {
    return {type: DECREMENT, data}
}
export const createIncrementAction = (data) => ({type: INCREMENT, data}) // 万能的小括号