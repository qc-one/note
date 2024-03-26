import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

//解决菜单栏重复点击报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location){
	return originalPush.call(this,location).catch(err => err)
}

let routes = [
	{
		path: '/',
		name: 'layout',
		redirect: {name:'index'},
		component: () => import('./views/layout.vue'),
		children: [{
			meta: {
				keepAlive: true, //是否缓存当前组件
			},
			path: '/index',
			name: 'index',
			component: () => import('./views/index/index.vue')
		}]
	},
	//非layout层页面都在下面添加且不能添加meta属性
	{
		path:'*',
		redirect:{name:'index'}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('./views/login/index.vue')
	}
]

//判断是否有路由缓存
let rout = window.sessionStorage.getItem('router');
if(rout){
	JSON.parse(rout).forEach(v=>{
		routes[0].children.push({
			...v,
			component: v.component ? () => import(`./views/${v.component}.vue`) : null
		})
	})
}

let router = new Router({ routes })

// 全局前置守卫
router.beforeEach((to, from, next) => {
	// 获取token
	let token = window.sessionStorage.getItem('token')
	if(token){
		// 防止重复登录
		if(to.path === '/login'){
			Vue.prototype.$message.error('请不要重复登录');
			return next({name:from.name ? from.name : 'index'})
		}
		next()
	}else{
		// 跳过登录页验证
		if(to.path === '/login'){
			return next();
		}
		Vue.prototype.$message.error('请先登录');
		next({ path:'/login' })
	}
})

export default router