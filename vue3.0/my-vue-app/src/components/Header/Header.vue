<template>
    <div class="l-content">
        <el-button size="small" @click="handleColl" style="margin-right: 20px">
            <el-icon :size="20">
                <Menu></Menu>
            </el-icon>
        </el-button>
        <h3>首页</h3>
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

<script>
import { ref, defineComponent } from "vue";
import { getImgSrc } from "../../hooks";
import { storeToRefs } from "pinia";
import { menuStore } from "../../store";

export default defineComponent({
    components: {},
    setup() {
        const store = menuStore();
        const { isCollapse } = storeToRefs(store);

        function handleColl() {
            store.updateCommon({ isCollapse: !store.isCollapse });
        }
        function logout() {}
        return {
            logout,
            handleColl,
            getImgSrc,
        };
    },
});
</script>

<style scoped lang="less">
.l-content {
    display: flex;
    align-items: center;
    .el-button {
        margin-right: 20px;
    }
    h3 {
        color: #fff;
    }
}
.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>
