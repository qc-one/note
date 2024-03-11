
import './index.scss'
import React, {Component} from 'react'

import TodoBox from './TodoBox'

class Home extends Component {
	
	
	render () {
		return (
			<div className = "container">
				<TodoBox/>
			</div>
		)
	}
	
}

export default Home

//将共享状态放入store中之后，每个组件的关注点就不一样了，使用状态的，就直接使用，更改状态就直接更改，不需要关注不同组件间如何同步