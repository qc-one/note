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

下载 npm i react-redux -S


在react-redux中，有一个概念：

组件应该划分一下类别：容器组件（智能组件）、UI组件（木偶组件）

这样的话，任何一个组件都可以分离成一个容器组件和一个UI组件的组合

容器组件去和store进行交互，获取状态...然后再将这些东西传递给UI组件，UI组件从属性里接收基于可以了

容器组件可以利用react-redux去根据现有的UI组件去自动生成

也就是说只是要需要和store进行交互的组件，我们就将其处理成容器组件和UI组件的结合，我们只需要写UI组件就可以了，容器组件会自动生成的


使用方法：

1. 在根组件外部包裹上Provider组件，并为其传入store

	<Provider store = { store }>
        <App />
    </Provider>

	目的，让Provider里面的所有的容器组件都可以使用到store里的东西

	Provider是通过context属性将自己的东西传递到内部子级组件中的

2. 把需要使用到全局状态的组件处理成容器组件和UI组件

	ContainerComponnet = connect()(UIComponent)
	
	让容器组件将自己context里的store相关的东西传递给UI组件

3. actionCreator的方法只负责创建对应的action就可以了，无需再去dispatch

4. 现在要让组件去调用store.dispatch，也就是说让组件得到store.dispatch的方法，这也属性在使用store的东西，这个时候也要生成一个容器组件

	传入mapDispatchToProps方法可以将一些方法传入到UI组件的属性上，而这些方法都能调用到dispatch，将actionCreator创建好的action传入到dispatch里就可以了

5. 可以利用bindActionCreators将actionCreator的方法处理一下产生新方法，在新方法里已经自动的将原方法里产生action给dispatch了

6. 这个时候，actionCreator变得纯粹了很多，不用去dispatch，专注的返回action就可以了，但是，如果我们有异步动作的话，现在放在action里直接不生效了

	在这里，我们使用redux的中间件来处理，redux的中间件有很多：redux-thunk、redux-promise、redux-saga......

	在这里我们学习使用redux-thunk


### redux-thunk的使用方法

1. npm i redux-thunk -S


2. 将thunk中间在在创建store的时候加入进去

import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import reducer from './reducer'

const store = createStore(reducer, applyMiddleware(thunk))

3. actionCreator里的方法就可以返回一个函数。这个函数会接收到dispatch

	所以，如果有异步的动作，就在对应的actionCreator的方法里返回一个接收到dispatch的函数，在这个函数中创建action再手动的dispatch