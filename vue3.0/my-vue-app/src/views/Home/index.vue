<script>
import { ref, defineComponent, onMounted, getCurrentInstance } from "vue";
import { getData } from "../../api";

export default defineComponent({
    components: {},
    setup() {
        let { proxy } = getCurrentInstance();
        console.log(proxy.$api);
        let getHome = async () => {
            let res = await getData();
            console.log(res);
            return res;
        };

        // getData()
        //     .then((res) => {
        //         console.log(res, "123");
        //     })
        //     .catch((err) => {
        //         console.log(err, "错误");
        //     });
        onMounted(() => {
            console.log("onMount");
            getHome();
        });
    },
});
</script>

<template>
    <div>我是home组件</div>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
