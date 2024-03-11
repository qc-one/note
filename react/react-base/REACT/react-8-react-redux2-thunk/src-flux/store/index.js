
import { EventEmitter } from 'events'
//store需要拥有能绑定事件和触发事件的能力

const store = Object.assign({},EventEmitter.prototype, {
	state: {//存放共享状态的
		num: 0
	},
	getState () {
		return this.state
	},
	increment () {
		this.state.num ++
		console.log(this.state)
		this.emit('num-change')
	},
	addEventListener (callback) {
		//当这个事件触发的时候，组件里面的函数就会执行
		this.on('num-change',callback)
	}	
	
})
export default store

//$.extend
//var a = {
//	x:1
//}
//
//var b = {
//	y:2
//}
//
//var c = {
//	z:3
//}
//
//c = Object.assign({
//	z:3
//},a,b)
