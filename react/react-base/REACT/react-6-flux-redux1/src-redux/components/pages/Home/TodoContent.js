

import React, {Component} from 'react'

import store from '../../../store'

//无状态组件就是没有状态的组件，当我们某些组件不需要状态的时候，只是被动的接收一些属性来使用的话，我们可以做成无状态组件，节省性能
//无状态组件就是函数而不是类，接收props参数，返回虚拟dom结构

let TodoItem = props => {
	let { title } = props.info
	return (
		<li className = "list-group-item">
			{ title }
			<button type="button" className="close"><span>&times;</span></button>
		</li>
	)
}

class TodoContent extends Component {
	
	constructor (props) {
		super(props)
		this.state = {
			todos: store.getState().todos
		}
	}
	
	componentWillMount () {
		//当store里的状态改变的时候，store.subscribe方法里传入的函数就会执行
		store.subscribe(() => {
			console.log(store.getState().todos)
			this.setState({todos: store.getState().todos})
		})
	}
	
	render () {
		let { todos } = this.state
		return (
			<ul className = "list-group">
				{
					todos.map(item => {
						return <TodoItem info = { item } key = { item.id } />
					})
				}
				
				
				
				
			</ul>
		)
	}
	
}

export default TodoContent
