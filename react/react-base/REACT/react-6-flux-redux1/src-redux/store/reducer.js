//默认状态
import _state from './state'
import {
	ADD_NEW_TODO
} from './const'
//reducer是一个纯函数
//给reducer设置默认的state参数，store就可以拥有状态了
const reducer = (state = _state, action) => {
	//当执行store.dispatch的时候，reducer就会触发，根据action里的标识信息判断后，返回新状态！
	let new_state = Object.assign({}, state)
	
	switch ( action.type ) {
		case ADD_NEW_TODO:
			new_state.todos.push(action.todo);break;
		
		default:break;
	}
	
	//reducer一定要返回状态
	return new_state
}

export default reducer
