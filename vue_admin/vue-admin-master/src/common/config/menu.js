
 /**
  * 规则：
  * 一、将所有的菜单都看作是页面，通过改变isShow控制是否显示在菜单栏
  * 二、后台首页默认自带，一般不做变更，layout下的页面都写到后台首页下的children里
  * 三、keepAlive必填
  * 四、当只有根菜单，且想为其添加隐藏的子菜单时，要填写hidePages字段，且子菜单只能有一级
  * **/
 
 let menus = [
	 {
		 title: '后台首页',
		 component: 'index/index',
		 name: 'index',
		 children: [
			 //layout内菜单都在这里写
			 {
				 icon: 'el-icon-monitor',
				 title: '常用组件',
				 isShow: true,//是否在菜单栏显示
				 auth: 'changyongzujian',
				 children: [
					 {
						 icon: 'el-icon-document',
						 title: '富文本',
						 isShow: true,//是否在菜单栏显示
						 keepAlive: true, //是否缓存当前组件
						 auth: 'fuwenbeng',
						 component: 'assembly/richtext/index'
					 },
					 {
						 icon: 'el-icon-news',
						 title: '滚动数字',
						 isShow: true,//是否在菜单栏显示
						 keepAlive: true, //是否缓存当前组件
						 auth: 'gundongshuzi',
						 component: 'assembly/number/index'
					 }
				 ]
			 },
			 {
				 icon: 'el-icon-menu',
				 title: '菜单管理',
				 keepAlive: true, //是否缓存当前组件
				 isShow: true,//是否在菜单栏显示
				 closeInquiry: true,//是否开启页签关闭询问
				 auth: 'caidanguanli',
				 component: 'menu/index'
			 },
			 {
				 icon: 'el-icon-document',
				 title: '权限管理',
				 keepAlive: true, //是否缓存当前组件
				 isShow: true,//是否在菜单栏显示
				 closeInquiry: true,//是否开启页签关闭询问
				 auth: 'quanxianguanli',
				 component: 'auth/index'
			 },
			 {
				 icon: 'el-icon-s-custom',
				 title: '角色管理',
				 keepAlive: true, //是否缓存当前组件
				 isShow: true,//是否在菜单栏显示
				 closeInquiry: true,//是否开启页签关闭询问
				 auth: 'role',
				 component: 'role/index'
			 },
			 {
				 icon: 'el-icon-user-solid',
				 title: '用户管理',
				 keepAlive: true, //是否缓存当前组件
				 isShow: true,//是否在菜单栏显示
				 closeInquiry: true,//是否开启页签关闭询问
				 auth: 'user',
				 component: 'user/index'
			 }
		 ]
	 },
	 //layout外页面都写在这里
	 {
		 title: '登录页',
		 component: 'login/index'
	 }
 ]
 
//递归
const layout = (item) => {
	item.forEach((v,i)=>{
		if(v.hasOwnProperty('component')){
			v['name'] = v.component.replace(/\//g,'_')
		}else{
			v['name'] = Math.ceil(Math.random()*100).toString()
		}
		if(v.children && v.children.length > 0){
			layout(v.children)
		}
	})
}

//规范化过滤
const getNormalize = () => {
	if(menus[0].children && menus[0].children.length > 0){
		layout(menus[0].children)
	}
	return menus
}

export default getNormalize()