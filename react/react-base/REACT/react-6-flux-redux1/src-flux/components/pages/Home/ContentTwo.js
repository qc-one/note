
import React, {Component} from 'react'

import store from '../../../store'
class ContentTwo extends Component {
	constructor (props) {
		super(props)
		//将store中保存的状态放入到组件的状态中
		this.state = {
			num: store.getState().num
		}
	}
	componentWillMount () {
		store.addEventListener(() => {
			//当这个函数执行的时候，说明store的num-change事件就会触发，也就是说，在这个时候store的状态已经改了
			//在这里让组件去获取最近的状态
			this.setState({num: store.getState().num})
		})
	}
	
	render () {
		return (
			<div>
				num: {this.state.num}
			</div>
		)
	}
	
}

export default ContentTwo
