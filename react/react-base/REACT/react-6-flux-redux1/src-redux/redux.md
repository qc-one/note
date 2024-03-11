### redux

1. 下载redux工具
	cnpm i redux -S
2. 创建store

	const store = createStore(reducer)
	
3. 创建reducer纯函数

4. 为store挂载默认状态

	为reducer的state参数设置默认值，再返回出新的state，这样的话，store就有state了

5. 组件使用store的state

	组件通过调用store.getState()来获得store中的state

6. 创建actionCreator
	
	actionCreator里的方法，作用是执行一些自定义逻辑之后，创建一个带有标识性信息的action，交由reducer处理
	
	store.dispatch(action)
	
7. 在reducer中，根据action上的标识信息做出判断之后，返回一个新状态，这个时候store里的状态已经更改了

8. 让组件去获取最新的状态