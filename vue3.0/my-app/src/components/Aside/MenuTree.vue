<template>
    <div>
        <template v-for="menu in menuData">
            <el-submenu
                :key="menu.index"
                :index="menu.index"
                v-if="menu.children"
            >
                <template slot="title">
                    <i :class="'el-icon-' + menu.icon"></i>
                    <span slot="title">{{ menu.label }}</span>
                </template>
                <MenuTree :menuData="menu.children"></MenuTree>
            </el-submenu>
            <el-menu-item
                :index="menu.name"
                :key="menu.name"
                :to="menu.path"
                v-else
                @click="jumpTo(menu)"
            >
                <i :class="'el-icon-' + menu.icon"></i>
                <span slot="title">{{ menu.label }}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
export default {
    name: "MenuTree",
    props: ["menuData"],
    data() {
        return {};
    },
    created() {},
    methods: {
        openSub(item) {},
        jumpTo(item) {
            this.$router.push(
                {
                    path: item.path,
                },
                () => {}
            );
            this.$store.commit("tab/selectMenu", item);
        },
    },
};
</script>
<style scoped lang="less">
.el-menu-item,
.el-submenu {
    text-align: left;
}
/*隐藏文字*/
.el-menu--collapse .el-submenu__title span {
    display: none;
}
/*隐藏 > */
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none;
}
</style>