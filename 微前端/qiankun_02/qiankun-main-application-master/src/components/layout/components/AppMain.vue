<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
        </transition>
    </section>
</template>

<script>
export default {
    name: "AppMain",
    computed: {
        key() {
            return this.$route.path;
        },
    },
    created() {
        console.log(this.key, "key");
    },
};
</script>

<style scoped>
.app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
}
</style>
