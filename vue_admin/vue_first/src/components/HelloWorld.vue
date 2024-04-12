<template>
    <div>
        {{ bbb }}
        <button @click="aaa(123)">aaa</button>
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    name: "HelloWorld",
    props: ["msg"],
    setup(props, context) {
        console.log("hello", props, context);
        let bbb = ref(89);
        function aaa(s) {
            console.log(1, s);
            setTimeout(() => {
                bbb.value = 90;
                console.log(bbb);
            }, 3000);
        }
        return {
            bbb,
            aaa,
        };
    },
};
</script>
