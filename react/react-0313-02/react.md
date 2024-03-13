#   React

用于构建用户界面的 JavaScript 库

react中如果请求的路径不存在，它会把public文件夹中的idnex.html的内容返回（兜底页面）

## 疑问

+ react中为什么要使用jsx语法

  jsx创建虚拟dom比较方便

+ 什么事虚拟dom

+ react的状态为什么只能通过setState更改？

+ 解决多级路由刷新页面样式丢失问题

  1、public/index.html中引入样式时不写 ./ 写  /（常用）

  2、public/index.html中引入样式时不写 ./ 写 %PUBLIC_URL%（常用），只适用于react脚手架中

  3、使用HashRouter

## 一、react的特点

+ 采用组件化模式、声明式编码，提高开发效率及组件复用率
+ 在React Native中可以使用react语法进行移动端开发
+ 使用虚拟DOM+优秀的diffing算法，尽量减少与真实dom的交互

## 二、虚拟dom

### 1、使用jsx创建虚拟dom

```javascript
// 创建虚拟dom
let VDOM = <h1>hello react</h1>;
// 渲染虚拟dom到页面
ReactDOM.render(VDOM, document.getElementById("test"));
```

### 2、使用js创建虚拟dom

```javascript
// 创建虚拟dom
// let VDOM = React.createElement(标签名, 标签属性, 标签内容);
let VDOM = React.createElement('h1', {
	id: 'title'
}, React.createElement('span', {
	id: 'sp'
}, 'hello react'));
// 渲染虚拟dom到页面
ReactDOM.render(VDOM, document.getElementById("test"));
```

### 3、虚拟dom与真实dom

```javascript
// 创建虚拟dom
let VDOM = (
<h1>
	hello react
</h1>
);
// 渲染虚拟dom到页面
ReactDOM.render(VDOM, document.getElementById("test"));
console.log('虚拟dom', VDOM);
let TDOM = document.getElementById('demo');
console.log('真实dom', TDOM);
/* 
    虚拟dom：
    1、本质是Object类型的对象
    2、虚拟dom比较“轻”，真实dom比较“重”，因为虚拟dom是react内部在用，无需真实dom身上那么多属性
    3、虚拟dom最终会被react转化为真实dom，呈现在页面上
*/
```

## 三、React JSX

### 1、JSX

+ 全称：Javascript XML
+ react定义的一种类似于XML的JS扩展语法：JS+XML
+ 本质是React.createElement(component,props,...children)方法的语法糖
+ 用来简化创建虚拟dom：
  + 写法：let ele = <h1>hello react</h1>
  + 注意：它不是字符串，也不是HTML/XML标签，它最终产生的就是一个JS对象
+ 标签名任意：HTML标签或其它标签

```javascript
let myId = "myID";
let myData = "Hello,React";
// 创建虚拟dom
let VDOM = (
    <div>
        <h1 className="title" id={myId}>
        	<span style={{color: "red", fontSize: "70px"}}>{myData}</span>
        </h1>
        <input type="text"/>    
    </div>
);
// 渲染虚拟dom到页面
ReactDOM.render(VDOM, document.getElementById("test"));
/* 
    JSX语法规则：
    1、定义虚拟dom时不要写引号
    2、标签中混入js表达式时要用{}
    3、指定标签的类名不要使用class，要使用className
    4、内联样式要用style={{key:value}}的形式写，复合样式要使用小驼峰的形式
    5、JSX语法要求最外层只能有一个跟标签
    6、标签必须闭合
    7、标签首字母
    	a、若小写字母开头，则将标签转为HTML中的同名元素；若HTML中没有该标签对应对应的同名元素，则报错；
    	b、若大写字母开头，react就会渲染对应的组件，若组件没有定义，则报错；
*/
```

## 四、模块与组件、模块化与组件化

### 1、模块

+ 理解：向外提供特定功能的js程序，一般是js文件
+ 为什么要拆分模块：随着业务逻辑增加，代码越来越多且复杂
+ 作用：复用js，简化js的编写，提高js运行效率

### 2、组件

+ 理解：用来实现局部功能效果的代码和资源集合
+ 为什么要拆分组件：一个界面的功能比较复杂
+ 作用：复用编码，简化项目编码，提高运行效率

### 3、模块化

​	当应用的js都以模块来编写，这个应用就是一个模块化的应用

### 4、组件化

​	当应用是以多组件的形式实现，这个应用就是一个组件化的应用 

## 五、React面向组件编程

### 5.1函数式组件

### 5.2类式组件

### 5.3组件实例的三大核心属性之一：state

#### 5.3.1理解

state是组件对象最重要的属性，值是对象（可以包含多个key-value的组合），组件被称为“状态机”，通过更新组件的state来更新对应的页面显示（重新渲染组件）

