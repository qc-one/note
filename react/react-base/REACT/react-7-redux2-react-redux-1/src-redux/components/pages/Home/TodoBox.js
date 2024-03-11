

import React, {Component} from 'react'

import TodoInput from './TodoInput'
import TodoContent from './TodoContent'

class TodoBox extends Component {
	
	
	render () {
		return (
			<div style={{width:'600px',margin: '50px auto'}}>
				<TodoInput/>
				<hr/>
				<TodoContent/>
			</div>
		)
	}
	
}

export default TodoBox
