import Vue from 'vue'
import App from './App.vue'
import "amfe-flexible/index.js";
import i18n from "./language";

Vue.config.productionTip = false

Vue.use(i18n);

new Vue({
    render: h => h(App),
}).$mount('#app')
