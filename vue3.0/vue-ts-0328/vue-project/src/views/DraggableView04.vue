<template>
  <main>
    <div class="box">
      <!-- <div id="trash">目标对象</div>
        <hr> -->
      <!-- <div id="p3"
        class="src"
        draggable="true">子对象111</div>
      <div id="p4"
        class="src"
        draggable="true">子对象222</div>
      <div id="p5"
        class="src"
        draggable="true">子对象333</div> -->
      <div v-for="item in state.list"
        :key="'div' + item.id"
        ref="itemsRefs"
        draggable="true"
        class="src"
        @dragstart="dragstart($event)"
        @dragend="dragend($event)"
        @dragenter="dragenter($event)"
        :id="'div' + item.id">
        {{ item.name }}
      </div>
    </div>
  </main>
</template>
<script setup
  lang="ts">
  import { reactive, ref, onMounted } from "vue";

  const state = reactive({
    list: [
      { id: 11, name: '元素1' },
      { id: 22, name: '元素2' },
      { id: 33, name: '元素3' }
    ],

  })
  const itemsRefs = ref([]);
  onMounted(() => {
    // itemsRefs.value.forEach((item: any, index) => {
    //   console.log(`Item ${index}:`, item);
    //   item.ondragstart = function (e) { //开始拖动源对象
    //     console.log(e, '111')
    //     e.dataTransfer.setData('PlaneID', this.id);//保存数据--该img元素的id
    //   }
    //   item.ondrag = function (e) {
    //     // console.log(e, '222')
    //   }
    //   item.ondragend = function (e) {
    //     console.log(e, '333');
    //   }
    // });
  })
  // 拖拽开始事件
  function dragstart(e) {
    console.log(e, 111);
  }
  // 拖拽完成事件
  function dragend(e) {
    console.log(e, 222);
  }
  function dragenter(e) {
    console.log(e, 333)
  }
</script>
<style>
.src {
  width: 50px;
  height: 50px;
  border: 1px solid red;
  margin: 10px;
  cursor: pointer;
}

.box {
  width: 500px;
  height: 500px;
  border: 1px solid yellowgreen;
  display: flex;
}
</style>
