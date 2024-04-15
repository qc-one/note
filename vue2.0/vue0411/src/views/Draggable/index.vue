<template>
  <div class="draggable">
    Draggable
    <Draggable v-model="list">
      <div v-for="(item, index) in list" :key="index">
        <component :is="item"></component>
      </div>
    </Draggable>
    <div>不能动</div>
  </div>
</template>

<script>
import DraggableOne from "@/components/Draggable/test01.vue";
import DraggableTwo from "@/components/Draggable/test02.vue";
import Draggable from "vuedraggable";
export default {
  name: "DraggableView",
  components: {
    DraggableOne,
    Draggable,
    DraggableTwo,
  },
  data() {
    return {
      list: ["DraggableOne", "DraggableTwo"],
    };
  },
};
</script>
