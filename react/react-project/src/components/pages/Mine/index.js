
import './index.scss'
import React, {Component} from 'react'

import {Route} from 'react-router-dom'

import Login from './Login'
import User from './User'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import actionCreator from '../../../store/user/actionCreator'

class Mine extends Component {
	
	checkLogin(props){
			
		let _props = props || this.props
		
		let { path } = _props.match
		if (!_props.user.userInfo) {
			console.log('没登陆')
			_props.history.replace(`${path}/login`)
		}else{
			console.log('登陆了')
			_props.history.replace(`${path}/user`)
		}
	}
	componentWillMount(){
		this.checkLogin()
	}
	componentWillReceiveProps(props){
		console.log("hahahah")
		//当store里的数据更改的时候，容器组件会给UI组件传入新的属性，这个生命周期钩子函数会执行
		//当用户信息更改的时候，这个函数会执行，
		//当路由信息改变的时候，因为Mine是路由组件，所以它属性上的location..都会改变，也相当于属性改变，这个函数也会执行
		//我们想要做的是当用户信息改变的时候，在这个函数里判断是否跳转到user，所以得专门的去判断当用户恓改变的情况下再去做处理
		if( props.user.userInfo !== this.props.user.userInfo ) {
			this.checkLogin(props)
		}
	}
	render () {
		let {path} = this.props.match
		return (
			<div>
				<Route path={`${path}/login`} component={Login} />
				<Route path={`${path}/user`} component={User} />
			</div>
		)
	}
	
} 

let mapStateToProps = (state) => {
	return state
}
let mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators(actionCreator,dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Mine)
