<template>
    <div class="home">
        <h1>home---{{ a }}</h1>
    </div>
    <div>1234</div>
</template>

<script>
import {
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
} from "vue";

export default {
    name: "HomeView",
    components: {},
    beforeCreate() {
        console.log("beforeCreate");
    },
    data() {
        return {
            a: "aaa",
        };
    },
    created() {
        console.log("created");
    },
    beforeMount() {
        console.log("beforeMount");
    },
    mounted() {
        console.log("mounted");
    },
    beforeUpdate() {
        console.log("beforeUpdate");
    },
    updated() {
        console.log("updated");
    },
    beforeDestroy() {
        console.log(beforeDestroy);
    },
    setup(props, context) {
        console.log(props, context);
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
        const a = ref("aaaa");
        return {
            // count,
            // increment,
            a,
        };
    },
};
</script>
