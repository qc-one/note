<script>
import { ref, defineComponent } from "vue";
import { getImgSrc } from "../../hooks";

export default defineComponent({
    components: {},
    setup() {
        function handleColl() {}
        function logout() {}
        return {
            logout,
            handleColl,
            getImgSrc,
        };
    },
});
</script>

<template>
    <div class="l-content">
        <el-button size="small" @click="handleColl" style="margin-right: 20px">
            <el-icon :size="20">
                <Menu></Menu>
            </el-icon>
        </el-button>
    </div>
    <div class="r-content">
        <el-dropdown @command="logout">
            <span class="el-dropdown-link">
                <!-- <el-icon :size="40">
                    <User />
                </el-icon> -->
                <img :src="getImgSrc('touxiang')" class="user" />
            </span>
            <template #dropdown>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<style scoped lang="less">
.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>
