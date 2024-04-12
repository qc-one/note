<template>
    <div>
        123
        <router-view></router-view>
        <HelloWorld msg="123" />
    </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
    name: "App",
    components: {
        HelloWorld,
    },
};
</script>
