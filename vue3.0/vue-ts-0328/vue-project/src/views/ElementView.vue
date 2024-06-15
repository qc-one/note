<template>
  <div class="about">
    <h1>This is an elementui page</h1>
    <el-button type="primary">Primary</el-button>
    <el-icon size="250"
      color="red">
      <el-icon-filter></el-icon-filter>
    </el-icon>
    <el-icon size="250"
      color="red">
      <!-- <Edit /> -->
    </el-icon>
  </div>
</template>

<script setup>
import { getUsersApi } from "@/api/users.ts"
async function getUsers() {
  let res = await getUsersApi()
  console.log('res', res)
}
getUsers()
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
