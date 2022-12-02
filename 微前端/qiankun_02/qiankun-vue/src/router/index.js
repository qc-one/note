import VueRouter from "vue-router";
import Vue from 'vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: '/vue',
    routes: [{
            path: '/about',
            name: 'About',
            component: () => {
                return import('../components/About.vue')
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: () => {
                return import('../components/Home.vue')
            }
        }
    ]
})

export default router