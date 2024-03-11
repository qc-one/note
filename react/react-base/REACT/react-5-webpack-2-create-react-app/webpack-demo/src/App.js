//在以前，react组合的会使用.jsx后缀的文件来写

import PropTypes from 'prop-types';
import React, { Component } from 'react'
import './App.scss'

import HelloWorld from './components/HelloWorld'

//es6使用类作为组件
//es6的组件缺少了两个钩子函数(getDefaultProps, getInitialState)，多了一个钩子函数(constructor)
class App extends Component {
	constructor (props) {
		super( props )
		
		//在这里挂载默认状态
		this.state = {
			author: 'allen'
		}		
	}
	
	componentWillMount () {
		this.setState({author: 'tommy'})
	}
	
	handleClick () {
		alert(1)
	}
	
	render () {
		return (
			<div>
				<h1 onClick = { this.handleClick }>Hello { this.props.message }</h1>
				<p> 作者: {this.state.author} </p>
				<p> 名字: {this.props.name.a} </p>
				<HelloWorld/>
			</div>
		)
	}
	
}
App.propTypes = {
  name: PropTypes.string
};
//在这里挂载默认属性
App.defaultProps = {
	message: 'ReactJS'
}
console.log(PropTypes)


export default App