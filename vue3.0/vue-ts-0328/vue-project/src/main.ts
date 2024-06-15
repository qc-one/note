import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { injectJsError } from './monitor/lib/jsError'
injectJsError()

// 全部加载element-plus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import "@/mock/index.ts"

const app = createApp(App)
// console.log(ElementPlusIconsVue, 111)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component('Edit', ElementPlusIconsVue.Edit)
// }

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
