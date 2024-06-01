<template>
  <div>
    <div class="itxst">
      <div class="col">
        <div class="title">拖拽到B组试试看,小于4个元素不允许拖拽</div>
        <draggable v-model="state.arr1"
          :group="state.groupA"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass">
          <template #item="{ element }">
            <transition :style="state.style">
              <div class="item"
                :key="element.id">
                {{ element.name }}
              </div>
            </transition>
          </template>
        </draggable>
      </div>
      <div class="col">
        <div class="title">B组（本组是个空数组）</div>
        <draggable v-model="state.arr2"
          :group="state.groupB"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass">
          <template #item="{ element }">
            <transition :style="state.style">
              <div class="item"
                :key="element.id">
                {{ element.name }}
              </div>
            </transition>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script setup
  lang="ts">
  import { reactive } from 'vue';
  import draggable from "vuedraggable"

  const state = reactive({
    drag: false,
    message: "",
    groupA: {
      name: "itxst",
      put: true, //可以拖入
      pull: () => {
        if (state.arr1.length <= 3) {
          state.message = "元素小于等于3不允许再拖拽了";
        }
        return state.arr1.length > 3;
      },
    },
    groupB: {
      name: "itxst",
      pull: "clone", //B组拖拽时克隆到A组
      put: true,
    },
    //定义要被拖拽对象的数组
    arr1: [
      { id: 1, name: "www.itxst.com" },
      { id: 2, name: "www.jd.com" },
      { id: 3, name: "www.baidu.com" },
      { id: 4, name: "www.taobao.com" },
    ],
    arr2: [], //空数组
    arr3: [], //空数组
    //空数组之在的样式，设置了这个样式才能拖入
    style: "min-height:120px;display: block;",
  });
  //开始拖拽事件
  function onStart() {
    state.drag = true;
    return true;
  }
  //拖拽结束事件
  function onEnd() {
    state.drag = false;
  }

</script>
<style scoped>
/*定义要拖拽元素的样式*/
.ghostClass {
  background-color: blue !important;
}

.chosenClass {
  background-color: red !important;
  opacity: 1 !important;
}

.dragClass {
  background-color: blueviolet !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}

.itxst {
  margin: 10px;
  min-height: 200px;
}

.title {
  padding: 6px 12px;
}

.col {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}

.col+.col {
  margin-left: 10px;
}

.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
}

.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}

.item+.item {
  border-top: none;
  margin-top: 6px;
}
</style>
