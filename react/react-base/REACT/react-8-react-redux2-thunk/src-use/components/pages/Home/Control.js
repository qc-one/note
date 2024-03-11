
import React, {Component} from 'react'
import { connect } from 'react-redux'
import actionCreator from '../../../store/allen/actionCreator'
import { bindActionCreators } from 'redux'

class Control extends Component {
		
	render () {
		console.log(this)
		return (
			<div>
				<button onClick={this.props.subtract}>-</button>
				<button onClick={this.props.increment}>+</button>
			</div>
		)
	}
	
}


export default connect(state => state, dispatch => {
	return bindActionCreators(actionCreator, dispatch)
})(Control)

