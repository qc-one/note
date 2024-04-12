// import Vue from 'vue'
import {
    createRouter,
    createWebHistory
} from 'vue-router'

// Vue.use(Router)

import Layout from '/@/Layout/index.vue'

export const constantRoutes = [{
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home/index.vue')
    }]
}, ]

const router = createRouter({
    // mode: 'history', // require service support
    history: createWebHistory(),
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

// export function resetRouter() {
//     const newRouter = createRouter()
//     router.matcher = newRouter.matcher
// }

export default router