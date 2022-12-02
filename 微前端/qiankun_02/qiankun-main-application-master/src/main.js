import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import router from './router'
import store from './store'

import './icons' // 自动渲染svg
import './permission' // permission control
import {
    initState
} from '@/initQiankunState/index.js'
import {
    makeAllRouter
} from '@/makeAllComponentRouter/index.js'
console.log('workspace-start')
// 初始化qiankun
initState()
makeAllRouter()
console.log(123);

Vue.use(ElementUI)

Vue.config.productionTip = false

window.App = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
