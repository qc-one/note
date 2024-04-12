/**
 * 规则：
 * 一、例如：index/index，shop/index以index结尾的，path和name默认去除index
 * 二、例如：shop/list，默认生成name为shop_list（如果结尾为index，例如shop/index则是shop）
 * 三、填写后不会自动生成 
 * **/

import menus from './menu.js'

let routes = [
	{
		path: '/',
		name: 'layout',
		redirect: {name:'index'},
		component: () => import('../../views/layout.vue'),
		children: [{
			meta: {
				keepAlive: true, //是否缓存当前组件
			},
			path: '/index',
			name: 'index',
			component: () => import('../../views/index/index.vue')
		}]
	},
	{
		path:'*',
		redirect:{name:'index'}
	}
]

//递归
let pushLayout = function(item){
	item.forEach(v=>{
		if(v.children && v.children.length > 0){
			//有子路由
			pushLayout(v.children)
		}else{
			//判断是否是只有一个根节点，并设置了隐藏页面
			if(v.hidePages && v.hidePages.length > 0){
				let children = []
				v.hidePages.forEach((val,i)=>{
					children.push({
						meta: {
							title: val.title,
							keepAlive: val.keepAlive, //是否缓存当前组件
							closeInquiry: val.closeInquiry,//是否开启页签关闭询问
							auth: val.auth
						},
						path: '/' + getValue(val.component),
						name: val.component.replace(/\//g,'_'),
						component: () => import(`../../views/${val.component}.vue`)
					})
					if(i == v.hidePages.length - 1){
						routes[0].children.push({
							meta: {
								title: v.title,
								keepAlive: v.keepAlive, //是否缓存当前组件
								layout: true,//标识是layout层
								closeInquiry: v.closeInquiry,//是否开启页签关闭询问
								auth: v.auth
							},
							path: '/' + getValue(v.component),
							name: v.name || '',
							component: () => import(`../../views/${v.component}.vue`),
							children: children
						})
					}
				})
			}else{
				//只有一个根节点，没有子页面
				routes[0].children.push({
					meta: {
						title: v.title,
						keepAlive: v.keepAlive, //是否缓存当前组件
						layout: true,//标识是layout层
						closeInquiry: v.closeInquiry,//是否开启页签关闭询问
						auth: v.auth
					},
					path: '/' + getValue(v.component),
					name: v.name || '',
					component: () => import(`../../views/${v.component}.vue`)
				})
			}
		}
	})
}

//根据菜单生成路由
let menuToToutes = function(){
	//layout层路由
	pushLayout(menus[0].children)
	//非layout层路由
	menus.forEach((v,i)=>{
		if(i > 0){
			routes.push({
				path: '/' + getValue(v.component),
				name: v.name || '',
				component: () => import(`../../views/${v.component}.vue`)
			})
		}
	})
	return routes
}

// 去除index
function getValue(str) {
	// 获取最后一个/的索引
	let index = str.lastIndexOf('/')
	// 获取最后一个/后面的值
	let val = str.substring(index+1,str.length)
	// 判断是不是index结尾
	if (val === 'index') {
		return str.substring(index,-1)
	}
	return str
}

export default menuToToutes()