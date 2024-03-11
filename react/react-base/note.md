(1)状态提升
就是如果有多个组件共享一个数据，把这个数据放到共同的父级组件中来管理
(2)创建第一个组件

    react开发需要引入多个依赖文件：react.js、react-dom.js，分别又有开发版本和生成版本

    在这里一开始，我们先学习es5的组件写法，React.createClass，需要引入的是15+

    react.js中有React对象，帮助我们创建组件等功能

    react-dom.js中有ReactDOM对象，渲染组件的虚拟dom为真实dom的爆发功能

    在编写react代码的时候会大量的使用到jsx代码，但是需要编译：

    	1. 浏览器端编译，通过引入browser、babel等对引入的script内的代码做编译
    	2. 利用webpack等开发环境进行编译，将编译好的文件引入到应用中
        //创建组件
    var Hello = React.createClass({
        render:function () {
            //render函数和Vue组件里的render完全一样，在vue组件中可以不用编写render函数，这个时候可以使用template模板来编写组件的虚拟dom结构，然后vue组件会自动将模板compile成虚拟dom结构放入到render中执行，但是react需要编写render函数

            return (
                //jsx语法
                <div>asdasd</div>
            )

        }
    })
    //利用ReactDOM对象的render方法将组件渲染到某个节点里
    ReactDOM.render(<Hello/>,document.getElementById("app"))
    组件是通过React.createClass创建的（ES5），在es6中直接通过class关键字来创建

    组件其实就是一个构造器,每次使用组件都相当于在实例化组件

    react的组件必须使用render函数来创建组件的虚拟dom结构

    组件需要使用ReactDOM.render方法将其挂载在某一个节点上

    组件的首字母必须大写

(3)JSX 语法糖

    JSX是一种语法，全称：javascript xml

    JSX语法不是必须使用的，但是因为使用了JSX语法之后会降低我们的开发难度，故而这样的语法又被成为语法糖

    在不使用JSX的时候，需要使用React.createElement来创建组件的dom结构，但是这样的写法虽然不需要编译，但是维护和开发的难度很高，且可读性很差

    var world = React.createElement('h1',{className:'abc',id:'haha'},[
        React.createElement('span',null,'Hello'),
        React.createElement('mark',null,'React')
    ])

    //利用ReactDOM对象的render方法将组件渲染到某个节点里
    ReactDOM.render(world,document.getElementById("app1"))

    及时使用了JSX语法了之后，也是需要将其编译成原生的createElement的

    JSX就是在js中使用的xml，但是，这里的xml不是真正的xml，只能借鉴了一些xml的语法，例如：

    最外层必须有根节点、标签必须闭合

    jsx借鉴xml的语法而不是html的语法原因：xml要比html严谨，编译更方便

(4)组件 dom 添加样式
在 react 里表达式的符号是 "{ }",作用和 vue 的表达式作用是一样的
想给虚拟 dom 添加行内样式，需要使用表达式传入样式对象的方式来实现：
<p style = { {color:'red',fontSize:2+'em'} }>Hello world</p>
行内样式需要写入一个样式对象，而这个样式对象的位置可以放在很多地方，例如 React.createClass 的配置项中、render 函数里、组件原型上、外链 js 文件中
React 推荐我们使用行内样式，因为 react 觉得每一个组件都是一个独立的整体
其实我们大多数情况下还是大量的在为元素添加类名、id 以使用某些样式，但是需要注意的是，class 需要写成 className（因为毕竟是在写类 js 代码，会收到 js 规则的限制，而 class 是关键字）
<p className="bg-p" id="myp" style = { this.style }>Hello world</p>
(5)React Event
在 react 中，我们想要给组件的 dom 添加事件的话，也是 需要在行内添加的方式，事件名字需要写成小驼峰的方式，值利用表达式传入一个函数即可
注意，在没有渲染的时候，页面中没有真实 dom，所以是获取不到 dom 的
给虚拟 dom 结构中的节点添加样式。在行内添加,写成驼峰形式，值是一个函数名，需要用{}包裹
handleClick:function () {
alert(1)
},
render:function () {
return (
<div>
<button onClick = {this.handleClick} className="click-btn">click</button>
<button onDoubleClick = {this.handleClick} className="click-btn">click</button>
</div>
)
}
(6)组件嵌套
将一个组件渲染到某一个节点里的时候，会将这个节点里原有内容覆盖
组件嵌套的方式就是将子组件写入到父组件的模板中去，且 react 没有 Vue 中的内容分发机制（slot），所以我们在一个组件的模板中只能看到父子关系
var Hello = React.createClass({
render(){
return (
<h1>
Hello
<World></World>
</h1>
)
}
})
var World = React.createClass({
render(){
return (
<mark>
World-<Person/>
</mark>
)
}
})
//无状态组件
var Person =function(){
return (<mark>lilei</mark>)
}
ReactDOM.render(<Hello/>,app)

