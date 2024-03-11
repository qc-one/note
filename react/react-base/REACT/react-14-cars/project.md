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


9. 在开发列表页的时候，需要用到无限加载的技术，我们的做法一开始是这样的：

	创建List组件，再创建一个GoodsItem组件，让List去获取数据，并监听滚动条的变化，当到达某个区域的时候，执行加载更多的方法
	
	然后我们想到，以后可能还会遇到无限加载的效果，所以决定封装一个ListView的组件！
	
	总体的功能可以划分： 获取数据，加载更多、滚动监听..
	
	其实我们让ListView承载的功能只有滚动监听和渲染数据
	
	封装了ListView组件，它的api：
	
	data： 需要渲染的数据整体   必传
	row：  传入渲染item组件的高阶组件 必传
	distance： 距离底部有多少的时候去加载更多  默认：30
	loadMore： 加载更多的具体执行函数  必传
	onScroll： 监听滚动的回调  
	
	做出标记之后，调用scrollTo方法就可以实现滚动到某个位置
	
	Toast
	
	Toast.info({
		message: '哈哈哈'，
		duration: 2000 , 2000
		position: 'top middle bottom',middle
	})
	Toast.loading()	
	let toast = Toast.loading({message: '哈哈哈哈'})
	toast.close()

10. 使用了antd-mobile组件库对项目进行优化，在做请求的时候利用Toast组件做消息的展示

11. 实现了购物车！

	实现了登陆验证，在加入购物车按钮被点击的时候，去判断了是否登陆
	在登陆完成之后，需要进行初始化的购物车信息获取，本来我们是写在mine里的，因为当登陆成功之后，相当于store中的state被更改，而mine组件已经做好了容器组件的处理，也就是说当store里的state更改的时候，mine相当于接收到了新的属性，会在mine的componentWillReceiveProps里去判断是否登陆，如果登陆了跳转到/mine/user，同时使其获取初始化的购物车数据
	
	但是，有一个问题，比如得进入到mine之后，如果登陆了的话才能获取初始化的购物车数据，如果一开始没有进mine而是进的cars，这个时候依然没有初始的购物车数据，所以，我们将获取初始化的购物车数据的动作，放在App这个根组件的初始化阶段钩子函数里执行，保证只要进入项目，就会根据登陆情况去获取最新的数据
	
	....
	
	
	
12.  支付

	目前，市场的支付，基本都是第三方支付！
	
		微信、支付宝、银联
		
	支付套路：	
		1. pc端的话，打开一个页面，里面有一个二维码，用户去扫码支付，当前页面会等等用户点击之后进行支付成功验证
		2. 移动端里：打开支付宝应用！然后在页面上依然等待

	想要使用第三方登陆、第三方的支付，都需要去进行权限申请来得到appid，appsecret （ 需要企业认证信息！ ）
	当我们点击支付的时候，会发送ajax到后端，后端生成订单提交给第三方，第三方将结果（url）返回给我们后端，后端再传递给前端，前端打开新窗口并且弹出弹出框（支付完成，遇到问题），当用户扫码支付完成后，第三方就会得知，用户点击支付完成，ajax后端，后端询问第三方有没有支付成功，将结果返回给前端！！
	

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






