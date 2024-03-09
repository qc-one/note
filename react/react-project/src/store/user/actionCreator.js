
//actionCreator里的方法，作用是执行一些自定逻辑之后，创建一个带有标识性信息的action，交由reducer处理
import store from '../index'
import {
	CHANGE_USERNAME,
	EXIT
} from './const'
export default {
	login({username,password,success,fail}){
		let _fail = fail || function () {}
		//闭包
		return dispatch => {
			setTimeout(() => {
				if (username === '123' && password === '456') {
					dispatch({
						type: CHANGE_USERNAME,
						userInfo: {
							username: '二狗子',
							signature: '将来的你一定会感谢现在奋斗的你！'
						}
					})
					//成功回调
					success()
					return ;
				}
				_fail()
			},1000)
		}
	},
	exit () {
		return {
			type: EXIT
		}
	}
}
