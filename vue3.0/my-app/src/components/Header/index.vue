<template>
    <div class="header-container">
        <div class="l-content">
            <el-button
                icon="el-icon-menu"
                size="small"
                @click="handleColl"
                style="margin-right: 20px"
            ></el-button>
            <!-- 面包屑 -->
            <!-- :to="{ path: item.path }" -->
            <!-- @click.native="breadcrumbClick(item)" -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item
                    v-for="item in tabsList"
                    :key="item.path"
                    @click.native="breadcrumbClick(item)"
                    :class="{ active: item.path === $route.path }"
                    >{{ item.label }}</el-breadcrumb-item
                >
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="logout">
                <span class="el-dropdown-link">
                    <i class="el-icon-user-solid"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
    name: "Header",
    computed: {
        ...mapState({
            isCollapse: (state) => {
                return state.tab.isCollapse;
            },
            tabsList: (state) => {
                return state.tab.tabsList;
            },
        }),
    },
    data() {
        return {};
    },
    created() {},
    methods: {
        // 退出
        logout(flag) {
            if (flag === "logout") {
                Cookie.remove("token");
                Cookie.remove("menu");
                this.$router.replace("/login");
            }
        },
        handleColl() {
            this.$store.commit("tab/updateCommon", {
                isCollapse: !this.isCollapse,
            });
        },
        breadcrumbClick(item) {
            this.$router.push(
                {
                    path: item.path,
                },
                () => {}
            );
        },
    },
};
</script>
<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    height: 60px;
    background-color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
        color: #ffffff;
        font-size: 14px;
        margin-left: 10px;
    }
    .l-content {
        display: flex;
        align-items: center;
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;
                &.is-link {
                    color: #666;
                }
            }
        }
        .active {
            /deep/.el-breadcrumb__inner {
                font-weight: normal;
                color: #fff;
            }
        }
    }
}
.el-dropdown-link {
    .el-icon-user-solid {
        font-size: 40px;
    }
}
</style>