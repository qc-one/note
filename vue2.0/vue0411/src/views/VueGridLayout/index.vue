<template>
  <div class="draggable">
    <div>官网：https://jbaysolutions.github.io/vue-grid-layout/zh/guide/</div>
    <!-- eslint-disable -->
    <grid-layout :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :verticalCompact="true"
      :use-css-transforms="true">
      <!-- 确保在其他 item 下面，放在第一个的会在最下面 -->
      <grid-item v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        class="backGridItem">
      </grid-item>
      <!-- 真正的layout数据 -->
      <!-- <grid-item v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        :is-draggable="true"
        :is-resizable="true"
        class="gridItem">
      </grid-item> -->
    </grid-layout>
    <!-- <grid-layout :layout.sync="backLayout"
      :col-num="5"
      :row-height="50"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true">
      <grid-item v-for="item in backLayout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        :is-draggable="false"
        :is-resizable="false"
        class="gridItem backGridItem">
        {{ item.i }}123
      </grid-item>
    </grid-layout> -->
  </div>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout";
export default {
  name: "DraggableView",
  components: {
    GridLayout,
    GridItem,
  },
  data() {
    return {
      // 定义栅格系统数据源
      /* eslint-disable */
      layout: [
        { "x": 0, "y": 0, "w": 1, "h": 2, "i": "0" },
        { "x": 2, "y": 0, "w": 2, "h": 4, "i": "1" },
        { "x": 4, "y": 0, "w": 2, "h": 5, "i": "2" },
        { "x": 6, "y": 0, "w": 2, "h": 3, "i": "3" },
        { "x": 8, "y": 0, "w": 2, "h": 3, "i": "4" },
        { "x": 10, "y": 0, "w": 2, "h": 3, "i": "5" },
        { "x": 0, "y": 5, "w": 2, "h": 5, "i": "6" },
        { "x": 2, "y": 5, "w": 2, "h": 5, "i": "7" },
        { "x": 4, "y": 5, "w": 2, "h": 5, "i": "8" },
        { "x": 6, "y": 3, "w": 2, "h": 4, "i": "9" },
        { "x": 8, "y": 4, "w": 2, "h": 4, "i": "10" },
        { "x": 10, "y": 4, "w": 2, "h": 4, "i": "11" },
        { "x": 0, "y": 10, "w": 2, "h": 5, "i": "12" },
        { "x": 2, "y": 10, "w": 2, "h": 5, "i": "13" },
        { "x": 4, "y": 8, "w": 2, "h": 4, "i": "14" },
        { "x": 6, "y": 8, "w": 2, "h": 4, "i": "15" },
        { "x": 8, "y": 10, "w": 2, "h": 5, "i": "16" },
        { "x": 10, "y": 4, "w": 2, "h": 2, "i": "17" },
        { "x": 0, "y": 9, "w": 2, "h": 3, "i": "18" },
        { "x": 2, "y": 6, "w": 2, "h": 2, "i": "19" }
      ],
      // layout: [{ x: 0, y: 0, w: 1, h: 1, i: "0" }],
      backLayout: [
        { x: 0, y: 0, w: 1, h: 1, i: "0" },
        { x: 1, y: 0, w: 1, h: 1, i: "1" },
        { x: 2, y: 0, w: 1, h: 1, i: "2" },
        { x: 3, y: 0, w: 1, h: 1, i: "3" },
        { x: 4, y: 0, w: 1, h: 1, i: "4" },

        { x: 0, y: 1, w: 1, h: 1, i: "10" },
        { x: 1, y: 1, w: 1, h: 1, i: "11" },
        { x: 2, y: 1, w: 1, h: 1, i: "12" },
        { x: 3, y: 1, w: 1, h: 1, i: "13" },
        { x: 4, y: 1, w: 1, h: 1, i: "14" },

        { x: 0, y: 2, w: 1, h: 1, i: "20" },
        { x: 1, y: 2, w: 1, h: 1, i: "21" },
        { x: 2, y: 2, w: 1, h: 1, i: "22" },
        { x: 3, y: 2, w: 1, h: 1, i: "23" },
        { x: 4, y: 2, w: 1, h: 1, i: "24" },

        { x: 0, y: 3, w: 1, h: 1, i: "30" },
        { x: 1, y: 3, w: 1, h: 1, i: "31" },
        { x: 2, y: 3, w: 1, h: 1, i: "32" },
        { x: 3, y: 3, w: 1, h: 1, i: "33" },
        { x: 4, y: 3, w: 1, h: 1, i: "34" },
      ]
    };
  },
};
</script>
<style scoped
  lang="scss">
  .vue-grid-layout {
    border: 1px solid red;

    .gridItem {
      border: solid black 1px;
      background-color: #CCCCCC;
    }

  }

  .box {
    background-color: #031e2c;
    height: 100vh;
  }

  .backGridItem {
    color: #fff;
    border: dashed #ccc 1px;
  }

  .gridItem {
    background-color: green;
  }
</style>
