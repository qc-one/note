<template>
    <div>
        layout
        <router-view></router-view>
    </div>
</template>

<script>
console.log(89);
export default {
    name: "Layout",
    setup() {
        console.log("layout");
    },
};
</script>
