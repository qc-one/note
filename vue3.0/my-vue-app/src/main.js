import {
    createApp
} from 'vue'
import './style/index.less'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import router from './router/index'
import {
    createPinia
} from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './mock'
import api from './api'

const pinia = createPinia()
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.$api = api;
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')