import {
    createStore
} from 'vuex'

export default createStore({
    state: {
        isCollapse: true
    },
    mutations: {
        updateIsCollapse(state, payload) {
            Object.assign(state, payload)
        }
    }
})

// 在组件中使用
// main.js
import store from './store';
app.use(store);
// 组件.js
// 第一种：$store.state.isCollapse
// 调用vuex中mutations
import {
    useStore
} from 'vuex'
let store = useStore();
store.commit("updateIsCollapse", 124)