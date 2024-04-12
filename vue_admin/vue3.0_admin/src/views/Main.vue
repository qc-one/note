<script>
import { ref, defineComponent } from "vue";
import Header from "../components/Header/Header.vue";
import Aside from "../components/Aside/index.vue";

export default defineComponent({
    components: { Header, Aside },
    setup() {},
});
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside>
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
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.read-the-docs {
    color: #888;
}
</style>
