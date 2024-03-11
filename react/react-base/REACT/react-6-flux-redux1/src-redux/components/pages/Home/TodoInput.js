

import React, {Component} from 'react'

import actionCreator from '../../../store/actionCreator'

//非受控组件： 在使用到inputvalue值的时候，通过ref来获取
class TodoInput extends Component {
	
	
	keyUp (e) {
		if ( e.keyCode === 13 ){
			//当回车的时候
			let title = this.el.value
			console.log(title)
			actionCreator.addNewTodo(title)
			this.el.value = ''
		}
	}
	
	
	render () {
		return (
			<div>
			
				<input ref = {el => this.el = el} onKeyUp = { this.keyUp.bind(this) } type = "text" className = "form-control"/>
				
				
				
			</div>
		)
	}
	
	componentDidMount () {
		this.el.focus()
	}
	
}



////受控组件： 将状态与inputvalue值绑定在一样，当input的value改变的时候让state也改变
//
//class TodoInput extends Component {
//	
//	constructor (props) {
//		super(props)
//		this.state = {
//			title: ''
//		}
//		//在这里为方法去绑定this，防止在使用的时候this丢失
//		this.changeTitle = this.changeTitle.bind(this)
//		this.keyUp = this.keyUp.bind(this)
//	}
//	
//	keyUp (e) {
//		if ( e.keyCode === 13 ){
//			//当回车的时候
//			console.log(this.state.title)
//		
//		}
//	}
//	
//	changeTitle (e) {
//		this.setState({
//			title: e.target.value
//		})
//	}
//	
//	render () {
//		return (
//			<div>
//			
//				<input onInput = {this.changeTitle} onKeyUp = { this.keyUp } type = "text" className = "form-control"/>
//				
//				{this.state.title}
//				
//			</div>
//		)
//	}
//	
//}
export default TodoInput
