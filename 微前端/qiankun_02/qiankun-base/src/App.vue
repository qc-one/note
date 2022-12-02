<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {};
    },
    mounted() {
        const res = {
            name: "steven",
            username: "steven",
            authToken: "400e4386-38f1-4d56-ab63-a9b0a2694344dc",
            menus: [
                {
                    id: "dashboard",
                    index: "1",
                    icon: "el-icon-location",
                    name: "首页",
                    path: "/dashboard",
                },
                {
                    id: "attr",
                    index: "2",
                    icon: "el-icon-location",
                    name: "客服系统",
                    path: "/attr",
                },
                {
                    id: "sub_app_01",
                    index: "3",
                    icon: "el-icon-location",
                    name: "手机业务来自子应用url",
                    path: "http://10.2.51.5:8081/#/suborigin",
                    children: [
                        {
                            id: "sub_app_01_child",
                            index: "5",
                            icon: "el-icon-location",
                            name: "手机业务第一个子系统",
                            path: "http://10.2.51.5:8081/#/suborigin/suborigin",
                        },
                    ],
                },
                {
                    id: "sub_app_02",
                    index: "4",
                    icon: "el-icon-location",
                    name: "电话业务来自子应用url",
                    path: "http://10.2.51.5:8081/#/subattr/subattr",
                },
            ],
        };
        const result = res;
        window.localStorage.setItem("allUserInfo", JSON.stringify(result));
    },
    methods: {},
};
</script>

<style>
</style>