<template>
  <!-- eslint-disable -->
  <div class="draggable">
    <div class="itxst">
      <div class="col">
        <div class="title">拖拽到B组试试看,小于4个元素不允许拖拽</div>
        <draggable v-model="arr1"
          :group="groupA"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          @end="onEnd"
          @clone="onClone"
          @add="add1"
          chosenClass="chosenClass">
          <transition-group :style="style">
            <div class="item"
              v-for="item in arr1"
              :key="item.id">
              {{ item.name }}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="col">
        <div class="title">B组（本组是个空数组）</div>
        <draggable v-model="arr2"
          :group="groupB"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          @end="onEnd"
          @clone="onClone"
          @add="add2"
          chosenClass="chosenClass">
          <!-- <transition-group :style="style">
            <div class="item"
              v-for="item in arr2"
              :key="item.id">
              {{ item.name }}
            </div>
          </transition-group> -->
        </draggable>
      </div>
      <!-- <div class="col">
        <div class="title">B组（本组是个空数组）</div>
        <draggable v-model="arr3"
          :group="groupB"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          @end="onEnd"
          @clone="onClone"
          @add="add2"
          chosenClass="chosenClass">
          <transition-group :style="style">
            <div class="item"
              v-for="item in arr2"
              :key="item.id">
              {{ item.name }}
            </div>
          </transition-group>
        </draggable>
      </div> -->
    </div>
    <div style="display: block">{{ message }}</div>
    <!-- <div class="drag-content">
      <div draggable="true"
        v-drag:parent="parentElement">
        <slot name="dragHeader" />
      </div>
      <slot name="dragContainer" />
    </div> -->
  </div>
</template>

<script>
// eslint-disable
import draggable from "vuedraggable";
export default {
  name: "DraggableView",
  components: {
    draggable,
  },
  props: ['parentElement'],
  directives: {
    drag: {
      //inserted表示被绑定元素插入父节点时调用。只调用了一次
      inserted(el, bindings) {
        // 获取规定范围的dom元素
        function getParentDom(parentDom) {
          if (typeof parentDom === 'string') {
            return document.querySelector(parentDom)
          }
          return parentDom
        }
        let parentDom = getParentDom(bindings.value) // 规定活动范围的dom元素
        let CurrentDiv = el //当前元素
        let parentDiv = el.parentNode // 可拖拽元素的根元素
        let isMouseDown = false
        CurrentDiv.onmousedown = function (e) {
          // 鼠标的手型
          CurrentDiv.style.cursor = 'move'
          isMouseDown = true
          if (parentDom === null) {
            parentDom = getParentDom(parentDom)
          } else {
            //记录原始坐标
            let disX = e.clientX
            let disY = e.clientY
            document.onmousemove = function (event) {
              if (isMouseDown) {
                //计算规定范围内Dom元素的宽高度
                let parentDomWidth = parentDom.offsetWidth
                let parentDivWidth = parentDiv.offsetWidth
                let parentDomHeight = parentDom.offsetHeight
                let parentDivHeight = parentDiv.offsetHeight
                //返回规定活动范围的dom元素的大小及其相对于视口的位置
                let parentDomClientRect = parentDom.getBoundingClientRect()
                let parentDomPositionLeft = parentDomClientRect.left
                let parentDomPositionRight = parentDomClientRect.right
                let parentDomPositionTop = parentDomClientRect.top
                let parentDomPositionBottom = parentDomClientRect.bottom
                // //返回可拖拽元素的范围的dom元素的大小及其相对于视口的位置
                let parentDivClientRect = parentDiv.getBoundingClientRect()
                let parentDivPositionLeft = parentDivClientRect.left
                let parentDivPositionRight = parentDivClientRect.right
                let parentDivPositionBottom = parentDivClientRect.bottom
                let startX = event.clientX
                let startY = event.clientY
                //拖拽元素的相对偏移量
                let parentDivOffLeft = parentDiv.offsetLeft
                let parentDivOffTop = parentDiv.offsetTop
                //通过事件委托，计算移动的距离
                let l = startX - disX
                let t = startY - disY
                //左右拖拽
                parentDiv.style.left = parentDivOffLeft + l + 'px'
                //上下拖拽
                parentDiv.style.top = parentDivOffTop + t + 'px'
                // 猛拖修正
                //猛拖左边后的相对视口的位置
                if (parentDivPositionLeft < parentDomPositionLeft) {
                  parentDiv.style.left = 0
                }
                //猛拖右边后的相对视口的位置
                if (parentDivPositionRight > parentDomPositionRight) {
                  parentDiv.style.left = parentDomWidth - parentDivWidth + 'px'
                }
                //猛拖顶部边后的相对视口的位置
                let nowParentDivTop = parentDiv.getBoundingClientRect().top
                if (nowParentDivTop < parentDomPositionTop) {
                  parentDiv.style.top = 0;
                }
                //猛拖顶部后的相对视口的位置
                if (parentDivPositionBottom > parentDomPositionBottom) {
                  parentDiv.style.top = parentDomHeight - parentDivHeight + 'px';
                }

                //每一次拖拽后都要更新上一个的坐标
                disX = startX;
                disY = startY;
              };
              event.preventDefault(); //移动时禁用默认事件
            };
          };
          document.onmouseup = function (events) {
            //清空
            isMouseDown = false;
            document.onmousemove = null;
            document.onmousedown = null;
          };
        };
      },
    },
  },
  data() {
    return {
      drag: false,
      message: "",
      groupA: {
        name: "itxst",
        put: true, //可以拖入
        pull: () => {
          if (this.arr1.length <= 3) {
            this.message = "元素小于等于3不允许再拖拽了";
          }
          return this.arr1.length > 3;
        },
      },
      groupB: {
        name: "itxst",
        pull: "clone", //B组拖拽时克隆到A组
        put: true,
      },
      //定义要被拖拽对象的数组
      arr1: [
        { id: 1, name: "111" },
        { id: 2, name: "222" },
        { id: 3, name: "333" },
        { id: 4, name: "444" },
        { id: 5, name: "555" },
        { id: 6, name: "666" },
        { id: 7, name: "777" },
        { id: 8, name: "888" },
        { id: 9, name: "999" },
      ],
      arr2: [], //空数组
      arr3: [], //空数组
      //空数组之在的样式，设置了这个样式才能拖入
      style: "min-height:120px;display: block;",
    };
  },
  methods: {
    //开始拖拽事件
    onStart() {
      this.drag = true;
      return true;
    },
    //拖拽结束事件
    onEnd(e) {
      console.log("end", e, this.arr2);
      this.drag = false;
    },
    onClone(e) {
      console.log("onClone", e);
    },
    //拖拽完成事件
    add1(e) {
      console.log("add1", e);
    },
    add2(e) {
      console.log("add2", e);
    },
  },
};
</script>
<style>
/*定义要拖拽元素的样式*/
/* eslint-disable */
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

.col,
.col {
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

.item,
.item {
  border-top: none;
  margin-top: 6px;
}
</style>
