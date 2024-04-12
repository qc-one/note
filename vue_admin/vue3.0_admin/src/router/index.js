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