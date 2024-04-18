<template>
  <main>
    <ul>
      <li v-for="(item, index) in state.list"
        :key="item.id"
        :draggable="true"
        @dragstart="dragStart(index)"
        @dragenter.prevent
        @dragover.prevent
        @dragenter="dragEnter(index)">
        {{ item.title }}
      </li>
    </ul>
  </main>
</template>
<script setup
  lang="ts">
  import { reactive } from 'vue';

  const state = reactive({
    list: [
      { id: 1, title: 'Item 1' },
      { id: 2, title: 'Item 2' },
      { id: 3, title: 'Item 3' },
      { id: 4, title: 'Item 4' },
      { id: 5, title: 'Item 5' }
    ],
    dragIndex: null
  });

  const dragStart = (index) => {
    state.dragIndex = index;
  }

  const dragEnter = (index) => {
    if (state.dragIndex !== null && state.dragIndex !== index) {
      const dragItem = state.list[state.dragIndex];
      const targetItem = state.list[index];
      const isAfter = state.dragIndex < index;
      state.list.splice(state.dragIndex, 1);
      state.list.splice(isAfter ? index - 1 : index, 0, dragItem);
      state.dragIndex = isAfter ? index : index - 1;
    }
  };

</script>
<style></style>
