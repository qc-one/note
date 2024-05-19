<template>
  <div class="about">
    <h1>This is an about page</h1>
    <img :src="imgData"
      alt="">
  </div>
</template>

<script setup>
import imgData from '@/assets/images/001.png'
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