注意：

​	1.组件中render方法中的this为组件实例对象

​	2.组件自定义的方法中this为undefined，如何解决？

​		a.强制绑定this：通过函数对象的bind()

​		b.箭头函数

​	3.状态数据不能直接修改或更新

### 5.4组件实例的三大核心属性之二：props

#### 5.4.1理解

​	每个组件对象都会有props属性，组件标签的所有属性都保存在props中。

#### 5.4.2 props基本使用

```javascript
class Person extends React.Component {
    constructor(props) {
    	super(props);
    }
    static propTypes = {
        // name: React.PropTypes.string  16版本之前这样写
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        speak: PropTypes.func
    }
    static defaultProps = {
        sex: "未知"
    }
    render() {
        let {name,age,sex} = this.props;
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>年龄：{age + 1}</li>
                <li>性别：{sex}</li>
            </ul>
        )
    }
}
// 属性规则
Person.propTypes = {
    // name: React.PropTypes.string  16版本之前这样写
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    speak: PropTypes.func
}
Person.defaultProps = {
    sex: "未知"
}
// 属性类型限制、添加属性默认值、属性是否必传
ReactDOM.render(<Person name="tom" age={18} sex="男"/>, document.getElementById("test1"));
ReactDOM.render(<Person name="tom" age={98} sex="男"/>, document.getElementById("test2"));
// 批量传递props
let p = {
    name: "jerry",
    age: 12,
    sex: "nv"
}
// {}是一个分割符
ReactDOM.render(<Person {...p}/>, document.getElementById("test3"));
```

#### 5.4.3 函数式组件使用props

```javascript
function Person(props) {
    let {name,age,sex} = props;
    return (
        <ul>
            <li>姓名：{name}</li>
            <li>年龄：{age + 1}</li>
            <li>性别：{sex}</li>
        </ul>
    )
}
// 属性规则
Person.propTypes = {
    // name: React.PropTypes.string  16版本之前这样写
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    speak: PropTypes.func
}
Person.defaultProps = {
	sex: "未知"
}
// 属性类型限制、添加属性默认值、属性是否必传
ReactDOM.render(<Person name="jsdkjf" age={18} speak={speak}/>, document.getElementById("test1"));
```

### 5.5 组件实例的三大核心属性之三：refs与事件处理

#### 5.5.1 字符串形式

```javascript
// 创建组件
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.handle = this.handle.bind(this);
    }
    render() {
        return (
            <div>
                <input ref="input1" type="text" placeholder="点击提示数据"/>
                <button style={{margin: "20px"}} onClick={this.handle}>点击提示数据</button>
                <input type="text" placeholder="失去焦点提示数据"/>
            </div>  
    	);
    }
    handle() {
        console.log(this);
        console.log(this.refs.input1.value);
    }
}
// 渲染组件到页面
ReactDOM.render(<Demo/>, document.getElementById("test"))
```

#### 5.5.2 回调函数形式

```
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.handle = this.handle.bind(this);
    }
    render() {
        return (
            <div>
                <input ref={(e) => {this.input1 = e}} type="text" placeholder="点击提示数据"/>
                <button style={{margin: "20px"}} onClick={this.handle}>点击提示数据</button>
                <input ref="input2" onBlur={this.handle2} type="text" placeholder="失去焦点提示数据"/>
            </div>  
        );
    }
    handle() {
    	console.log(this.input1.value);
    }
    handle2 = () => {
    	console.log(this.refs.input2.value);
    }
}
// 渲染组件到页面
ReactDOM.render(<Demo/>, document.getElementById("test"))
```

#### 5.5.3 createRef

```javascript
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.handle = this.handle.bind(this);
    }
    /* 
    React.createRef()调用后可以返回一个容器，该容器可以储存被ref所标识的节点，该容器是专人专用，只能存一个
    */
    myRef = React.createRef()
    render() {
        return (
            <div>
                <input ref={this.myRef} type="text" placeholder="点击提示数据"/>
                <input ref={this.myRef} type="text" placeholder="点击提示数据"/>
                <button style={{margin: "20px"}} onClick={this.handle}>点击提示数据</button>
                <input ref="input2" onBlur={this.handle2} type="text" placeholder="失去焦点提示数据"/>
            </div>  
        );
    }
    handle() {
    	console.log(this.myRef);
    }
    handle2 = () => {
    	console.log(this.refs.input2.value);
    }
}
// 渲染组件到页面
ReactDOM.render(<Demo/>, document.getElementById("test"))
```

#### 5.5.4 事件处理

​	通过onXxx属性指定事件处理函数（注意大小写）

​		a.React使用的是自定义事件，而不是使用的原生DOM事件

​		b.React中的事件是通过事件委托方式处理的（委托给组件最外层的元素）

