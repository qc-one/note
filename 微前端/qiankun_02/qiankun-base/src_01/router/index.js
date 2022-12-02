import VueRouter from "vue-router";
import Vue from 'vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => {
                return import('../components/Home.vue')
            }
        }
    ]
})

export default router