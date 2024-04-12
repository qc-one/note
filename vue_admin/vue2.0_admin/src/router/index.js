import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'
import Home from '@/views/Home'
import User from '@/views/User'
import Mall from '@/views/Mall'
import Other from '@/views/Other'
import PageOne from '@/views/PageOne'
import PageTwo from '@/views/PageTwo'
import Login from '@/views/Login'
import Cookie from 'js-cookie'

Vue.use(VueRouter);

const routes = [
    // 登录页面
    {
        path: '/login',
        name: "login",
        component: Login
    },
    // 主路由
    {
        path: '/',
        component: Main,
        redirect: '/home',
        name: 'Main',
        children: [
            // 首页
            // {
            //     path: '/home',
            //     name: "home",
            //     component: Home
            // },
            // // 用户管理
            // {
            //     path: '/user',
            //     name: "user",
            //     component: User
            // },
            // // 商品管理
            // {
            //     path: '/mall',
            //     name: "mall",
            //     component: Mall
            // },
            // // 其它
            // {
            //     path: '/other',
            //     component: Other,
            //     name: "other",
            //     children: [
            //         // 首页
            //         {
            //             path: 'pageone',
            //             name: "pageone",
            //             component: PageOne
            //         },
            //         // 用户管理
            //         {
            //             path: 'pagetwo',
            //             name: "pagetwo",
            //             component: PageTwo
            //         }
            //     ]
            // },
        ]
    }

]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    const token = Cookie.get("token");
    console.log(token, 'tttt');
    if (!token && to.name !== 'login') {
        next({
            name: 'login'
        });
    } else if (token && to.name === 'login') {
        next({
            name: 'home'
        });
    } else {
        next();
    }
})

export default router