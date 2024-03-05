<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
</template>
<script setup>
import {
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
} from "vue";

console.log("setup");
onBeforeMount(() => {
    console.log("onBeforeMount");
});
onMounted(() => {
    console.log("onMounted");
});
onBeforeUpdate(() => {
    console.log("onBeforeUpdate");
});
onUpdated(() => {
    console.log("onUpdated");
});
onBeforeUnmount(() => {
    console.log("onBeforeUnmount");
});
onUnmounted(() => {
    console.log("onUnmounted");
});
// 创建一个响应式的计数器
// const count = ref(props.initialCount || 0);
// // 定义一个增加计数的方法
// const increment = () => {
//     count.value++;
// };
// console.log(count.value, 111);
// return {
//     count,
//     increment,
// };
</script>
