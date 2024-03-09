
import './index.scss'
import React, {Component} from 'react'

import Content from './Content.js'
import Control from './Control.js'

import TodoBox from './TodoBox.js'

import Num from './Num.js'
import Command from './Command.js'

class Home extends Component {
	
	render () {
		return (
			<div className = "container">
				Home
				<hr/>
				<Num/>
				<Command/>
			</div>
		)
	}
	
}

export default Home
