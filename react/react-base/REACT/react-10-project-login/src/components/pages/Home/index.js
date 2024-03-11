
import './index.scss'
import React, {Component} from 'react'





class Home extends Component {
	
	
	render () {
		return (
			<div>
				Home
				
			</div>
		)
	}
	
}
export default Home
//
//let high = connect()
//	
//	high(A)


//class A extends Component {
//	render () {
//		return (
//			<div onClick = {this.props.c} >a</div>
//		)
//	}
//}
//class B extends Component {
//	render () {
//		return (
//			<div  onClick = {this.props.c} >b</div>
//		)
//	}
//}
////高阶组件
//const withC = (Template) => {
//	
//	return class extends Component {
//		c () {
//			alert('hello world')
//		}
//		render () {
//			return (
//				<Template c = {this.c} />
//			)
//		}
//	}
//}
//
//const CA = withC(A)
//const CB = withC(B)
//
//class Home extends Component {
//	
//	
//	render () {
//		console.log(this.props)
//		return (
//			<div>
//				Home
//				<CA/>
//				<CB/>
//			</div>
//		)
//	}
//	
//}


