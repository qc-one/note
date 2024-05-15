<template>
    <div>div{{ a }}</div>
    <div>{{ moment().format("YYYY-MM") }}</div>
</template>
<script setup
    lang="ts">
    import { ref } from 'vue'
    import moment from 'moment'

    const a = ref<number>(345)

</script>
<style lang="less">
@red: red;

html,
body {
    background-color: green;
    color: @red;
}
</style>