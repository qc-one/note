<template>
    <div>
        <el-menu :router="true" mode="horizontal" :default-active="activeIndex">
            <!-- 基座中可以放自己的路由 -->
            <el-menu-item index="/">Home</el-menu-item>
            <!-- 引用其他子应用 -->
            <el-menu-item index="/jquery">vue应用</el-menu-item>
            <el-menu-item index="/react">react应用</el-menu-item>
        </el-menu>
        <el-button type="primary" @click="login"> Login </el-button>
        <el-button type="primary" @click="changeToken"> 改变token </el-button>
        <div class="red-color">red</div>
        <router-view></router-view>
        <div id="vue"></div>
        <div id="react"></div>
        <div id="jquery"></div>
    </div>
</template>

<script>
// import Home from './components/Home.vue'
import actions from "@/shared/actions.js";
import util from "@/utils/index.js";
export default {
    name: "App",
    data() {
        return {
            activeIndex: "/",
        };
    },
    mounted() {
        // 注册一个观察者函数
        actions.onGlobalStateChange((state, prevState) => {
            // state: 变更后的状态; prevState: 变更前的状态
            console.log("主应用观察者：token 改变前的值为 ", prevState.token);
            console.log(
                "主应用观察者：登录状态发生改变，改变后的 token 的值为 ",
                state.token
            );
        });
        util.setCookie({
            key: "name",
            value: "qc1233",
            domain: "localhost",
        });
        util.setCookie({
            key: "name2",
            value: "2",
            domain: "aaa.localhost",
            SameSite: "None",
        });
        util.setCookie({
            key: "name3",
            value: "3",
            domain: "localhost.aaa.com",
            SameSite: "None",
        });
    },
    methods: {
        changeToken() {
            actions.setGlobalState({ token: "456token" });
        },
        login() {
            // ApiLoginQuickly 是一个远程登录函数，用于获取 token，详见 Demo
            // const result = await ApiLoginQuickly();
            // const { token } = result.data.loginQuickly;

            // 登录成功后，设置 token
            actions.setGlobalState({ token: "123token" });
            this.$router.push("/vue");
        },
    },
};
</script>

<style>
.red-color {
    color: red;
}

/* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
</style>