​	通过event.target得到发生事件的DOM元素对象

### 5.6 收集表单数据

#### 5.6.1 受控组件

​	页面中所有输入类的DOM，随着用户的输入，将状态维护到state中，再从state中获取用户的输入

#### 5.6.2 非受控组件

### 5.7 高阶函数-函数柯里化

 高阶函数：如果一个函数符合下面2个规则中的任何一个，则就是高阶函数。

​        1、若A函数，接收的参数是一个函数，那么A就是高阶函数。

​        2、若A函数，调用的返回值依然是一个函数，那么A就是高阶函数。

 函数柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。

## 六、生命周期

### 6.1 生命周期三个阶段（旧）

#### 6.1.1 初始化阶段：由ReactDOM.render()触发---初次渲染

​	1、constructor()

​	2、componentWillMount()

​	3、render()

​	4、**componentDidMount()**

#### 6.1.2 更新阶段：由组件内部this.setState()或父组件重新render触发

​	1、shouldComponentUpdate()

​	2、componentWillUpdate()

​	3、render()

​	4、componentDidUpdate()

#### 6.1.3 卸载组件：由ReactDOM.unmountComponentAtNode()触发

​	1、**componentWillUnmount()**

## 七、react应用（基于react脚手架）

**react脚手架中webpack配置文件都隐藏了，运行npm run eject可以显示出webpack的配置**

### 7.1 使用create-react-app创建react应用

#### 7.1.1 react脚手架

​	react提供了一个用于创建react项目的脚手架：create-react-app

​	项目的整体技术架构为：react-webpack-es6-eslint

​	使用脚手架开发项目的特点：模块化、组件化、工程化

#### 7.1.2 创建项目并启动

​	第一步：全局安装npm install -g create-react-app

​	第二步：切换到想创建项目的目录，使用命令create-react-app hello-react

​	第三步：进入项目文件夹cd hello-react

​	第四步：启动项目：npm start

#### 7.1.3 文件夹目录

puiblic：存放静态资源文件

​	favicon.icon---网站页面标签

​	index.html---主页面

​	logo192.png---logo图

​	logo512.png---logo图

​	manifest.json---应用加壳的配置文件

​	robots.txt---爬虫协议文件

src：源码文件夹

​	App.css---App组件的样式

​	App.js---App组件

​	App.test.js---用于给app做测试

​	index.css---样式

​	index.js---入口文件

​	logo.svg---logo图

​	reportWebVitals.js---页面性能分析文件（需要web-vitals库的支持）

​	setupTests.js---组件单元测试的文件（需要jest-dom库的支持）

**快捷键：** 插件ES7 React/Redux

​	rcc、rfc

uuid生成唯一一个id库，比较大

nanoid也可以生成一个唯一的id

#### 使用nanoid

安装：npm install nanoid

引入：import {nanoid} from 'nanoid'

nanoid是一个函数，每次调用都能生成一个唯一的字符串

## 八、react ajax

### 8.1 理解

​	react本身只关注于界面，并不包含发送ajax请求的代码，前端应用需要通过ajax请求与后台进行交互（json数据），react应用中需要集成第三方ajax库（或自己封装）。

​	常用的ajax请求库：

​		（1）jQuery：比较重，需要另外引入，不建议使用

​		（2）axios：轻量级，建议使用

​				1、封装XmlHttpRequest对象的ajax

​				2、promise风格

​				3、可以用在浏览器端和node服务器端

### 8.2 axios

​	安装axios：npm install axios

​	使用：

```javascript
import axios from 'axios';
```

配置代理：

​	第一种方法

```javascript
// app.js
axios.get('http://localhost:3000/students').then((res) => {
	console.log(res);
}).catch((error) => {
	console.log(error);
})
```

```json
// package.json
{
	"proxy": "http://localhost:5000"
}
```

缺点：只能配置一个服务器地址

​	第二种方法

```javascript
// 在src文件夹中新建setupProxy.js
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy('/api1', {
            target: 'http://localhost:5000',
            changeOrigin: true,
            pathRewrite: {
                '^/api1': ''
            }
        }),
        proxy('/api2', {
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrite: {
                '^/api2': ''
            }
        })
    )
}
```

```javascript
getData = () => {
	axios.get('http://localhost:3000/api1/students').then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    })
}
getDataCars = () => {
    axios.get('http://localhost:3000/api2/cars').then((res) => {
    	console.log(res);
    }).catch((error) => {
    	console.log(error);
    })
}
```

#### react脚手架配置代理总结

##### 方法一

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

##### 方法二

1. 第一步：创建代理配置文件

   ```
   在src下创建配置文件：src/setupProxy.js
   ```

2. 编写setupProxy.js配置具体代理规则：

   ```js
   const proxy = require('http-proxy-middleware')
   
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
   ```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。

