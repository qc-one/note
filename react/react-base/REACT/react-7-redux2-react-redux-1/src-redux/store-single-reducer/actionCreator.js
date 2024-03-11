
//actionCreator里的方法，作用是执行一些自定逻辑之后，创建一个带有标识性信息的action，交由reducer处理
import store from './index'
import {
	ADD_NEW_TODO,
	REMOVE_TODO
} from './const'
export default {
	
	addNewTodo (title) {
		//执行一些异步逻辑...
		let todos = store.getState().todos.slice()
		
		todos.sort((a,b) => {
			return b.id-a.id
		})
		//新的todo
		let todo = {title,id: todos.length? todos[0].id + 1 : 1}
		//action
		let action = {
			type:ADD_NEW_TODO,
			todo
		}
		//发送action到store（其实是给reducer了）
		store.dispatch(action)
		
	},
	removeTodo ( id ) {
		//移除某一个todo
		let todos = store.getState().todos.slice()
		todos = todos.filter(item => {
			if(item.id === id){
				return false
			}
			return true
		})
		let action = {
			type: REMOVE_TODO,
			todos
		}
		store.dispatch(action)
		
	}
	
}
