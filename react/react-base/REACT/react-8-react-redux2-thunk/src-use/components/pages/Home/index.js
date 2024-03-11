
import './index.scss'
import React, {Component} from 'react'

import Content from './Content'
import Control from './Control'

class Home extends Component {
	
	
	render () {
		return (
			<div className = "container">
				Home
				<hr/>
				<Content/>
				<hr/>
				<Control/>
			</div>
		)
	}
	
}

export default Home

