<script setup
  lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import { onMounted, ref, nextTick } from 'vue'

  const loadTime = ref(0)
  const startTime = ref(0)
  startTime.value = Date.now()
  // for (let i = 0; i < 100000; i++) {
  //   console.log(i);
  // }
  onMounted(() => {
    nextTick(() => {
      const endTime = Date.now()
      loadTime.value = endTime - startTime.value
      // console.log(loadTime.value, '---')
      // console.log(performance);
    })
  })

</script>

<template>
  <header>

  </header>
  <el-config-provider namespace="ep">
    <RouterView />

  </el-config-provider>
</template>

<style>
:root {
  --ep-color-primary: red;
  /* 默认的主色 */
  --ep-color-success: #67C23A;
  /* 成功色 */
  --ep-color-warning: #E6A23C;
  /* 警告色 */
  --ep-color-danger: #F56C6C;
  /* 危险色 */
  --ep-color-info: #909399;
  /* 信息色 */
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
