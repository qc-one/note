
import './index.scss'
import React, {Component} from 'react'

import {connect} from "react-redux"
import actionCreator from '../../../store/allen/actionCreator'
import {bindActionCreators} from 'redux'

class Command extends Component {
	
	render () {
		console.log(this)
		return (
			<div className = "container">
				<button onClick={this.props.increament}>+</button>
				<button onClick={this.props.subtract}>-</button>
				<hr/>
			</div>
		)
	}
	
}

let mapStateToProps = state => {
	return {
		num: state.allen.num * 2 //相当于派生-》vuex中的getters
	}
}

//这个函数会接收到store.dispatch，将store中dispatch的方法放入到组件中
//返回出去的对象上的方法会放入到UI组件的属性上
let mapDispatchToProps = (dispatch) => {
//	return {
//		increament(){
//			dispatch(actionCreator.increament())
//		}
//	}

	//bindActionCreators可以直接将actionCreator的方法做出处理，返回对象的方法里就会自动的去dispatch掉这些创建好的action了
	//bindActionCreators会返回一个对象，这个对象里的方法就是actionCreator里的方法做出处理后的结果，处理情况：将原方法中创建的action直接dispatch走
	return {
		...bindActionCreators(actionCreator,dispatch)
	}
}

//生成容器组件
let Container = connect(mapStateToProps,mapDispatchToProps)(Command)
	
export default Container
