<template>
    <div>
        <h1>我是mall组件</h1>
        <button @click="changData">改变数据</button>
        <h1 v-for="(v,i) in add" :key="i">{{v}}</h1>
    </div>
</template>
<script>
export default {
    name: "Mall",
    data() {
        return {
          add: [1]
        };
    },
    methods: {
      changData() {
        // this.add[0] = 2;
        this.add = [2];
        console.log(this.add);
      }
    }
};
</script>