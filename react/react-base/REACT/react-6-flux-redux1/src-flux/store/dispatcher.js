

import { Dispatcher } from 'flux'
import store from  './index'
import {
	INCREMENT
} from './const'

let dispatcher = new Dispatcher()

//为dispatcher注册一个函数，这个函数会在actionCreator将action传递过来的时候触发
dispatcher.register((action) => {
	//dispatcher接收到action之后，做出判断之后去通知store更改状态
	
	switch ( action.type ) {
		case INCREMENT:
		//调用store的方法
			store.increment()
			break;
	}
})

export default dispatcher