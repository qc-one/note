import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/components/layout'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: {
                title: '首页',
                icon: 'dashboard'
            }
        }]
    },
    {
        path: '/attr',
        component: Layout,
        children: [{
            path: 'attr',
            name: 'attr',
            component: () => import('@/views/attr/index'),
            meta: {
                title: '客服系统',
                icon: 'form'
            }
        }]
    },
    {
        path: '/type',
        component: Layout,
        children: [{
            path: 'type',
            name: 'type',
            component: () => import('@/views/type/index'),
            meta: {
                title: '支付系统',
                icon: 'form'
            }
        }]
    },
    {
        path: '/origin',
        component: Layout,
        children: [{
            path: 'origin',
            name: 'origin',
            component: () => import('@/views/origin/index'),
            meta: {
                title: '订单系统',
                icon: 'form'
            }
        }]
    },
    {
        path: '/login',
        name: 'login',
        hidden: true,
        component: () => import( /* webpackChunkName: "404" */ '@/views/login/index.vue')
    },
    {
        path: '/404',
        name: '404',
        hidden: true,
        component: () => import( /* webpackChunkName: "404" */ '@/views/error/404.vue')
    },
    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const createRouter = () => new VueRouter({
    mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: routes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export const constantRoutes = routes

export default router