> 注意，react 中 jsx 里的注释要写成{/\* \*/}的方式

(7)React 中的数据承载-Props/State
React 也是基于数据驱动(声明式)的框架，组件中必然需要承载一些数据，在 react 中起到这个作用的是属性和状态（props & state）

1. 属性（props） 在组件外部传入，或者内部设置，组件内部通过 this.props 获得
2. 状态（state） 在组件内部设置或者更改，组件内部通过 this.state 获得

(8)属性(props)
属性一般是外部传入的，组件内部也可以通过一些方式来初始化的设置，属性不能被组件自己更改
属性是描述性质、特点的，组件自己不能随意更改

使组件拥有属性的方式： 1. 在装载（mount）组件的时候给组件传入
传入数据的时候，除了字符串类型，其他的都应该包上表达式，但是为了规整，所有的数据传递，最好都包上{}
var Gouzi = React.createClass({
render(){
console.log(this)
return (
<div>
<p>我的名字：{this.props.name}</p>
<p>我的性别：{this.props.sex}</p>
<p>我的年龄：{this.props.age}</p>  
 <p>我的父亲是：{this.props.father}</p>  
 </div>
)
}
})

    	let info = {
    	    sex:'male',
    	    father:'狗爸'
    	}

    	ReactDOM.render(<Gouzi {...info} name={"大狗子"} age={26}/>,app)

    2. 父组件给子组件传入
    	父组件在嵌套子组件的时候为子组件传入，传入的方式和上面的方式一样
    	//父组件的render函数
    	render(){
    	    return (
    	        <div>
    	            <p>父组件：</p>
    	            <hr/>
    	            <Son name={'大狗子'}/>
    	            <Son name={'二狗子'}/>
    	        </div>
    	    )
    	}
    3. 子组件自己设置
    	子组件可以通过getDefaultProps来设置默认的属性,getDefaultProps的值是函数，这个函数会返回一个对象，我们在这里对象里为组件设置默认属性,这种方式设置的属性优先级低，会被外部传入的属性值所覆盖
    	getDefaultProps:function () {
    	    console.log('getDefaultProps')
    	    return {
    	        name:'狗爸',
    	        sonname:'二狗子'
    	    }
    	},
    	//render
    	<p>我是{this.props.sonname}的父亲-{this.props.name}</p>
    	根据属性或状态，我们可以在render中的表达式里做一些逻辑判断，可以使用||、三元表达式、自执行函数等等
    	getName(){
    	    return this.props.name || '野狗子'
    	},
    	render:function () {
    	    let {name} = this.props
    	    return (
    	    <div>
    	        <p>我是子组件-{this.props.name || '野狗子'}</p>
    	        <p>我是子组件-{this.props.name?this.props.name:'野狗子'}</p>
    	        <p>我是子组件-{this.getName()}</p>
    	        <p>我是子组件-{(function (obj) {
    	            return obj.props.name || '野狗子'
    	        })(this)}</p>
    	    </div>
    	    )
    	}

(9)状态(state)
状态就是组件描述某种显示情况的数据，由组件自己设置和更改，也就是说由组件自己维护，使用状态的目的就是为了在不同的状态下使组件的显示不同(自己管理)

在组件中只能通过 getInitialState 的钩子函数来给组件挂载初始状态,在组件内部通过 this.state 获取

