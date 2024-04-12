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
<script setup>
import { menuStore } from "../../store";
import { storeToRefs } from "pinia";
import MenuTree from "./MenuTree.vue";
const store = menuStore();
const { menuList } = storeToRefs(store);
console.log(store.menuList, "menu");

function handleOpen() {}
function handleClose() {}

let isCollapse = false;
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