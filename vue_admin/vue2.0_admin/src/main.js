import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'
// 引入全局样式
import './style/index.less'

import store from './store'
import './mock'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
    render: h => h(App),
    router,
    store,
    created() {
        store.commit("tab/addMenu", this.$router)
    }
}).$mount('#app')