this.props 和 this.state 是纯 js 对象,在 vue 中，$data属性是利用Object.defineProperty处理过的，更改$data 的数据的时候会触发数据的 getter 和 setter，但是 react 中没有做这样的处理，如果直接更改的话，react 是无法得知的，所以，需要使用特殊的更改状态的方法：

setState(params)

在 setState 中传入一个对象，就会将组件的状态中键值对的部分更改，还可以传入一个函数，这个回调函数必须返回像上面方式一样的一个对象，函数可以接收 prevState 和 props
//1.
let doing = this.state.doing=='学习'+props.knowledge?'玩游戏':'学习'+props.knowledge
this.setState({doing})

//2.
this.setState((prevState,props)=>{
return {
doing:prevState.doing=='学习'+props.knowledge?'玩游戏':'学习'+props.knowledge
}
})

(10)React 中的事件对象
react 中对于事件进行了处理，解决了一些兼容性问题，react 事件对象上面挂载着 e.nativeEvent，这个就是原生的事件对象
react 对事件对象做了优化，如果不取值的话，值都是 null

(11)React 中组件通信方式
父组件与子组件通信

1. 父组件将自己的状态传递给子组件，子组件当做属性来接收，当父组件更改自己状态的时候，子组件接收到的属性就会发生改变
2. 父组件利用 ref 对子组件做标记，通过调用子组件的方法以更改子组件的状态,也可以调用子组件的方法..

子组件与父组件通信

1. 父组件将自己的某个方法传递给子组件，在方法里可以做任意操作，比如可以更改状态，子组件通过 this.props 接收到父组件的方法后调用。

兄弟组件通信
在 react 没有类似 vue 中的事件总线来解决这个问题，我们只能借助它们共同的父级组件来实现，将非父子关系装换成多维度的父子关系
复杂的非父子组件通信在 react 中很难处理，多组件间的数据共享也不好处理，所以我们会使用 flux、redux 来实现这样的功能，解决这个问题

(12)react 中循环遍历元素,使用 map
<div className="panel-heading">
{
this.props.citys.map(item => {
return <button className="btn btn-default" key = {item.id}>{item.title}</button>
})
}
</div>
我们在 react 中循环列表数据的时候，需要对循环出来的虚拟 jsx 节点传入上 key 这个数据，Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。

(13)组合
在 vue 中有一个内容分发叫 slot，在 react 中也有实现，就是可以在使用组件的时候，在组件标签内部放入一些不固定的内容，在该组件的模板中，只有{this.props.children}来表示
//App
<Dialog
	close={this.ToggleDialogShow} isShow={isDialogShow}
	>
<ContentA/>
<ContentA/>
<ContentB/>
</Dialog>
//dialog
<div style={{display:isShow?'block':'none'}} className="dialog">
<Button handler={this.props.close} text="关闭"/>  
 {this.props.children}//这里就是 slot
</div>

