<template>
    <div style="height: 100%">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <h1>{{ isCollapse ? "后台" : "后台管理系统" }}</h1>
            <MenuTree :menuData="menuList"></MenuTree>
        </el-menu>
    </div>
</template>
<script>
import { mapState } from "vuex";
import MenuTree from "./MenuTree.vue";
import Cookie from "js-cookie";
export default {
    name: "Aside",
    components: {
        MenuTree,
    },
    computed: {
        ...mapState({
            isCollapse: (state) => {
                return state.tab.isCollapse;
            },
            menuList: (state) => {
                console.log(state);
                return JSON.parse(Cookie.get("menu")) || state.tab.menu;
            },
        }),
    },
    data() {
        return {
            // menuList: [
            // {
            //     path: "/",
            //     name: "home",
            //     label: "首页",
            //     icon: "s-home",
            //     url: "home/home",
            //     index: "1",
            // },
            // {
            //     index: "2",
            //     path: "/mall",
            //     name: "mall",
            //     label: "商品管理",
            //     icon: "video-play",
            //     url: "mallmanage/mallmanage",
            // },
            // {
            //     index: "3",
            //     path: "/user",
            //     name: "user",
            //     label: "用户管理",
            //     icon: "user",
            //     url: "usermanage/usermanage",
            // },
            // {
            //     index: "4",
            //     // path: '/',
            //     name: "/other",
            //     label: "其他",
            //     icon: "s-tools",
            //     // url: 'home/home'
            //     children: [
            //         {
            //             index: "5",
            //             path: "/other/pageone",
            //             name: "page1",
            //             label: "页面1",
            //             icon: "setting",
            //             url: "other/pageone",
            //             children: [
            //                 {
            //                     index: "7",
            //                     path: "/other/pageone",
            //                     name: "page3",
            //                     label: "页面3",
            //                     icon: "setting",
            //                     url: "other/pageone",
            //                 },
            //             ],
            //         },
            //         {
            //             index: "6",
            //             path: "/other/pagetwo",
            //             name: "page2",
            //             label: "页面2",
            //             icon: "setting",
            //             url: "other/pagetwo",
            //         },
            //     ],
            // },
            // ],
        };
    },
    created() {},
    methods: {
        handleOpen(item) {},
        handleClose() {},
    },
};
</script>
<style lang="less" scoped>
.el-menu {
    height: 100%;
    border: none;

    h1 {
        color: #ffffff;
        text-align: center;
        line-height: 48px;
    }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>