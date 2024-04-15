<template>
  <div class="test-one">
    Draggable-test01
    <div class="test-one-main">拖动001</div>
    <!-- <DraggableTwo></DraggableTwo> -->
  </div>
</template>

<script>
// import DraggableTwo from "@/components/Draggable/test02.vue";
export default {
  name: "DraggableOne",
  components: {
    // DraggableTwo,
  },
};
</script>
<style scoped lang="scss">
.test-one {
  width: 300px;
  height: 200px;
  background-color: red;

  .test-one-main {
    background-color: aqua;
  }
}
</style>
