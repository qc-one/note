<template>
    <div id="vue-app">
        <router-link to="/about">about</router-link>
        <router-link to="/home">home</router-link>
        <router-view></router-view>
        <div class="red-color">red</div>
    </div>
</template>

<script>
import actions from "@/shared/actions.js";
import util from "@/utils/index.js";
export default {
    name: "App",
    mounted() {
        // 注册观察者函数
        // onGlobalStateChange 第二个参数为 true，表示立即执行一次观察者函数
        actions.onGlobalStateChange((state) => {
            console.log(state, "state");
            const { token } = state;
            // 未登录 - 返回主页
            if (!token) {
                console.log("未登录");
            }

            // 获取用户信息
            this.getUserInfo(token);
        }, true);
        console.log(util.getCookieValue("name"), "name");
        util.setCookie("age", 18);
    },
    methods: {
        getUserInfo(token) {
            console.log(token, "token");
        },
    },
};
</script>

<style>
.red-color {
    color: green;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>