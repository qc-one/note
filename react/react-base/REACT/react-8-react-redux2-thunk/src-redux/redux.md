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
	
	actionCreator里的方法，作用是执行一些自定逻辑之后，创建一个带有标识性信息的action，交由reducer处理
	
	store.dispatch(action)
	
7. 在reducer中，根据action上的标识信息做出判断之后，返回一个新状态，这个时候store里的状态已经更改了

8. 让组件去获取最新的状态

	在组件的初始化阶段的生命周期钩子函数中给store.subscribe传入回调函数，当状态更改的时候这个回调函数就会触发，在这个回调里就可以让组件获取最新的状态之后进行setState，当然，如果发现所用的状态没有更改可以做出判断来决定是否进行setState



### reducer划分

当我们协同开发的时候，或者项目独立功能模块较多的时候，把状态放在一个reducer中处理的话会导致更新维护比较麻烦

在这里我们研究将store进行模块化的管理

actionCreator、state本身与store耦合度很低，最主要的是把reducer拆分开

我们可以利用combindReducers函数，将分离开的renducer整合成一个，这样的话，需要注意的是在使用的时候，state也会根据划分的reducer有一个不同的分布


### react-redux

这是一个好东西！

对比redux与vue中的vuex，vuex要比redux用起来简单、方便！

因为vuex是vue的一个工具、插件，与vue的耦合度高，所以里面很多东西作者已经给我们封装好了

但是redux不只是react可以用，很多地方都能去用，所以在react中使用redux的时候，很多东西都需要我们自己写~

麻烦的地方：

1. 组件获取状态较为麻烦
2. 状态更新之后，组件需要手动的获取最新状态
3. 组件使用actionCreator的方法也不是很方便

所以现在学习使用react-redux工具，这个工具是准么将react和redux连接起来的

