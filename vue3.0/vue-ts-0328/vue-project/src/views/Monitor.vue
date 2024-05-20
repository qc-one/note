<template>
    <div>前端异常监控</div>
    <button @click="errorClick">点击抛出错误</button>
    <button @click="errorClickPromise">点击抛出promise错误</button>
</template>
<script setup
    lang="ts">
    import { ref } from 'vue'

    const errorClick = () => {
        window.someVar.error = 'error'
    }
    const errorClickPromise = () => {

    }

</script>
<style>
</style>