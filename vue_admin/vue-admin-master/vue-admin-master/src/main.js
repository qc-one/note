import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from "./router.js"
import store from './store/index.js'
import utils from './common/utils/utils.js'
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

Vue.config.productionTip = false

/*
 * 权限指令
*/
const has = Vue.directive('auth',{
	// 绑定元素插入到DOM中时
	inserted: (el,binding,vnode) => {
		console.log('绑定元素',vnode.context.$route.meta)
	}
})

/*
 * 全局Filter
*/
Vue.filter('comToIndex', function (value) {
	return value
})

import {
	Message
} from 'element-ui'

let loading = null
let requestCount = 0
// 显示loading
function showLoading(){
	if(requestCount === 0){
		loading = Message({
		  message: '加载中...',
		  duration: 0
		});
	}
	requestCount++
}
// 隐藏loading
function hideLoading(){
	if(requestCount > 0){
		requestCount--
	}
	if(loading && requestCount === 0){
		loading.close()
	}
}

// 添加请求拦截器
axios.interceptors.request.use((config)=>{
	// 添加header头的token
	let token = window.sessionStorage.getItem('token')
	if(config.token != false){
		config.headers['token'] = token
		config['data'] = config.data || {}
		if(config.method == 'get'){
			config.url += `&signKey=${process.env.VUE_APP_KEY}`
			config.headers['sign'] = utils.createSignForGet(config.url)
		}
		if(config.method == 'post'){
			config.data['signKey'] = process.env.VUE_APP_KEY
			config.headers['sign'] = utils.createSignForPost(config.data)
		}
	}
	// 显示loading
	if(config.loading == true){
		showLoading()
	}
	// 在发送请求之前做些什么
	return config;
}, (error)=> {
	// 隐藏loading
	hideLoading()
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response)=>{
	// 隐藏loading
	hideLoading()
	// 对响应数据做点什么
	return response;
},(err)=> {
	// 全局异常提示
	if(err.response && err.response.data && err.response.data.errorCode){
		Message.error(err.response.data.msg)
		if(err.response.data.msg=='token已过期'){
			setTimeout(()=>{
				// 清除状态和存储
				store.commit('logout')
				// 返回到登录页
				router.push({name:"login"})
			},2000)
		}
	}
	// 隐藏loading
	hideLoading()
	// 对响应错误做点什么
	return Promise.reject(err);
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
