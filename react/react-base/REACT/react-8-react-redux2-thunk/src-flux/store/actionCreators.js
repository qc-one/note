
import {
	INCREMENT
} from './const'

import dispatcher from './dispatcher'

export default {
	
	increment () {
		//在这里我们可以做一些异步的操作...
		//然后创建一个对应的action对象，交给dispatcher处理
		let action = {
			//标示性休息
			type: INCREMENT
		}
		//将action提交给dispatcher
		dispatcher.dispatch(action)
	}
	
}
