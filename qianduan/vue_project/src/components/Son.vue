<template>
    <div class="son">
        son
        <a-button @click="sayFu" sayFu>父组件</a-button>
    </div>
</template>

<script>
    export default {
        name: 'SonSon',
        created() {
            console.log('son', this.$EventBus);
            console.log(this.aaa, 'aaa');
        },
        inject: ['aaa'],
        data() {
            return {

            }
        },
        methods: {
            sayFu() {
                this.$EventBus.$emit("getData", 123);
            }
        }
    }
</script>

<style scoped>

</style>