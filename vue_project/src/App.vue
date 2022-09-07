<template>
    <div id="app">
        <a-button type="primary" @click="keepAlice('testOne')">testOne切换组件</a-button>
        <a-button type="primary" @click="keepAlice('testTwo')">testTwo切换组件</a-button>
        <keep-alive exclude="KeepTest">
            <component :is="keepName"></component>
        </keep-alive>
    </div>
</template>

<script>
    import KeepAlive from './components/KeepAlive.vue'
    import KeepTest from './components/Test.vue'

    export default {
        name: 'App',
        components: {
            testOne: KeepAlive,
            testTwo: KeepTest
        },
        data() {
            return {
                keepName: 'testOne',
            }
        },
        methods: {
            keepAlice(v) {
                this.keepName = v;
            }
        },
    }
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
</style>