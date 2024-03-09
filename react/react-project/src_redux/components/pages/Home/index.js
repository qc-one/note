
import './index.scss'
import React, {Component} from 'react'

import Content from './Content.js'
import Control from './Control.js'

import TodoBox from './TodoBox.js'

class Home extends Component {
	
	render () {
		return (
			<div className = "container">
				Home
				<hr/>
				<TodoBox/>
			</div>
		)
	}
	
}

export default Home
