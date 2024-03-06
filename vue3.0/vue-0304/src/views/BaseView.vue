<template>
    <div class="base">
        <h1>This is an base page</h1>
        <h1>姓名：{{ name }}</h1>
        <h1>年龄：{{ age }}</h1>
        <h2>职业：{{ job.occupation }}</h2>
        <h3>爱好：{{ hobby[0] }},{{ hobby[1] }},{{ hobby[2] }}</h3>
        <h2>薪资：{{ job.salary }}</h2>
        <button @click="say">修改</button>
        <h2>{{ a }}</h2>
        <button @click="changeName">改变值</button>
        <h2>obj{{ obj.brand }}</h2>
        <div v-for="item in items" v-if="item === 2">{{ item }}</div>
    </div>
</template>
<script setup>
import { ref, reactive, watch, watchEffect, toRef, toRefs } from "vue";

let name = ref("燕儿");
let age = ref(18);
let job = reactive({
    occupation: "程序员",
    salary: "10k",
});
console.log(name);
console.log(age);
console.log(job, "job");
let a = ref(123);
let hobby = reactive(["刷剧", "吃鸡", "睡觉"]);
//方法
function say() {
    name.value = "苒苒";
    age.value = 20;
    job.salary = "12k";
    hobby[0] = "学习";
    obj.brand.name = "奔驰";
}
watch(age, (newVal, oldVal) => {
    console.log(newVal, oldVal, "age变了");
});
watch(
    job,
    (newVal, oldVal) => {
        console.log(newVal, oldVal, "job变了");
    },
    {
        // deep: true,
    }
);
watch(
    hobby,
    (newVal, oldVal) => {
        console.log(newVal, oldVal, "hobby变了");
    },
    {
        deep: true,
    }
);
watchEffect(() => {
    console.log(111);
    // console.log(newVal, oldVal, "job变了111");
    // console.log(job, 111);
    // console.log("watchEffect111", newVal, oldVal);
});

const obj = reactive({
    name: "zs",
    age: 14,
    brand: {
        id: 1,
        name: "宝马",
    },
});
const changeName = () => {
    obj.name = "ls";
    obj.brand.name = "奔驰";
    obj.brand.price = 1000;
};
watch(
    obj,
    () => {
        console.log("监听的obj.name改变了");
        console.log("监听的obj.brand.name改变了");
    },
    {
        // deep: true,
        // immediate: true,
    }
);

var student = reactive({
    name: "张三",
    age: 15,
    contact: {
        phone: "18714896998",
        qq: "103422412",
        email: "wm218@qq.com",
    },
});
// toRefs
var info = toRefs(student);
// 这种调用方式等同于直接调用student的结构
console.log(info.name.value, "info.name.value"); // 此时info结构：{name: ..., age: ..., contace: ...}
console.log(info.contact.value);
// 常用于组件、函数返回动态响应式变量
var getInfo = function () {
    return { ...toRefs(student) };
};
console.log(getInfo().name.value, getInfo().contact.value.qq);

let items = ref([2, 4, 5, 3]);
</script>
