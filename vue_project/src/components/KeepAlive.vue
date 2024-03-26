<template>
    <div class="keep-alive">
        keep-alive
        <div v-for="(item, index) in arr" :key="index">{{ item }}</div>
        <button @click="changeArr">changeArr</button>
    </div>
</template>

<script>
export default {
    name: "KeepAlive",
    created() {
        // console.log('keep-alive');
    },
    activated() {
        // console.log("activated");
    },
    data() {
        return {
            arr: [1, 2, 3, 4],
        };
    },
    methods: {
        changeArr() {
            // this.arr[2] = 9;
            // this.$set(this.arr, 2, 9);
            // this.arr.length = 5; // 数组变了，组件不会重新渲染
            // this.arr[4] = 8;
            console.log(this.arr, "arr");
        },
    },
    destroyed() {
        console.log("kepp销毁");
    },
};
</script>

<style scoped></style>
