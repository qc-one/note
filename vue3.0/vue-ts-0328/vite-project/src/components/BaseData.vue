<script setup lang="ts">
import { reactive, shallowRef, triggerRef, customRef } from "vue";

type M = {
    name: string;
};

const Man = reactive<M>({
    name: "qc",
});
const Man2 = shallowRef<M>({
    name: "qin",
});
const changeName = () => {
    // Man.name = "qin";
    Man2.value.name = "我是shallowRef";
    triggerRef(Man2);
};

function myRef<T>(value: T) {
    return customRef((track, trigger) => {
        return {
            get() {
                track(); // 通知vue追踪数据的变化，追踪
                return value;
            },
            set(newVal) {
                value = newVal;
                trigger();
            },
        };
    });
}
</script>

<template>
    <div>
        {{ Man }}{{ Man2 }}
        <button @click="changeName">点击</button>
    </div>
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
