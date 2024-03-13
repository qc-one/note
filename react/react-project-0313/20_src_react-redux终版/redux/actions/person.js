/* 
    专门为Person组件生成action对象
*/
import { ADD_PERSON } from '../constant'

export function createAddpersonAction(data) {
    return {type: ADD_PERSON, data}
}