### 8.3 fetch

fetch是原生函数，不再使用XMLHttpRequest对象提交ajax请求

```javascript
search = async () => {
    let {keyWordEle: {value: keyword}} = this;
    this.props.updateAppState({isFirst: false, isLoading: true});
    try {
        let res = await fetch('api1/search/users');
        let data = await res.json();
        console.log(data);
    } catch (e) {
    	console.log(e, '请求出错');
    }
}
```

## 九、兄弟组件通信

### 9.1 消息订阅与发布机制

工具库：PubSubJS

下载：npm install pubsub-js --save

使用：import PubSub from 'pubsub-js'

​			PubSub.subscribe('delete', function() {}); //订阅

​			PubSub.publish('delete', data); // 发布消息

## 十、react路由

### 10.1 SPA的理解

​	1、单页web应用

​	2、整个应用只有一个完整的页面

​	3、点击页面中的链接不会刷新页面，只会做页面的局部更新

​	4、数据都需要通过ajax请求获取，并在前端异步展现

### 10.2 路由的理解

​	1、什么是路由

​		一个路由就是一个映射关系，key为路由，value可能是function或component

​		检测浏览器路径的变化

​	2、路由的分类

​		后端路由：

​			value是function，用来处理客户端提交的请求。

​			注册路由：router.get(path,function(req,res))

​			工作过程：当node接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据

​		前端路由：

​			浏览器端路由，value是component，用于展示页面内容。

​			注册路由：<Route path="/test" component={Test}>

​			工作过程：当浏览器的path变为/test时，当前路由组件就会变为Test组件

### 10.3 前端路由的原理

```html
<body>
	<a href="http://www.atguigu.com" onclick="return push('/test1') ">push test1</a><br><br>
	<button onClick="push('/test2')">push test2</button><br><br>
	<button onClick="replace('/test3')">replace test3</button><br><br>
	<button onClick="back()">&lt;= 回退</button>
	<button onClick="forword()">前进 =&gt;</button>

	<script type="text/javascript" src="https://cdn.bootcss.com/history/4.7.2/history.js"></script>
	<script type="text/javascript">
		// let history = History.createBrowserHistory() //方法一，直接使用H5推出的history身上的API
		let history = History.createHashHistory() //方法二，hash值（锚点）

		function push (path) {
			history.push(path)
			return false
		}

		function replace (path) {
			history.replace(path)
		}

		function back() {
			history.goBack()
		}

		function forword() {
			history.goForward()
		}

		history.listen((location) => {
			console.log('请求路由路径变化了', location)
		})
	</script>
</body>
```

### 10.4 react-router的理解

​	react的一个插件库，专门用来实现SPA应用，基于react的项目基本都会用到此库。

#### 10.4.1react-router相关API

​		内置组件：

​			<BrowserRouter>、<HashRouter>、<Route>、<Redirect>、<Link>、<NavLink>、<Switch>

​		其它：

​			history对象、match对象、withRouter函数

##### NavLink

	<NavLink>是<Link>的一个特定版本，会在匹配上当前的url的时候给已经渲染的元素添加参数，组件的属性有
	<NavLink activeClassName="active" className="list-group-item" to="/about">About</NavLink>
	<NavLink activeClassName="active" className="list-group-item" to="/home">Home</NavLink>

activeClassName(string)：设置选中样式，默认值为active
activeStyle(object)：当元素被选中时，为此元素添加样式
exact(bool)：为true时，只有当导致和完全匹配class和style才会应用
strict(bool)：为true时，在确定为位置是否与当前URL匹配时，将考虑位置pathname后的斜线
isActive(func)判断链接是否激活的额外逻辑的功能

##### Switch

通常情况下，path和component是一一对应的关系，Switch可以提高路由匹配效率（单一匹配）。

 渲染第一个被location匹配到的并且作为子元素的**<Route>**或者**<Redirect>**

<Switch>是唯一的因为它仅仅只会渲染一个路径。相比之下（不使用<Switch>包裹的情况下），每一个被location匹配到的<Route>将都会被渲染。

```javascript
// app.js
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
</Switch>
```



#### 10.4.2 react-router-dom

​		下载：npm install react-router-dom

​		路由的基本使用：

​			1、明确好界面中的导航区、展示区

​			2、导航区的a标签改为Link标签

​					<Link to="/xxx">Demo</Link>

​			3、展示区写Router标签进行路由的匹配

​					<Route path="/xxx" component={Demo}/>

