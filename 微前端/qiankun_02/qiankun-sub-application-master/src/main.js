import './public-path.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
import '@/styles/index.scss' // global css
import store from './store'
import './icons' // 自动渲染svg
Vue.config.productionTip = false

import routes from './router'
import actions from './actions.js'

let appInstance = null
let router = null

function render(props = {}) {
    const {
        container,
        routePath,
        query
    } = props
    // routePath用于qiankun手动加载用的vue-router的abstract模式
    if (routePath) {
        window.routePathFromQianKun = routePath
    }
    if (query) {
        window.queryFromQianKun = query
    }
    // 如果有routePath从qiankun注入，说明当前是需要手动加载，路由模式为abstract
    const mode = window.__POWERED_BY_QIANKUN__ ? (routePath ? 'abstract' : 'history') : 'hash'
    console.log(mode, 'mode');
    router = new VueRouter({
        scrollBehavior: () => ({
            y: 0
        }),
        mode,
        routes: routes
    })
    // 如果有container从qiankun注入，要把dom绑定到qiankun提供的dom内。因为qiankun体系中dom是隔离状态
    appInstance = new Vue({
        el: container ? container.querySelector('#app') : '#app',
        router,
        store,
        render: (h) => h(App)
    })
}

// window.__POWERED_BY_QIANKUN__可用于判断当前项目是否由qiankun驱动
if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

export async function bootstrap() {
    console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
    // 子应用加载完成后注册通信模块获取workspace下发的数据
    actions.setActions(props)
    console.log('[vue] props from main framework', props)
    render(props)
}

export async function unmount() {
    appInstance.$notify && appInstance.$notify.closeAll()
    console.log('[vue] unmount')
}

export async function update(props) {
    console.log('sub app updated')
}
