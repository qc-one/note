<template>
    <div class="about">
        <h1>This is an Pinia page</h1>
        <h2>{{ storePinia.name }}</h2>
        <button @click="changeName">changeName</button>
    </div>
</template>
<script>
// import { storeToRefs } from "pinia";
import { useUsersStore } from "../pinia";
export default {
    setup() {
        let storePinia = useUsersStore();
        console.log("pinia", storePinia);
        console.log(storePinia.name);
        function changeName() {
            storePinia.name = "qin";
            console.log(storePinia);
        }
        return {
            storePinia,
            changeName,
        };
    },
};
</script>
