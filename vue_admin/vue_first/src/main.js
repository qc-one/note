import {
    createApp
} from 'vue'
import App from './App.vue'
import './index.css'
console.log(34);


import router from './router/index'

createApp(App).use(router).mount('#app')