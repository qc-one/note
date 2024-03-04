<template>
    <div class="keep-alive">
        KeepTest
    </div>
</template>

<script>
    export default {
        name: 'KeepTest',
        created() {
            console.log('KeepTest');
        },
        data() {
            return {

            }
        },
        destroyed() {
            console.log('KeepTest销毁');
        },
    }
</script>

<style scoped>

</style>