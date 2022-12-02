/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router';
import actions from "@/shared/actions.js";

// Vue.config.productionTip = false

// new Vue({
//     router,
//     render: h => h(App),
// }).$mount('#vue-app')

let instance = null;

function render(props) {
    console.log(props, 'oppp');
    if (props) {
        // 注入 actions 实例
        actions.setActions(props);
    }
    instance = new Vue({
        router,
        render: h => h(App),
    }).$mount('#vue-app'); // 这里是挂载到自己的html中，基座会拿到这个挂载后的html，将其插入进去
}
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

export async function bootstrap(props) {
    console.log(props, 3333);
    console.log('vue应用');
}
export async function mount(props) {
    console.log(props, 1111);
    props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log(state, prev, 90);
        setTimeout(() => {
            // @ts-ignores
            // props.setGlobalState({
            //     ...state,
            //     age: 20
            // });
        }, 2000)
    });
    render(props);
}
export async function unmount(props) {
    console.log(props, 2222);
    instance.$destroy();
}