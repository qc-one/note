<template>
    <div>
        <template v-for="menu in menuData">
            <el-submenu
                :key="menu.index"
                :index="menu.index"
                v-if="menu.children"
            >
                <template slot="title">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{ menu.name }}</span>
                </template>
                <MenuTree :menuData="menu.children"></MenuTree>
            </el-submenu>
            <AppLink :key="menu.index" :to="menu.path" v-else>
                <el-menu-item :index="menu.index">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{ menu.name }}</span>
                </el-menu-item>
            </AppLink>
        </template>
    </div>
</template>

<script>
import AppLink from "./Link";
export default {
    name: "MenuTree",
    props: ["menuData"],
    components: { AppLink },
    data() {
        return {};
    },
    created() {
        console.log("menu tree", this.menuData);
    },
    methods: {},
};
</script>
