<template>
    <div>
        <span v-if="icon">
            <i v-if="icon.includes('el-icon')" :class="[icon, 'sub-el-icon']" />
            <svg-icon v-else :icon-class="icon" />
        </span>
        <span slot="title" v-if="title">{{ title }}</span>
    </div>
</template>
<script>
export default {
    name: "MenuItem",
    props: {
        icon: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
    },
};
</script>

<style scoped>
.sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
}
</style>