​			4、<App>的最外侧包裹了一个<BrowserRouter>或<HashRouter>

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```

```javascript
// app.js
import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/* 原生html中，靠<a>跳转不同的页面 */}
                            {/* <a className="list-group-item active" href="./about.html">About</a>
                            <a className="list-group-item" href="./home.html">Home</a> */}
                            {/* 在React中靠路由连接实现切换组件 */}
                            <Link className="list-group-item" to="/about">About</Link>
                            <Link className="list-group-item" to="/home">Home</Link>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/* 注册路由 */}
                                <Route path="/about" component={About}/>
                                <Route path="/home" component={Home}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;

```

### 10.5 组件

	#### 10.5.1 路由组件

​	靠路由进行匹配，如果匹配上的组件是路由组件

​	路由组件的props会收到location、history和match

#### 10.5.2 一般组件

​	直接通过组件标签使用的组件

​		标签体内容是一个特殊的标签属性，通过this.props.children可以来获取标签体内容

### 10.6 路由你的精准匹配和模糊匹配

​	react-router默认是模糊匹配，输入的路径必须要包含匹配的路径，且顺序要一致

开启精准匹配：

```javascript
<Route exact={true} path="/qc/home" component={Home}/>
```

严格匹配不要随便开启，需要再开，有时候开启会导致无法继续匹配二级路由。

### 10.7 Redirect重定向

​	一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指向的路由。

```javascript
<Switch>
    <Route redirect="/" path="/qc/about" component={About}/>
    <Route exact={true} path="/qc/home" component={Home}/>
    <Redirect to="/qc/about"></Redirect>
</Switch>
```

### 10.8 嵌套路由

​	路由的匹配是由最先注册的路由开始匹配

​	不要随便开启严格匹配，否则二级路由都会失效

​	注册子路由时要写上父路由的path值

​	路由的匹配是按照注册路由的顺序进行的

### 10.9 路由传参

第一种：params参数

路由链接携带参数：<Link to={`/home/message/detail/${item.id}/${item.title}`} title="News">{item.title}</Link>

注册路由声明接收：<Route path="/home/message/detail/:id/:title" component={Detail}/>

接收参数：let {id, title} = this.props.match.params;

```javascript
<li key={item.id}>
 	{/* 向路由组件传params参数 */}
 	<Link to={`/home/message/detail/${item.id}/${item.title}`} title="News">{item.title}</Link>
</li>

<Switch>
	{/* 声明接收params参数 */}
	<Route path="/home/message/detail/:id/:title" component={Detail}/>
</Switch>
```

```javascript
render() {
    console.log(this.props, 'proips');
    // 接收params参数
    let {id, title} = this.props.match.params;
    let result = data.find((item) => {
    	return item.id === id
    })
    return (
        <ul>
            <li>ID:{id}</li>
            <li>title:{title}</li>
            <li>内容:{result.content}</li>
        </ul>
    );
}
```

第二种：search参数

路由链接携带参数：<Link to={`/home/message/detail/?id=${item.id}&title=${item.title}`} title="News">{item.title}</Link>

注册路由，无需声明，正常注册即可：<Route path="/home/message/detail" component={Detail}/>

接收参数：import qs from 'querystring';

 // 接收search参数
 let {search} = this.props.location;
 let {id, title} = qs.parse(search.slice(1));

备注：获取到的search是urlencode编码字符串，需要借助querystring解析

```javascript
 <li key={item.id}>
	{/* 向路由组件传search参数 */}
	<Link to={`/home/message/detail/?id=${item.id}&title=${item.title}`} title="News">{item.title}</Link>
</li>

<Switch>
	{/* search参数无需声明接收，正常注册路由即可 */}
	<Route path="/home/message/detail" component={Detail}/>
</Switch>
```

```javascript
 import qs from 'querystring';
 
 // 接收search参数
 let {search} = this.props.location;
 let {id, title} = qs.parse(search.slice(1));
```

第三种参数：state参数

​	优点：路径里面没有提示

​	缺点：复制地址之后，再别的窗口打开会报错，参数会丢失

```javascript
<li key={item.id}>
	{/* 向路由组件传state参数 */}
	<Link to={{pathname: '/home/message/detail', state: {id: item.id, title: item.title}}} title="News">{item.title}</Link>
</li>

<Switch>
	{/* state参数无需声明接收，正常注册路由即可 */}
	<Route path="/home/message/detail" component={Detail}/>
</Switch>
```

```
// 接收state参数
let {id, title} = this.props.location.state;
```

### 10.10 编程式路由跳转

借助this.props.history对象上的API操作路由跳转、前进、后退

```javascript

this.props.history.push(`/home/message/detail/${id}/${title}`);
this.props.history.replace(`/home/message/detail/${id}/${title}`);
this.props.history.goBack(`/home/message/detail/${id}/${title}`);
this.props.history.goForward(`/home/message/detail/${id}/${title}`);
this.props.history.go(`/home/message/detail/${id}/${title}`);

