import VueRouter from "vue-router";
import Vue from 'vue';

Vue.use(VueRouter);

import Layout from '@/layout'

const routes = [{
        path: '/dashboard',
        // redirect: '/dashboard',
        component: Layout,
        children: [{
            path: '',
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
            path: '',
            name: 'attr',
            component: () => import('@/views/attr/index'),
            meta: {
                title: '客服系统',
                icon: 'form'
            }
        }]
    },
]

const createRouter = () => new VueRouter({
    mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: routes
})

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export const constantRoutes = routes

export default router
