<template>
    <div id="app">
        <div class="mobile">mobilemobilemobile</div>
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "App",
    components: {
        HelloWorld,
    },
    created() {
        if (localStorage.getItem("time") === null) {
            localStorage.setItem("time", 0);
        }
        // this.timesFn()
    },
    methods: {
        timesFn() {
            console.log(1);
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.timesFn();
            }, 900);
            if (
                parseInt(new Date() / (1000 * 3600 * 24)) -
                    localStorage.getItem("times") <=
                0
            )
                return;
            //clearInterval(this.timer)
            //this.timer = null
            document.querySelector(".v-modal")?.click(); //关闭前一个弹窗
            localStorage.setItem(
                "time",
                parseInt(new Date() / (1000 * 3600 * 24))
            );
            let flag = true;
            if (flag) {
                console.log("确定");
            } else {
                this.timesFn();
            }
            // const h = this.$createElement
            // let message
            // message = h('div', null, [
            //     h('p', { style: 'text-indent:2em' }, '为不影响您的后续操作，请您及时续订')
            // ])
            // this.$confirm(message, '提示', {
            //     confirmButtonText: '立即续订',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // })
            //     .then(() => {
            //         window.open(this.$config['buyLink'], '_blank')
            //     })
            //     .finally(() => {
            //         this.timesFn()
            //     })
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.mobile {
    width: 100px;
    height: 100px;
    background: red;
}
</style>
