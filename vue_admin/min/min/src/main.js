import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui组件库
import ElementUI from 'element-ui'
// 引入elementui样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局样式
import './style/index.scss'
// 引入图标

Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
