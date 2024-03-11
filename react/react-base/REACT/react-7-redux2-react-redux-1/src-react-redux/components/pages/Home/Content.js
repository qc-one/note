
import React, {Component} from 'react'

import { connect } from 'react-redux'

//UI组件
class Content extends Component {
	render () {
        console.log(this)
		return (
			<div>
				num: {this.props.allen.num}
			</div>
		)
	}
	
}

export default connect(state => state)(Content)

