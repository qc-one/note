<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import actions from "@/actions.js";
export default {
    name: "App",
    data() {
        return {};
    },
    created() {},
    mounted() {
        // 如果是从qiankun loadMicroApp进来的 需要用abstract路由跳转
        if (window.routePathFromQianKun) {
            this.initQiankunGlobalState();
            this.$router.push({
                path: window.routePathFromQianKun,
                query: window.queryFromQianKun || {},
            });
        }
    },
    methods: {
        initQiankunGlobalState() {
            const immediately = true; // true表示立刻触发
            actions.onGlobalStateChange((state, pre) => {
                // 建议token存到vuex中，可以保持自身子应用token独立无冲突
                this.$store.commit(
                    "qiankun/CHANGE_AUTH_TOKEN",
                    state.authToken
                );
                // 其他需要从qiankn里面获取state的都在这里初始化获取
                console.log(state);
            }, immediately);
        },
    },
};
</script>

