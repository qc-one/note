<template>
    <div class="father">
        father
        <a-button @click="sayZizujian">子组件</a-button>
    </div>
</template>

<script>
    export default {
        name: 'FatherFather',
        created() {
            console.log('Father', this.$EventBus);
            this.$EventBus.$on("getData", (res) => {
                console.log(res);
            })
        },
        data() {
            return {

            }
        },
        methods: {
            sayZizujian() {

            }
        }
    }
</script>

<style scoped>

</style>