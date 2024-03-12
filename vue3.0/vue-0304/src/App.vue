<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/base">Base</router-link> |
        <router-link to="/pinia">Pinia</router-link>
    </nav>
    <router-view />
</template>

<script setup>
console.log("app");
window.addEventListener("history", function () {
    console.log("history");
});
window.addEventListener("popstate", function (event) {
    console.log("popstate");
});
window.addEventListener("hashchange", function (event) {
    console.log("hashchange");
});
// 首先定义一个回调函数，当路由变化时会被调用
function handleRouteChange() {
    console.log("路由发生变化");
    // 在这里可以根据需要执行更多的逻辑
}

// 然后，我们监听popstate事件
window.addEventListener("popstate", handleRouteChange);
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
