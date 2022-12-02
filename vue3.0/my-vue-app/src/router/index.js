import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [{
        path: '/',
        component: () => import('../views/Main.vue'),
        redirect: '/home',
        children: [{
            path: '/home',
            name: 'home',
            component: () => import('../views/Home/index.vue')
        }, {
            path: '/user',
            name: 'user',
            component: () => import('../views/User/index.vue')
        }, {
            path: '/mall',
            name: 'mall',
            component: () => import('../views/Mall/index.vue')
        }, {
            path: '/other',
            name: 'other',
            component: () => import('../views/Other/index.vue'),
            children: [
                //首页 
                {
                    path: 'pageone',
                    name: "page3",
                    component: () => import('../views/PageOne/index.vue'),
                },
                // 用户管理
                {
                    path: 'pagetwo',
                    name: "page2",
                    component: () => import('../views/PageTwo/index.vue'),
                }
            ]
        }]
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// router.beforeEach((to, from, next) => {
//     const token = Cookie.get("token");
//     console.log(token, 'tttt');
//     if (!token && to.name !== 'login') {
//         next({
//             name: 'login'
//         });
//     } else if (token && to.name === 'login') {
//         next({
//             name: 'home'
//         });
//     } else {
//         next();
//     }
// })

export default router