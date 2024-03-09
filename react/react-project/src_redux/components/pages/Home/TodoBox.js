
import React, {Component} from 'react'

import TodoInput from './TodoInput'
import TodoContent from './TodoContent'

class TodoBox extends Component {
	
	render () {
		return (
			<div style={{width:'600px',margin: '50px auto',border:'1px solid red'}}>
				
				<TodoInput/>
				TodoBox
				<TodoContent/>
			</div>
		)
	}
	
}

export default TodoBox
