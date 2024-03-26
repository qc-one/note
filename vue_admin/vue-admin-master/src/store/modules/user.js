export default {
	state:{
		user: {},
		token: false,
		auth: [],
		menus: []
	},
	getters:{
		
	},
	mutations:{
		// 初始化用户信息
		initUser(state){
			let user = window.sessionStorage.getItem('user')
			let token = window.sessionStorage.getItem('token')
			let auth = window.sessionStorage.getItem('auth')
			let menu = window.sessionStorage.getItem('menu')
			if(user){
				state.user = JSON.parse(user)
				state.token = token
				state.auth = JSON.parse(auth)
				state.menus = JSON.parse(menu)
			}
		},
		//更新用户信息
		editUser(state,user){
			state.user = user
		},
		// 登录
		login(state,user){
			// 保存登录状态
			state.user = user.user
			state.token = user.token
			state.auth = user.auth
			state.menus = user.menu
			// 存储到本地存储
			window.sessionStorage.setItem('user',JSON.stringify(state.user))
			window.sessionStorage.setItem('token',state.token)
			window.sessionStorage.setItem('auth',JSON.stringify(state.auth))
			window.sessionStorage.setItem('menu',JSON.stringify(state.menus))
		},
		// 退出登录
		logout(state){
			// 清除状态
			state.user = {}
			state.token = false
			// 清除本地存储
			window.sessionStorage.clear()
			window.localStorage.clear()
		}
	},
	actions:{
		
	}
}