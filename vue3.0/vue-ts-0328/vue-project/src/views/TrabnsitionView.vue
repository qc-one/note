<template>
  <div class="transition">
    <button @click="showOneEle">展示第一个</button>
    <button @click="showTwoEle">展示第二个</button>
    <div class="test-box">
      <div :class="['one-box', showOne ? 'showOne' : 'hideOne']">
        <div v-if="showOne">11111</div>

      </div>
      <div :class="['two-box', showTwo ? 'showTwo' : 'hideTwo']">
        <div v-if="showTwo">222222</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showOne = ref(true)
const showTwo = ref(false)
let timeA = null
let timeB = null
const showOneEle = throttle(() => {
  console.log(1)
  showTwo.value = false
  if (timeA) clearTimeout(timeA)
  timeA = setTimeout(() => {
    showOne.value = true
  }, 500)
}, 1000)
const showTwoEle = throttle(() => {
  console.log(2)
  showOne.value = false
  if (timeB) clearTimeout(timeB)
  timeB = setTimeout(() => {
    showTwo.value = true
  }, 500)
}, 1000)

function throttle(fn, interval) {
  let timer = null; // 定时器
  let firstTime = true; // 判断是否是第一次执行
  // 利用闭包
  return function () {
    // 拿到函数的参数数组
    let args = Array.prototype.slice.call(arguments, 0);
    // 拿到当前的函数作用域
    let _this = this;
    // 如果是第一次执行的话，需要立即执行该函数
    if (firstTime) {
      // 通过apply，绑定当前函数的作用域以及传递参数
      fn.apply(_this, args);
      // 修改标识为null，释放内存
      firstTime = null;
    }
    // 如果当前有正在等待执行的函数则直接返回
    if (timer) return;
    // 开启一个倒计时定时器
    timer = setTimeout(function () {
      // 通过apply，绑定当前函数的作用域以及传递参数
      // fn.apply(_this, args);
      // 清除之前的定时器
      timer = null;
      // 默认300ms执行一次
      firstTime = true;
    }, interval || 1000)
  }
}
</script>

<style scoped>
.test-box {
  width: 500px;
  height: 500px;
  background-color: #ffffff;
  overflow: hidden;
}

.one-box,
.two-box {
  width: 500px;
  height: 300px;
  color: #ffffff;
  transition: transform 0.5s ease-in;
}

.hideOne {
  transform: translateY(-300px);
}

.showOne {
  transform: translateY(0px);
}

.hideTwo {
  transform: translateY(-600px);
}

.showTwo {
  transform: translateY(-300px);
}

.one-box {
  background-color: red;
}

.two-box {
  background-color: blue;
}
</style>
