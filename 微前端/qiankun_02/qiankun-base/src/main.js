import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';

import '@/styles/index.scss'
import './icons' // 自动渲染svg

import {
    initState
} from './qiankun';
initState();

import {
    makeAllRouter
} from './router/makeAllRouter'
makeAllRouter()

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
