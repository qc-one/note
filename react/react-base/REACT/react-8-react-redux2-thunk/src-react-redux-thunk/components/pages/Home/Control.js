
import React, {Component} from 'react'
import actionCreator from '../../../store/allen/actionCreator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'



//UI组件
class Control extends Component {
		
	render () {
		console.log(this)
		return (
			<div>
				<button onClick = { this.props.subtract }>-</button>
				<button onClick = { this.props.increment }>+</button>
			</div>
		)
	}
	
}



//这个函数会接收到store.dispatch
//返回出去的对象上的方法会放入到UI组件的属性上
// let mapDispatchToProps = (dispatch) => {
// 	return {
// 		increment () {
// 			dispatch(actionCreator.increment())
// 		},
// 		a () {
// 			dispatch(actionCreator.a())
// 		},
// 		b() {
// 			dispatch(actionCreator.b())
// 		}
// 	}
// }

let mapDispatchToProps = dispatch => {
	//bindActionCreators 可以直接将actionCreator的方法做出处理，返回的对象的方法里就会自动的去dispatch掉这些创建好的action了
	//bindActionCreators会返回一个对象，这个对象里的方法其实就是actionCreator里的方法处理之后的结果，处理的情况：将原方法中创建的action直接dispatch走
	return bindActionCreators(actionCreator, dispatch)
}

export default connect(state => state,mapDispatchToProps)(Control)

