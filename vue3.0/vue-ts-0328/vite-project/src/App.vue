<!-- <script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script> -->
<!-- <script>
export default {
    data() {
        return {
            aa: 123,
        };
    },
    methods: {
        test() {},
    },
    setup() {
        const a = 1;

        return {
            a,
        };
    },
};
</script> -->

<script setup lang="ts">
import BaseData from "./components/BaseData.vue";
import { reactive, shallowRef, triggerRef } from "vue";

const a: number[] = [1, 2];

const xxx = () => {
    console.log("点击了");
};
const handleType = "click";
</script>

<template>
    <div>
        {{ a }}
        <button v-on:click="xxx">点击</button>
        <button @click="xxx">点击</button>
        <button @[handleType]="xxx">点击</button>
        <BaseData></BaseData>
    </div>
    <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
