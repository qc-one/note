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
        path: '/subattr',
        component: Layout,
        children: [{
            path: 'subattr',
            name: 'subattr',
            component: () => import('@/views/attr/index'),
            meta: {
                title: 'page1',
                icon: 'form'
            }
        }]
    },
    {
        path: '/subtype',
        component: Layout,
        children: [{
            path: 'subtype',
            name: 'subtype',
            component: () => import('@/views/type/index'),
            meta: {
                title: 'page2',
                icon: 'form'
            }
        }]
    },
    {
        path: '/suborigin',
        component: Layout,
        children: [{
            path: 'suborigin',
            name: 'suborigin',
            component: () => import('@/views/origin/index'),
            meta: {
                title: 'page3',
                icon: 'form'
            }
        }]
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

export default routes
