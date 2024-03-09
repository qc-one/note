
import React, {Component} from 'react'

//受控组件,将状态与input的value值绑定在一起,当input的value值改变的时候,让state也改变
//非受控组件，在使用input的value值的时候，通过ref来获取

import actionCreator from '../../../store/one/actionCreator'

class TodoInput extends Component {
	
	constructor(props){
		super(props)
		this.state={
			title:''
		}
		//在这里为方法去绑定this，防止在使用的时候this丢失
		this.changeTitle = this.changeTitle.bind(this)
		this.keyUp = this.keyUp.bind(this)
	}
	keyUp(e){
		if(e.keyCode === 13){
			let title = this.el.value
			actionCreator.addNewTodo(title)
			this.el.value = ''
		}
	}
	changeTitle(e){
		this.setState({
			title:e.target.value
		})
	}
	render () {
		return (
			<div>
				<p>受控组件</p>
				<input onInput={this.changeTitle} onKeyUp={this.keyUp} type = "text" className = "form-control"/>
				<p>非受控组件</p>
				<input ref={(el) => {this.el = el}} onKeyUp={this.keyUp} type = "text" className = "form-control"/>
				{this.state.title}
			</div>
		)
	}
	componentDidMount(){
		this.el.focus()
	}
	
}

export default TodoInput
