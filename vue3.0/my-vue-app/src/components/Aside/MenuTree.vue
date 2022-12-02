<template>
    <template v-for="menu in menuData">
        <el-sub-menu :key="menu.index" :index="menu.index" v-if="menu.children">
            <template #title>
                <component class="icons" :is="menu.icon"></component>
                <span class="menu-text">{{ menu.label }}</span>
            </template>
            <MenuTree :menuData="menu.children"></MenuTree>
        </el-sub-menu>
        <el-menu-item
            :index="menu.name"
            :key="menu.name"
            :to="menu.path"
            v-else
            @click="jumpTo(menu)"
        >
            <component class="icons" :is="menu.icon"></component>
            <span class="menu-text">{{ menu.label }}</span>
        </el-menu-item>
    </template>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    menuData: Array,
});
const { menuData } = props;
const router = useRouter();

function jumpTo(item) {
    console.log(item);
    router.push({
        name: item.name,
    });
}
function openSub() {}

// export default {
//     name: "MenuTree",
//     props: ["menuData"],
//     data() {
//         return {};
//     },
//     created() {},
//     methods: {
//         openSub(item) {},
//         jumpTo(item) {
//             this.$router.push(
//                 {
//                     path: item.path,
//                 },
//                 () => {}
//             );
//             this.$store.commit("tab/selectMenu", item);
//         },
//     },
// };
</script>
<style scoped lang="less">
.icons {
    width: 20px;
    height: 20px;
}
.el-menu--collapse {
    .menu-text {
        padding: 0;
    }
}
.menu-text {
    padding-left: 10px;
}
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