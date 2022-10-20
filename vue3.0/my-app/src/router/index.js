import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'
import Home from '@/views/Home'
import User from '@/views/User'

Vue.use(VueRouter);

const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        children: [{
                path: '/home',
                component: Home
            },
            {
                path: '/user',
                component: User
            },
        ]
    }

]

const router = new VueRouter({
    routes
})

export default router