(14)webpack
gulp: 基于流的前端自动化构建工具，基于流的任务式的工具
webpack 是一款模块化打包工具，webpack 是基于配置的，通过配置一些选项来让 webpack 执行打包任务。
webpack 在打包的时候，依靠依赖关系图，在打包的时候需要告知 webpack 两个概念：入口和出口
一般情况下，我们需要使用 webpack.config.js 进行配置
首先,全局安装 webpack:cnpm install webpack -g
将 webpack 看成一个项目,初始化项目:cnpm init -y,下载 webpack:cnpm install webpack -D
使用 webpack 运行,提示安装 webpack-cli,cnpm install webpack-cli -D
坑:
执行完 cnpm install webpack-cli -D,还会提示要安装 webpack-cli,https://blog.csdn.net/qq_26780317/article/details/88554399
这是因为在 webpack 3 中，webpack 本身和它的 CLI 以前都是在同一个包中，但在第 4 版中，他们已经将两者分开来更好地管理它们。尝试全局安装 webpack-cli,cnpm install webpack-cli -g ### entry
entry 配置项目打包的入口，值可以为单个的字符串执行某一个文件的地址，这个时候该文件就是入口文件，webpack 会根据入口文件里各模块间的关系形成依赖关系图，然后根据依赖关系图进行打包
entry:'./src/app.js',
output:{
path:path.join(**dirname,'build'),
filename:'app.js'
}
但是有的时候我们需要的是多入口，我们就写成数组的形式，数组里的每一个字符串地址指向的都是一个独立的入口，webpack 会将这些入口的依赖打包
在数组中的索引靠前，代码就先执行
entry:['./src/app.js','./src/vendor.js'],
output:{
path:path.join(**dirname,'build'),
filename:'[name].js'//不确定名字的时候，这里会打包成 main.js
}
刚才的两种 entry 配置都只会打包出一个 js 文件，但是在某一个应用中我们可能需要将 js 根据依赖关系打包成多个 js 文件，并且在多页面应用中，我们也确实不可能只使用一个 js 文件，那么我们就可以使用如下的配置：
entry:{
app:'./src/app.js',
vendor:'./src/vendor.js'
},
output:{
path:path.join(\__dirname,'build'),
filename:'[name]_[hash].js'
}
这样，因为 filename 里写成名字是[name],所以会根据 entry 的配置的键名来为打包出的 js 文件命名，hash 是每次打包的一个随机的 hash 值，可以用来做版本控制
可以在 package.json 文件中配置如下
"dev": "webpack --env dev",
"pro": "webpack --env production",
"start": "cnpm run dev" ### output
在这里我们配置打包输出的一些选项
filename 可以确定打包出来的文件的名字，在里面我们可以使用[name],[hash]这样的占位符
path 配置打包出去的文件的路径，需要是绝对路径 ### env
在命令行或者终端中执行 webpack --env hello 命令，就相当于在打包的时候传入一个参数为 hello
在 webpack.config.js 中可以暴露出一个函数，这个函数就可以接收到 env 参数，当然函数就可以根据 env 参数来有选择的返回某一个或多个配置对象
let devCofig = require('./webpack.dev.js')//开发配置
let productionCofig = require('./webpack.production.js')//生产配置
//输入 webpack --env params
module.exports = (env) => {
if(env === "production"){
return productionCofig
}else{
return devCofig
}
} ### plugins
在 webpack 编译用的是 loader，但是有一些 loader 无法完成的任务，交由插件（plugin）来完成，使用插件的时候需要在配置项中配置 plugins 选项，值是数组，可以放入多个插件的使用，而一般的插件都是一个构造器，我们只需在 plugins 数组中放入该插件的实例即可，在实例化插件的时候又可以传入 options，对插件的使用进行配置
html-webpack-plugin
这个插件可以选择是否依据模板来生成一个打包好的 html 文件，在里面可以配置、title、template、filename、minify 等选项，详情请查阅[文档](https://segmentfault.com/a/1190000007294861)
下载 cnpm i html-webpack-plugin -D
然后在 webpack.dev.js 中使用,
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
entry:{
},
output:{//配置出口文件
},
plugins: [//在这里配置使用插件，放入的是插件的实例
new HtmlWebpackPlugin()
]
}
插件的配置:
template
根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的 loader， 否则 webpack 不能正确解析。以 jade 为例。
filename
生成 html 文件的文件名。默认为 index.html
minify
minify 的作用是对 html 文件进行压缩，minify 的属性值是一个压缩选项或者 false 。默认值为 false, 不对生成的 html 文件进行压缩。来看看这个压缩选项。

    		html-webpack-plugin 内部集成了 html-minifier ,这个压缩选项同 html-minify 的压缩选项完全一样，
    		看一个简单的例子。
    		// webpack.dev.js
    		plugins: [
    		    new HtmlWebpackPlugin({
    		        ...
    		        minify: {
    		            removeAttributeQuotes: true // 移除属性的引号
    		        }
    		    })
    		]
    		<!-- 原html片段 -->
    		<div id="example" class="example">test minify</div>
    		<!-- 生成的html片段 -->
    		<div id=example class=example>test minify</div>

    在这个插件里，我们可以使用jade、hbs、ejs等模板引擎来编译成html，这里举例jade的配置：

    [文档](https://segmentfault.com/a/1190000000357534)
    ```
    npm i jade jade-loader --save-dev

    module:{
        rules:[
            {
                test:/\.jade$/,
                loader:'jade-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            // title:'webpack-config-demo',
            template:'./src/index.jade',
            filename:'index.html'
        })
    ]

    ### webpack-dev-server
    	webpack相辅相成的有一个server功能工具可以提供开发的热更新服务器
    	npm install webpack-dev-server -g
    	npm install webpack-dev-server -D
    		第一种启动方式： 直接执行webpack-dev-server,如果有需要配置的选项，在后面跟上参数即可。例如

    			webpack-dev-server --hot true

    		第二种启动方式：在webpack.config.js中配置devServer的选项，执行webpack-dev-server就ok
    			devServer:{
    			    port:9000,
    			    contentBase:'./build',
    			    historyApiFallback: true,
    			    open: true,
    			    proxy:{

    			    }
    			}
    #### LOADERS
    在webpack中专门有一些东西用来编译文件、处理文件，这些东西就叫loader，loader的使用就是在配置项中，设置module，在module中设置rule值为数组，在数组里放入多个匹配规则：

    module:{
        rules:[
            {test:/\.css$/,use:'css-loader'}
        ],
        //before
        loaders:[
            {test:/\.css$/,loader:'css-loader'}
        ],
    }

    test为此次匹配要匹配的文件正则规则，use代表要使用的loader

    使用url-loader可以将css中引入的图片（背景图）、js中生成的img图片处理一下，生成到打包目录里

    视图html-withimg-loader可以将html中img标签引入的img图片打包到打包目录

    file-loader

    {
        test:/\.(png|jpe?g|svg|gif)$/,
        // use:'url-loader?limit=1000&name=images/[hash:8].[name].[ext]'
        use:[
            {
                loader:'url-loader',
                options:{
                    limit:1000,
                    name:'/static/images/assets/[hash:8].[name].[ext]'
                }
            }
        ]
    },
    {
        test:/\.html$/,
        use:'html-withimg-loader'
    }

    处理css：

    cnpm i css-loader style-loader --save-dev


    配置：

    {
        test:/\.css$/,
        use:['style-loader','css-loader']
    }

    注意。webpack中loader的使用是从后往前的

    css-loader可以将引入到js中的css代码给抽离出来，style-loader可以将抽离出来的css代码放入到style标签中

    处理sass
    cnpm i node-sass sass-loader -D
    {
    test:/\.scss$/,
    use:['style-loader','css-loader','sass-loader']
    },

    将引入项目的css文件、scss文件抽成一个文件，引入到页面中

    cnpm i extract-text-webpack-plugin

    const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
    ///loader
    {
    	test:/\.css$/,
    	use:ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
    },
    {
    	test:/\.scss/,
    	use:ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","sass-loader"]
        })
    }
    ///plugin
    new ExtractTextWebpackPlugin({
    	filename:'app.css',
    	allChunks:true
    })

    因为ExtractTextWebpackPlugin对webpack4支持的不是很好，解决办法：
    cnpm i extract-text-webpack-plugin@next -D
    @next下载的就是最新的版本，可能是开发版本

    webpack-dev-server进行了一个优化，在跑起服务的时候，会将样式文件的编译结果保存在内存里，不会实时的输出打包结果，执行webpack -dev之后才会有打包文件

    css兼容优化处理：post-css   autoprefixer

    处理es6：

    需要的依赖：
    "babel": "^6.23.0",
    "babel-core": "^6.24.1",
    "babel-loader": "^7.0.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",

    rules：
    {
        test:/\.js$/,
        exclude: /node_modules/,
        loader:'babel-loader',
        query: {
            presets: ['es2015','react']
         }
    }

(15)ES6 中的 react
在 webpack 中使用 react,cnpm install react react-dom -S 1.创建组件：
在 react 中有两种组件,一种是有状态组件,另外一种是无状态组件
使用 class 来创建组件
class App extends React.Component {
} 2.默认状态的设置
在 es6 中不再使用 getInitialState 来设置默认状态，而是在 constructor 里面直接给 this.state 上挂载状态
class App extends Component {
constructor(props){
super(props)
this.state={
doing:'吃饭'
}
}
} 3. 默认属性的设置
在 es6 中，通过给类设置 defaultProps 属性来设置默认属性
App.defaultProps = {
name:'App 根组件'
} 4. 做属性传参验证
import PropTypes from 'prop-types';
App.propTypes = {
name:PropTypes.string
} 5.钩子函数有变化
getDefaultProps、getInitialState 没有了
多出了 constructor,而这个函数本身是类的构造器，在这里相当于 getDefaultProps、getInitialState 的结合

(16)%PUBLIC_URL%可以指向 public 里面的文件路径

(17)无状态组件
无状态组件就是没有状态的组件，当我们某些组件不需要状态的时候，只是被动的接收一些属性来使用的话，我们可以做成无状态组件，节省性能
无状态组件就是函数而不是类，接收 props 参数，返回虚拟 dom 结构

    let Lis = (props) => {
    	return(
    		<li className = "list-group-item">
    			{props.info}
    			<button type="button" className="close"><span>&times;</span></button>
    		</li>
    	)
    }
    class TodoContent extends Component {
    	constructor(props){
    		super(props)
    		this.state={
    			todos:store.getState().todos
    		}
    	}
    	render () {
    		let {todos} = this.state
    		return (
    			<ul className = "list-group">
    				{
    					todos.map((item) => {
    						return <Lis key={item.id} info={item.title}/>


    					})
    				}
    			</ul>
    		)
    	}
    }

(18)受控组件
将状态与 input 的 value 值绑定在一起,当 input 的 value 值改变的时候,让 state 也改变
class TodoInput extends Component {
constructor(props){
super(props)
this.state={
title:''
}
//在这里为方法去绑定 this，防止在使用的时候 this 丢失
this.changeTitle = this.changeTitle.bind(this)
this.keyUp = this.keyUp.bind(this)
}
keyUp(e){
if(e.keyCode === 13){
alert(123)
}
}
changeTitle(e){
this.setState({
title:e.target.value
})
}
render () {
return (
<div>
<input onInput={this.changeTitle} onKeyUp={this.keyUp} type = "text" className = "form-control"/>
{this.state.title}
</div>
)
}
}
export default TodoInput
(18)非受控组件
非受控组件，在使用 input 的 value 值的时候，通过 ref 来获取

(19)ref 的写法
ref 一共有两种使用方式
第一种 回调函数形式（官方推荐）
回调函数形式一共有三种触发方式
组件渲染后
组件卸载后
ref 改变后
第二种 字符串的形式 使用时用 this.refs.string

(20)在 react 脚手架中引用 public 中的文件直接 background-image: url(/logo192.png);

(21)css3 高斯模糊
filter: blur(10px);

(22)当我们进入到 mine 的时候判断是否有登陆信息，有的话去 user，没有的话去 login，在 mine 的 componentWillMount 里做的判断

    当我们登陆成功的时候，其实更改的store的state，这个时候mine接收的属性会变化，所以我们希望在mine的componentWillReceiveProps再判断一下是否登陆，如果登陆的话跳转到user

    不想在登陆组件里，等到登陆成功再去跳转，在user组件里，注销之后再去跳转

    而是希望让mine去统一的去监听变化之后进行跳转

    注意：
    	1. mine的componentWillReceiveProps会在路由变化的时候也触发，做出判断
    	2. 在这个钩子函数里新的props还没有挂载到this上，所以，需要使用参数里的props

(23)考虑到目前市场上使用 redux 的时候，有如下的两种情况
_ 如 vuex 一样，只将需要共享的全局状态交由 store 管理
_ 将所有的数据，只要是异步获取后要使用的，都放入到 store 中管理
第二种方式的优点： 让组件更轻量；数据能得到缓存，实现类似 keep-alive
推论：容器组件在设置 mapStateToProps 的时候，可以选择性的给 UI 组件传入需要的状态，而且，只有当该状态改变的时候，容器组件才会重新给 UI 组件传递新的属性

(24)react 中将带标签的字符串转义为 html 解析
<div dangerouslySetInnerHTML={{ __html: desc }}></div>
