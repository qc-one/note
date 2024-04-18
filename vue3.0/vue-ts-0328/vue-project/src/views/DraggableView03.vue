<template>
  <div class="drag-box">
    <!-- https://github.com/SortableJS/vue.draggable.next -->
    <!-- 调用组件  -->
    <draggable :list="state.list"
      ref="drag"
      group="people"
      class="test-drag-con-box"
      ghost-class="ghost"
      :move="handleMove"
      @start="handleStart"
      @end="handleEnd"
      item-key="id">
      <template #item="{ element }">
        <div class="test-drag-item">{{ element.name }}</div>
      </template>
    </draggable>
  </div>
</template>
<script setup
  lang="ts">
  import draggable from "vuedraggable"
  import { reactive, ref } from "vue";

  const state = reactive({
    list: [
      {
        id: 1,
        name: "111"
      },
      {
        id: 2,
        name: "222"
      },
      {
        id: 3,
        name: "333"
      },
      {
        id: 4,
        name: "444"
      },
      {
        id: 5,
        name: "555"
      },
      {
        id: 6,
        name: "666"
      },
      {
        id: 7,
        name: "777"
      },
      {
        id: 8,
        name: "888"
      },
      {
        id: 9,
        name: "999"
      },
      {
        id: 10,
        name: "101010"
      },
    ],
    moveStart: {},
    moveEnd: {},
    timer: null
  })
  function handleStart(evt: any) {
    console.log("handleStart", evt)
  }
  function handleEnd(evt: any) {
    console.log("handleEnd", evt);
    // let relatedRow = -1, draggedRow = -1
    // /*start:查询元素*/
    // for (let i = 0; i < state.list.length; i++) {
    //   console.log(i, 'iiii', draggedRow, relatedRow)
    //   if (draggedRow !== -1 && relatedRow !== -1) break
    //   if (draggedRow === -1 && state.list[i][state.moveStart.index] === state.moveStart.element) {
    //     draggedRow = i
    //   }
    //   if (relatedRow === -1 && state.list[i][state.moveEnd.index] === state.moveEnd.element) {
    //     relatedRow = i
    //   }
    // }
    // state.list[draggedRow], state.moveStart.index, state.moveEnd.element
    // state.list[relatedRow], state.moveEnd.index, state.moveStart.element
    console.log(state, 'state')
    clearTimeout(state.timer)
    if (Object.keys(state.moveStart).length && Object.keys(state.moveEnd).length) {
      state.list.splice(state.moveStart.index, 0, {
        id: 11, name: 'qin'
      })
    }
  }
  function handleMove(evt: any) {
    console.log("handleMove", evt)
    if (state.timer) {
      clearTimeout(state.timer)
    }
    state.timer = setTimeout(() => {
      console.log(111)
      state.moveStart = { element: evt.draggedContext.element, index: evt.draggedContext.index }
      state.moveEnd = { element: evt.relatedContext.element, index: evt.relatedContext.index }
    }, 3000)
    state.moveStart = {}
    state.moveEnd = {}
    return true
  }

</script>
<style scoped>
.test-drag-con-box {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid blue;
  width: 500px;
}

.test-drag-item {
  width: 200px;
  height: 100px;
  border: 1px solid red;
}
</style>
