<template>
    <div>
        <template v-for="menu in menuData">
            <el-submenu :key="menu.index" :index="menu.index" v-if="menu.children">
                <template slot="title">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{ menu.label }}</span>
                </template>
                <MenuTree :menuData="menu.children"></MenuTree>
            </el-submenu>
            <el-menu-item :index="menu.index" :key="menu.index" :to="menu.path" v-else>
                <i :class="menu.icon"></i>
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
        created() {
            console.log("menu tree", this.menuData);
        },
        methods: {},
    };
</script>