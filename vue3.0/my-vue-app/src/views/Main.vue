<script setup>
import { ref, defineComponent } from "vue";
import Header from "../components/Header/Header.vue";
import Aside from "../components/Aside/index.vue";

const isCollapse = ref(true);
const handleOpen = () => {
    console.log(key, keyPath);
};
const handleClose = () => {
    console.log(key, keyPath);
};
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="auto">
                <Aside></Aside>
            </el-aside>
            <el-container class="r-container">
                <el-header>
                    <Header></Header>
                </el-header>
                <div>
                    这个部分是变化的
                    <router-view></router-view>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="less">
.el-container,
.common-layout {
    height: 100%;
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
}
.read-the-docs {
    color: #888;
}
</style>