```

### 10.11 withRouter的使用

如果不是路由组件，但是又想用路由组件身上的API

```javascript
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class Header extends Component {
    render() {
        console.log('Header组件收到的props', this.props);
        return (
            <div>
               
            </div>
        );
    }
    back = () => {
        this.props.history.goBack();
    }
    forward = () => {
        this.props.history.goForward();
    }
}

export default withRouter(Header);
```

### 10.12 BrowserRouter与HashRouter的区别

1、底层原理不一样：

​	BrowserRouter使用的是H5的history API，不兼容IE9以下版本。

​	HashRouter使用的是URL的哈希值。

2、url表现形式不一样

​	BrowserRouter的路径没有#，例如：localhost：3000/demo/test

​	HashRouter的路径包含#，例如：localhost：3000/#/demo/test

3、刷新后对路由state参数影响

​	BrowserRouter没有任何影响，因为state保存在history对象中。

​	HashRouter刷新后会导致路由state参数的丢失。

4、备注：HashRouter可以用于解决一些路径错误相关的问题

## 十一、UI组件库的使用

### 11.1 流行的开源React UI组件库

material-ui（国外）

​	官网：https://material-ui.com/zh/

​	GitHub：https://github.com/mui-org

ant-design（国内蚂蚁金服）

​	官网：https://ant.design/index-cn

​	GitHub：https://github.com/ant-design/ant-design

### 11.2 Ant-design的使用

安装：npm install antd --save

```javascript
import { Button, DatePicker } from 'antd';
import { WechatOutlined, SearchOutlined  } from '@ant-design/icons'

<div className="container">
    <button>app</button>
    <Button type="primary">Primary Button</Button>
    <Button type="primary" icon={<SearchOutlined />}>
    Search
    </Button>
    <WechatOutlined style={{ fontSize: '16px', color: '#08c' }}/>
    <DatePicker onChange={this.onChange} />
    <RangePicker />
</div>
```

### 11.3 高级配置

引入 react-app-rewired 并修改 package.json 里的启动配置。由于新的 [react-app-rewired@2.x](https://github.com/timarney/react-app-rewired#alternatives) 版本的关系，你还需要安装 [customize-cra](https://github.com/arackaf/customize-cra)。

```javascript
yarn add react-app-rewired customize-cra
```

```
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```



然后在项目根目录创建一个 `config-overrides.js` 用于修改默认配置。

```
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

