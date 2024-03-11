###项目开发

1. 利用create-react-app生成一个项目模板

2. 安装需要的依赖
	
	sass： node-sass sass-loader
	redux: redux react-redux redux-thunk
	swiper: swiper
	router: 目前市场上的路由工具使用的react-router，版本现在常用的有2、3、4，其中2,3相差不大，与vue-router基本一样，采取的都是集中管理路由配置，现在的4.0路由呢提倡的概念是不会集中管理，而是在哪里使用路由在哪里配置，并且取消很多api，路由钩子，更多是让用户自己去处理交互关系	
	并且router4.0只需要下载react-router-dom就可以了

3. 抽离配置文件，进行一些sass等环境的配置

	npm run eject
	
4. 重新配置项目结构

5. 简单的构建路由

6. 研究底部，因为其实不是所有的情况下都要显示底部：
	1. 在需要底部的组件中放入底部组件
	2. 在根组件中放入底部，当路由切换的时候做出判断之后，控制是否显示底部

7. 当我们进入到mine的时候判断是否有登陆信息，有的话去user，没有的话去login，在mine的componentWillMount里做的判断

	当我们登陆成功的时候，其实更改的store的state，这个时候mine接收的属性会变化，所以我们希望在mine的componentWillReceiveProps再判断一下是否登陆，如果登陆的话跳转到user
	
	不想在登陆组件里，等到登陆成功再去跳转，在user组件里，注销之后再去跳转
	
	而是希望让mine去统一的去监听变化之后进行跳转
	
	注意： 
		1. mine的componentWillReceiveProps会在路由变化的时候也触发，做出判断
		2. 在这个钩子函数里新的props还没有挂载到this上，所以，需要使用参数里的props

8. 考虑到目前市场上使用redux的时候，有如下的两种情况
	
	* 如vuex一样，只将需要共享的全局状态交由store管理
	* 将所有的数据，只要是异步获取后要使用的，都放入到store中管理
	第二种方式的优点： 让组件更轻量；数据能得到缓存，实现类似keep-alive
	
	推论：容器组件在设置mapStateToProps的时候，可以选择性的给UI组件传入需要的状态，而且，只有当该状态改变的时候，容器组件才会重新给UI组件传递新的属性

#### React-router 4+

在这里，我们学react-router 4.0版本，需要注意的是，在4.0中，路由的搭建更灵活，我们不会基于全局的对于路由进行管理，而是在使用的时候进行路由的配置

我们需要下载的也不是react-router了，而是 react-router-dom

[文档](http://reacttraining.cn/)

1. 首先现在最外层包裹上Router，Router分为两种：BrowserRouter/HashRouter

	BrowserRouter监听的是地址栏path的变化，HashRouter监听的是hash值的变化，在这里强烈推荐大家使用BrowserRouter，因为HashRouter在某些时候会报一个警告，不允许重复跳转


2. 在需要切换路由的时候，引入Route，path指定路径，component指定要渲染的组件，render可以传入一个函数，在这里逻辑判断之后再去返回一个组件，exact属性设置之后，只有完全匹配之后才能使用

3. switch 里面只运行渲染一个路由，可以有效的防止同级路由多次渲染



<Switch>
   	<Route exact path = '/' component = {Home} />
   	
   	
   	<Route path = '/render' render = {() => {
   		//做出一些逻辑操作之后，返回一个组件
   		return <div className = "content">render</div>
   	}} />
   	
   	<Route path = '/a/b' render = {() => {
   		//做出一些逻辑操作之后，返回一个组件
   		return <div className = "content">ab</div>
   	}} />
   	
   	<Route  path = '/a' render = {() => {
   		//做出一些逻辑操作之后，返回一个组件
   		return <div className = "content">a</div>
   	}} />
   	
   	
</Switch>

4. 重定向，可以使用Redirect组件，添加from、to属性进行重定向跳转

5. react-router中提供了Link和NavLink，都可以使用to属性进行跳转，NavLink可以对现在路由做出判断后给a标签加上样式或者类名，exact完全匹配

5. 路由传参数,react-router4里只有一种参数就是路由参数，需要配置 /detail/:id,而query参数能传，但是传的时候，和取的 时候都没有对应的api来使用

	它们都可以在this.props中的match、location里得到

6. withRouter高阶组件，高阶组件组件：就是一个函数，任务是为其他的组件添加一些属性和方法api，例如connect，可以将store中的一些东西安装到新生成的容器组件上

	withRouter可以根据传入的组件生成一个新的组件，并且为新组件添加上router相关的api
	
7. 编程式导航： 在组件中获取到history的api进行跳转，如果是路由组件，直接从this.props中取出，如果不是的话，可以让外面的路由组件传入，或者可以使用withRouter高阶组件处理之后使用



### router与redux的使用

在搭建了react-router的环境中，使用redux的全家桶的时候，还是一样的使用，只需将Provider还是包在最外面就好，

当我们进入到mine的时候，在componentWillMount里判断是否有用户信息，如果有的话，挂载在状态上去显示，如果没有的话，跳转到登陆路由

在login里，使用了无状态组件作为表单元素组件，注意，无状态组件无法使用ref做标记，所以只能做出受控组件来获取他们的value值，在登陆的时候调用actionCreator的方法来进行异步的登陆
成功之后更改state里的username，而且，无论成功失败都给回调函数传入相关的信息，回调接收到之后做出判断，如果登陆成功的话，跳转回mine






