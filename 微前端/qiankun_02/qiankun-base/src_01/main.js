import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import {
    registerMicroApps,
    start,
} from 'qiankun';


Vue.config.productionTip = false

Vue.use(ElementUI);

// let state = {
//     nick_name: "乾坤"
// }
// // 初始化 state
// const actions = initGlobalState(state);
// actions.onGlobalStateChange((state, prev) => {
//     // state: 变更后的状态; prev 变更前的状态
//     console.log(state, prev, 123222);
//     console.log(actions);
// });
// setTimeout(() => {
//     console.log(123);
//     actions.setGlobalState({
//         ...state,
//         age: 19
//     });
// }, 2000)
// actions.offGlobalStateChange();

registerMicroApps([{
        name: 'vueApp', // app name registered
        entry: '//localhost:10001', // 默认会加载这个html解析里面的js，动态的执行（子应用必须支持跨域）
        container: '#vue',
        activeRule: '/vue',
        props: {
            a: 123
        }
    },
    {
        name: 'reactApp',
        // entry: { scripts: ['//localhost:7100/main.js'] },
        entry: '//localhost:20000',
        container: '#react',
        activeRule: '/react',
    },
    {
        name: 'jqueryApp',
        // entry: { scripts: ['//localhost:7100/main.js'] },
        entry: '//127.0.0.1:5500/qiankun_jquery.html',
        container: '#jquery',
        activeRule: '/jquery',
    },
], {
    beforeLoad: (app) => {
        console.log('before load app.name====>>>>>', app.name)
    },
    beforeMount: [
        (app) => {
            console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
        },
    ],
    afterMount: [
        (app) => {
            console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
        },
    ],
    afterUnmount: [
        (app) => {
            console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
        },
    ],
});

start({
    prefetch: false, // 取消预加载
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')