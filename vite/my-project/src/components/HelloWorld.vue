<script setup>
import { ref } from "vue";

defineProps({
    msg: String,
});
console.log("import.meta.env::", import.meta.env);

const count = ref(1);
</script>

<template>
    <h1>{{ msg }}</h1>
    <div class="box">
        <p class="red">12345</p>
    </div>
</template>

<style scoped>
.box {
    .red {
        color: red;
    }
}
.read-the-docs {
    color: #888;
}
</style>
