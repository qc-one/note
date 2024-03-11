
import './index.scss'
import React, {Component} from 'react'
import actionCreators from '../../../store/actionCreators'

class Control extends Component {
	
	
	render () {
		return (
			<div>
				<button onClick = {actionCreators.increment}> + </button>
			</div>
		)
	}
	
}

export default Control
