<template>
  <main>
    <!-- https://github.com/SortableJS/vue.draggable.next -->
    <!--使用draggable组件-->
    <div class="itxst">
      <div class="col">
        <div class="title">国内网站</div>
        <draggable v-model="arr1"
          handle=".move"
          filter=".forbid"
          :force-fallback="true"
          chosen-class="chosenClass"
          :fallback-class="true"
          :fallback-on-body="true"
          :touch-start-threshold="50"
          :fallback-tolerance="50"
          :move="onMove"
          group="site"
          animation="300"
          @start="onStart"
          @end="onEnd">
          <template #item="{ element }">
            <transition-group>
              <span>
                <div class="item"
                  v-for="item in arr1"
                  :key="item.id">{{ item.name }}</div>
              </span>
            </transition-group>
          </template>
        </draggable>
      </div>
      <div class="col">
        <div class="title">你可以把左边的元素拖到右边</div>
        <draggable v-model="arr2"
          group="site"
          animation="100"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
          @start="onStart"
          @end="onEnd">
          <template #item="{ element }">
            <transition-group>
              <span>
                <div class="item"
                  v-for="item in arr2"
                  :key="item.id">{{ item.name }}</div>
              </span>
            </transition-group>
          </template>
        </draggable>
      </div>
    </div>
  </main>
</template>
<script setup
  lang="ts">
  import Draggable from "vuedraggable"
  import { reactive, ref } from "vue";

  // const drag = ref(false)
  const arr1 = reactive([
    { id: 1, name: 'www.itxst.com' },
    { id: 2, name: 'www.jd.com' },
    { id: 3, name: 'www.baidu.com' },
    { id: 4, name: 'www.taobao.com' }
  ])
  const arr2 = reactive([
    { id: 1, name: 'www.google.com' },
    { id: 2, name: 'www.msn.com' },
    { id: 3, name: 'www.ebay.com' },
    { id: 4, name: 'www.yahoo.com' }
  ])
  //拖拽开始的事件
  function onStart() {
    console.log("开始拖拽");
  }
  //拖拽结束的事件
  function onEnd() {
    console.log("结束拖拽");
  }
  function onMove(e) {
    //不允许停靠
    if (e.relatedContext.element.disabledPark == true) return false;
    return true;
  }
</script>
<style>
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
  padding-right: 100px;
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
