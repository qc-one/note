<template>
    <div class="keep-alive">
        keep-alive
    </div>
</template>

<script>
    export default {
        name: 'KeepAlive',
        created() {
            console.log('keep-alive');
        },
        activated() {
            console.log('activated');
        },
        data() {
            return {

            }
        },
        destroyed() {
            console.log('kepp销毁');
        },
    }
</script>

<style scoped>

</style>