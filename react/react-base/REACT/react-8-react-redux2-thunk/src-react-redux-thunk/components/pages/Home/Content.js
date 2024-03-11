
import React, {Component} from 'react'
import { connect } from 'react-redux'
// UI组件
class Content extends Component {
	render () {
       console.log(this)
		return (
			<div>
				num: { this.props.num }
			</div>
		)
	}
	
}

//将状态传递到UI组件的属性上
//接收到真正的state，返回什么，UI组件的属性上就会有什么
let mapStateToProps = state => {
	return {
		num: state.allen.num * 2 //相当于派生-》vuex中的getters
	}
}

//生成容器组件
let Container = connect(mapStateToProps)(Content)

export default Container

