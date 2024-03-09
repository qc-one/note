
import React, {Component} from 'react'
import store from '../../../store'
import actionCreator from '../../../store/one/actionCreator'

//无状态组件就是没有状态的组件，当我们某些组件不需要状态的时候，只是被动的接收一些属性来使用的话，我们可以做成无状态组件，节省性能
//无状态组件就是函数而不是类，接收props参数，返回虚拟dom结构

let Lis = (props) => {
	let { title, id } = props.info
	return( 
		<li className = "list-group-item">
			{title}
			<button onClick = {actionCreator.removeTodo.bind(this, id)} type="button" className="close"><span>&times;</span></button>
		</li>
	)
}


class TodoContent extends Component {
	
	constructor(props){
		super(props)
		//当我们划分了reducer之后，在store里的数据也会被划分
		this.state = {
			todos: store.getState().one.todos
		}
	}
	componentWillMount(){
		//当store里的状态改变的时候，store.subscribe方法传入的函数就会执行
		//如果其他的不使用的状态改变的时候也会触发，如果不想更改状态，就做出判断，当前使用的状态是否更改，没有的话就不用setState
		store.subscribe(() => {
			this.setState({todos:store.getState().one.todos})
		})
	}
	removeTodo(){
		alert(123)
	}
	render () {
		let {todos} = this.state
		return (
			<ul className = "list-group">
				{
					todos.map((item) => {
						return <Lis key={item.id} info={item}/>	
					})
				}
			</ul>
		)
	}
	
}

export default TodoContent
