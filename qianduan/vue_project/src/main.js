import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import EventBus from './modules/bus'

import 'ant-design-vue/dist/antd.css'

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.use(Antd);

Vue.prototype.$EventBus = EventBus

new Vue({
    render: h => h(App),
}).$mount('#app')