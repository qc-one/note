
import _state from './state'
import {
	ADD_NEW_TODO,
	REMOVE_TODO
} from './const'
const reducer = (state = _state, action) => {
    let new_state = Object.assign({}, state)

    switch ( action.type ) {
		case ADD_NEW_TODO:
			new_state.todos.push(action.todo);break;
		case REMOVE_TODO:
			new_state.todos = action.todos;break;
		default:break;
	}
	
	//同步一下本地存储
	localStorage.todos = JSON.stringify(new_state.todos)
	//reducer一定要返回状态
	return new_state
}

export default reducer