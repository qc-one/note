
import './index.scss'
import React, {Component} from 'react'

import Banner from './Banner'
import Content from './Content'

class Home extends Component {
	
	render () {
		return (
			<div className = "page-footer home">
				Home
				<Banner/>
				<Content/>
			</div>
		)
	}
	
}

export default Home
