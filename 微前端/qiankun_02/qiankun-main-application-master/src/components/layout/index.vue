<template>
    <div :class="classObj" class="app-wrapper">
        <Sidebar class="sidebar-container" />
        <div class="main-container">
            <div class="header-nav-bar">
                <Navbar />
            </div>
            <AppMain />
        </div>
    </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";

export default {
    name: "Layout",
    components: {
        Navbar,
        Sidebar,
        AppMain,
    },
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar;
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
            };
        },
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch("app/closeSideBar", {
                withoutAnimation: false,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}
</style>
