import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
    getToken
} from '@/utils/auth' // get token from cookie
import Vuex from '@/store/index'
import {
    match
} from 'path-to-regexp'
NProgress.configure({
    showSpinner: false
}) // NProgress Configuration

const rawAppendChild = HTMLHeadElement.prototype.appendChild
const rawAddEventListener = window.addEventListener
let rawAppendChildSubCopy = null
let rawAddEventListenerSubCopy = null
const whiteList = ['/login'] // no redirect whitelist
// 用来处理qiankun 从子应用跳转到主应用 无法渲染主应用css和js的bug 结束
router.beforeEach((to, from, next) => {
    // start progress bar
    NProgress.start()

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        console.log('有token')
        if (to.path === '/login') {
            console.log('path是login')
            // if is logged in, redirect to the home page
            next({
                path: '/'
            })
            NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
        } else {
            console.log('开始鉴权qiankun路由')
            // 获取全量动态路由
            console.log(Vuex.state.permission, 'Vuex.state.permissionVuex.state.permission');
            const allRouterPathArr = Vuex.state.permission.addPaths || []
            console.log(allRouterPathArr, 'allRouterPathArrallRouterPathArr');
            const isChildRoute = path => allRouterPathArr.some(item => {
                const fn = match(item, {
                    decode: decodeURIComponent
                })
                return !!fn(path)
            })
            console.log('开始鉴权qiankun路由结束')
            if (isChildRoute(from.path) && !isChildRoute(to.path)) {
                console.log('从子应用路由跳转到主应用路由')
                rawAppendChildSubCopy = HTMLHeadElement.prototype.appendChild
                rawAddEventListenerSubCopy = window.addEventListener
                HTMLHeadElement.prototype.appendChild = rawAppendChild
                window.addEventListener = rawAddEventListener
                console.log('qiankun整体结束1')
            } else if (!isChildRoute(from.path) && isChildRoute(to.path)) {
                if (rawAppendChildSubCopy && rawAddEventListenerSubCopy) {
                    HTMLHeadElement.prototype.appendChild = rawAppendChildSubCopy
                    window.addEventListener = rawAddEventListenerSubCopy
                }
                console.log('qiankun整体结束2')
            }
            // 用来处理qiankun 从子应用跳转到主应用 无法渲染主应用css和js的bug 结束
            next()
        }
    } else {
        /* has no token*/
        console.log('没有token')
        if (whiteList.indexOf(to.path) !== -1) {
            console.log('在白名单')
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            console.log('不在白名单', to)
            next(`/login`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
