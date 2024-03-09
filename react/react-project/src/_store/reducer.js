
//reducer是一个纯函数

import _state from "./state"
import {ADD_NEW_TODO,REMOVE_TODO} from './const'

//给reducer设置默认的state参数，store就可以拥有状态了
const reducer = (state = _state,action) => {
	//当执行store.dispatch的时候，reducer就会触发，根据action里的标识信息判断后，返回新状态！
	let new_state = Object.assign({},state)
	switch(action.type){
		case ADD_NEW_TODO:
			new_state.todos.push(action.todo);
			break;
		case REMOVE_TODO:
			new_state.todos = action.todos;
			break;
		default:break;
	}
	localStorage.todos = JSON.stringify(new_state.todos)
	return new_state
}

export default reducer
