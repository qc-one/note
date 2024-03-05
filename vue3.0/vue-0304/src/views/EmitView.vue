<template>
    <div class="about">
        <h1>This is an Emit page</h1>
    </div>
</template>
<script>
export default {
    methods: {
        handleChange(event) {
            this.$emit("customChange", event.target.value.toUpperCase());
        },
    },
};
</script>
