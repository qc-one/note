<template>
  <div id="app">
    <!-- <router-view /> -->
    <!-- eslint-disable -->
    <div>
      <div class="folder"
        v-for="(folder, index) in   folders  "
        :key="folder.id"
        :style="{
          left: folder.position.x + 'px',
          top: folder.position.y + 'px'
        }"
        @dragover.prevent
        @drop="mergeFolders(index, $event)">
        <div class="item"
          v-for="  item   in   folder.items  "
          :key="item"
          draggable
          @dragstart="dragStart(item, $event)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      folders: [
        {
          id: 1,
          position: { x: 20, y: 20 },
          items: ["File 1", "File 2"],
        },
        {
          id: 2,
          position: { x: 150, y: 70 },
          items: ["File 3"],
        },
      ],
      draggedItem: null,
      draggedFolderIndex: null,
    };
  },
  methods: {
    dragStart(item, event) {
      this.draggedItem = item;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", item);
    },
    mergeFolders(index, event) {
      const folder = this.folders[index];
      const item = event.dataTransfer.getData("text/plain");
      if (item && folder.items.indexOf(item) === -1) {
        folder.items.push(item);
      }
    },
  },
};
</script>

<style>
.folder {
  position: absolute;
  width: 200px;
  border: 1px solid #000;
  padding: 10px;
}

.item {
  padding: 5px;
  border: 1px dashed #ddd;
  margin: 5px 0;
  cursor: move;
}
</style>
