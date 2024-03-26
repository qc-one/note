import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import EventBus from "./modules/bus";

import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;
Vue.use(Antd);

Vue.prototype.$EventBus = EventBus;

new Vue({
    render: (h) => h(App),
}).$mount("#app");