#### 使用 babel-plugin-import

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一个用于按需加载组件代码和样式的 babel 插件（[原理](https://3x.ant.design/docs/react/getting-started-cn#按需加载)），现在我们尝试安装它并修改 `config-overrides.js` 文件。

```
yarn add babel-plugin-import
```

```
+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'antd',
+     libraryDirectory: 'es',
+     style: 'css',
+   }),
+ );
```

然后移除前面在 `src/App.css` 里全量添加的 `@import '~antd/dist/antd.css';` 样式代码，并且按下面的格式引入模块。

```javascript
  // src/App.js
  import React, { Component } from 'react';
- import Button from 'antd/es/button';
+ import { Button } from 'antd';
  import './App.css';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <Button type="primary">Button</Button>
        </div>
      );
    }
  }

  export default App;
```

### 11.4 自定义主题

不用在组件里亲自引入样式了，即：import  'antd/dist/antd.css'

按照 [配置主题](https://3x.ant.design/docs/react/customize-theme-cn) 的要求，自定义主题需要用到 less 变量覆盖功能。我们可以引入 `customize-cra` 中提供的 less 相关的函数 [addLessLoader](https://github.com/arackaf/customize-cra#addlessloaderloaderoptions) 来帮助加载 less 样式，同时修改 `config-overrides.js` 文件如下。

```javascript
yarn add less less-loader
```

```javascript
- const { override, fixBabelImports } = require('customize-cra');
+ const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
-   style: 'css',
+   style: true,
  }),
+ addLessLoader({
    lessOptions: {
        +   javascriptEnabled: true,// 允许js修改ant底层的less文件
		+   modifyVars: { '@primary-color': '#1DA57A' },// 修改某个变量
    }
+ }),
);
```

这里利用了 [less-loader](https://github.com/webpack/less-loader#less-options) 的 `modifyVars` 来进行主题配置，变量和其他配置方式可以参考 [配置主题](https://3x.ant.design/docs/react/customize-theme-cn) 文档。

修改后重启 `yarn start`，如果看到一个绿色的按钮就说明配置成功了。

> 你也可以使用 [craco](https://github.com/sharegate/craco) 和 [craco-antd](https://github.com/FormAPI/craco-antd) 来实现和 customize-cra 一样的修改 create-react-app 配置的功能。

## 十二、redux

### 12.1 redux理解

学习文档：https://www.reduxjs.cn/

redux是什么？

​	1、redux是一个专门用于做状态管理的js库（不是react插件库）。

​	2、它可以用在react、angular、vue等项目中，但基本与react配合使用。

​	3、作用：集中式管理react应用中多个组件共享的状态。

![image-20210704154249974](C:\Users\qc\AppData\Roaming\Typora\typora-user-images\image-20210704154249974.png)

### 12.2 redux的三个核心概念

#### action

第一种（同步）：动作的对象，包含2个属性：

​	type：表示属性，值为字符串，唯一，必要属性

​	data：数据属性，值类型任意，可选属性

例子：{type: 'ADD_STUDENT', data: {'name': 'tom', age: 18}}

第二种（异步）：函数

组件里面发送异步action：

```jsx
// index.jsx
store.dispatch(createIncrementAsyncAction(1, 3000))
```

```javascript
// count_action_creators.js
// 暴露异步action，所谓异步action，其实就是action的值为函数，异步action中一般都会调用同步action
export const createIncrementAsyncAction = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data));
        }, time);
    }
}
```

修改store.js，允许store发送异步action

安装redux-thunk：npm install redux-thunk

```javascript
// store.js

// 用于创建store
import {createStore, applyMiddleware} from 'redux';
// 引入为Count组件服务的reducer
import countReducer from './count_reducer';
// 引入redux-thunk，用于支持异步action，执行异步action中的回调
import thunk from 'redux-thunk';

// 暴露store
export default createStore(countReducer, applyMiddleware(thunk))
```

备注：异步action不是必须要写的，完全可以等待异步任务有了结果再去分发同步action。

#### reducer

用于初始化状态，加工状态；

加工时，根据旧的state和action，产生新的state的纯函数；

#### store

将action、state、reducer联系在一起的对象

如何得到此对象？

​	1、import { createStore } from 'redux';

​	2、import reducer from './reducers';

​	3、const store = createStore(reducer);

此对象的功能：

​	1、getState()：得到state

​	2、dispatch(action)：分发action，触发reducer调用，产生新的state

​	3、subscribe(listener)：注册监听，当产生新的state时，自动调用

### 12.3 redux的简单使用

安装：npm install redux

redux简单使用：

```javascript
// store.js
/*
    改文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 用于创建store
import {createStore} from 'redux';
// 引入为Count组件服务的reducer
import countReducer from './count_reducer';

// 暴露store
export default createStore(countReducer)
```

```javascript
// count_reducer.js
/*
    1、创建一个为Count组件服务的reducer，reducer的本质就是一个函数
    2、reducer函数会接收到两个参数，分别为：之前的状态(preState)、动作对象(action)
    3、reducer第一次被调用时，是store自动触发的，传递的preState是undefined
*/
const initState = 0;
function countReducer(preState = initState, action) {
    let {type, data} = action;
    switch (type) {
        case 'increment':
            console.log(data, type);
            return preState + data;
        case 'decrement':
            return preState - data;
        default: 
            return preState;
    }
       
}
export default countReducer
```

在组件中使用redux：

```JavaScript
// index.jsx
import React, { Component } from 'react';
import store from '../../redux/store'

class Count extends Component {
    componentDidMount() {
    	// 通过reducer改变数据之后，页面不会改变，有两种方法使页面更新：
    	// 第一种
        // 检测redux中数据的变化，只要数据变化，就调用render
        store.subscribe(() => {
            // redux中的任一数据发生改变就会执行该回调
            console.log('回调');
            this.setState({});
        })
    }
    render() { 
        return (
            <div>
                <h1>当前求和为：{store.getState()}</h1>
                <select ref={ c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button onClick={this.incrementStore}>+</button>
                <button onClick={this.decrementStore}>-</button>
                <button onClick={this.incrementIfOddStore}>和为奇数加</button>
                <button onClick={this.incrementAsyncStore}>异步加</button>
            </div>
        );
    }
    // 加
    incrementStore = () => {
        const { value } = this.selectNumber;
        store.dispatch({
            type: 'increment',
            data: value*1
        })
    }
    // 减
    decrementStore = () => {
        const { value } = this.selectNumber;
        store.dispatch({
            type: 'decrement',
            data: value*1
        })
    }
    // 奇数再加
    incrementIfOddStore = () => {
        const { value } = this.selectNumber;
        const count = store.getState();
        if (count % 2 !== 0) {
            store.dispatch({
                type: 'increment',
                data: value*1
            })
        }
    }
    // 异步加
    incrementAsyncStore = () => {
        const { value } = this.selectNumber;
        const count = store.getState();
        setTimeout(() => {
            store.dispatch({
                type: 'increment',
                data: value*1
            })
        }, 2000);
    }
}

export default Count;

```

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import store from './redux/store'

// 第二种：
// 通过subscribe订阅store中的数据
store.subcribe(() => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
})
```

### 12.4 redux的完整版

新增文件：

1、count_action_creators.js专门用于创建action对象

2、constant.js放置由于编码疏忽写错action中的type

### 12.5 react-redux

![react-redux模型图](D:\react\资料\react全家桶资料\02_原理图\react-redux模型图.png)

安装：npm install react-redux  

UI组件：不使用任何redux的API，只负责页面的呈现和交互等。

容器组件：负责和redux通信，将结果交给UI组件。

如何创建一个容器组件——靠react-redux的connect函数

​	connect(mapStateToprops, mapDispatchToProps)(UI组件)

​		—mapStateToProps：映射状态，返回值是一个对象

​		—mapDispatchToProps：映射操作状态的方法，返回值是一个对象

容器组件中的store是靠props传进去的，而不是在容器组件中直接 引入的。

mapDispatchToProps也可以是一个对象	

#### 基本使用

创建容器组件：

```javascript
// 引入Count的UI组件
import CountUI from '../../components/Count';
// 引入connect用于连接UI组件与redux
import {connect} from 'react-redux'
// 引入action
import { createIncrementAction, createDecrementAction} from '../../redux/count_action_creators'
import { number } from 'prop-types';

// 创建Count的容器组件
// connect接收两个参数，必须是函数，第一个参数为redux中所保存的状态，第二个参数为操作状态的方法
// mapStateToProps函数的返回值作为状态传递给了UI组件，返回值必须为一个对象，对象的key作为传递给UI组件props的key，value就作为传递给UI组件props的value---状态
function mapStateToProps(state) {
    return {
        count: state
    }
}
// mapDispatchToProps函数的返回值作为状态传递给了UI组件，返回值必须为一个对象，对象的key作为传递给UI组件props的key，value就作为传递给UI组件props的value---操作状态的方法
function mapDispatchToProps(dispatch) {
    return {
        add: (number) => {
            // dispatch({type: 'increment', data: number})
            dispatch(createIncrementAction(number))
        },
        jian: number => dispatch(createDecrementAction(number))
    }
}
const CountContainer = connect(mapStateToProps, mapDispatchToProps)(CountUI);

export default CountContainer
```

UI组件通过props接收state的值和action

#### 优化

##### mapDispatchToProps的简写方式

```javascript
// 引入Count的UI组件
import CountUI from '../../components/Count';
// 引入connect用于连接UI组件与redux
import {connect} from 'react-redux'
// 引入action
import { createIncrementAction, createDecrementAction} from '../../redux/count_action_creators'

function mapStateToProps(state) {
    return {
        count: state
    }
}
// mapDispatchToProps的简写方式
const CountContainer = connect(mapStateToProps, {
    add: createIncrementAction,
    jian: createDecrementAction
})(CountUI);

export default CountContainer
```

##### 使用Provider组件

store可以不用给每个容器组件都传一遍，可以在index.js文件中使用Provide传给App 

```javascript
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```

##### 整合UI组件与容器组件

##### 使用react-redux后不用自己检测redux中状态的改变了，容器组件可以自动完成这个工作。

#### 创建多个reducer

### 12.6 高阶函数和纯函数

#### 纯函数

一类特别的函数，只要是同样的输入（实参），必定得到同样的输出（返回）。

必须遵守以下约束：

​	不得改写参数数据；

​	不会产生任何副作用，例如网络请求，输入和输出设备；

​	不能调用Date.now()或者Math.random()等不纯函数；

redux的reducer函数必须是一个纯函数

#### 高阶函数

理解：一类特别的函数

​	情况1：参数是函数

​	情况2：返回是函数

常见的高阶函数：

​	定时器设置函数；

​	数组的forEach()/map()/filter()/reduce()/find()bind()

​	promise

​	react-redux中的connect函数

#### 高阶组件

本质就是一个函数，接收一个组件（被包装组件），返回一个新的组件（包装组件），新组件内部渲染被包装组件，包装组件会向被包装组件传入特定属性

### 12.7 使用redux开发者工具

1、安装谷歌插件：redux_dev_tools

2、安装：npm install redux-devtools-extension

3、在store中引入redux-devtools-extension

```javascript
/*
    改文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 用于创建store
import {createStore, applyMiddleware, combineReducers} from 'redux';
// 引入为Count组件服务的reducer
import countReducer from './reducers/count';
import personReducer from './reducers/person';
// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

// 汇总所有的reducer
const allReducer = combineReducers({
    count: countReducer,
    person: personReducer
})

// 暴露store
export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))
```

## 十三、打包运行react项目

运行npm run build打包，运行serve -s build

安装serve：npm install serve -g

运行serve，会开启一台服务器，会找到当前文件夹下的index.html

































































