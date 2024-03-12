<template>
    <div class="home">
        <h1>home---{{ a }}</h1>
    </div>
    <div>1234</div>
    <div class="about">
        <div class="scrollView" @scroll="onScroll" ref="listRef">
            <!-- 虚拟列表 -->
            <div
                class="virtualScroller"
                :style="{ height: listHeight + 'px' }"
            ></div>
            <div
                class="list"
                :style="{ transform: `translateY(${startOffset}px)` }"
            >
                <div class="item" v-for="item in state.list" :key="item">
                    {{ item }}
                </div>
            </div>
        </div>
        <div v-for="item in arr" :key="item">
            {{ item }}
        </div>
        <button @click="changeArr">changeArr</button>
    </div>
</template>

<script>
import {
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
} from "vue";

export default {
    name: "HomeView",
    components: {},
    beforeCreate() {
        console.log("beforeCreate");
    },
    data() {
        return {
            a: "aaa",
        };
    },
    created() {
        console.log("created");
    },
    beforeMount() {
        console.log("beforeMount");
    },
    mounted() {
        console.log("mounted");
    },
    beforeUpdate() {
        console.log("beforeUpdate");
    },
    updated() {
        console.log("updated");
    },
    beforeDestroy() {
        console.log(beforeDestroy);
    },
    setup(props, context) {
        console.log(props, context);
        console.log("setup");
        onBeforeMount(() => {
            console.log("onBeforeMount");
        });
        onMounted(() => {
            console.log("onMounted");
        });
        onBeforeUpdate(() => {
            console.log("onBeforeUpdate");
        });
        onUpdated(() => {
            console.log("onUpdated");
        });
        onBeforeUnmount(() => {
            console.log("onBeforeUnmount");
        });
        onUnmounted(() => {
            console.log("onUnmounted");
        });
        // 创建一个响应式的计数器
        // const count = ref(props.initialCount || 0);
        // // 定义一个增加计数的方法
        // const increment = () => {
        //     count.value++;
        // };
        // console.log(count.value, 111);
        const a = ref("aaaa");

        let list = ref([]);
        let listHeight = ref(0);
        let itemSize = ref(50);
        let containerHeight = ref(300);
        let data = ref([]);
        let listRef = ref(null);
        const total = 100000;
        let startOffset = ref(100);
        let state = reactive({
            list: [],
            data: [],
        });

        for (let i = 0; i < total; i++) {
            // list.value.push(i);
            state.list.push(i);
        }
        // data.value = list.value;
        state.data = state.list;
        // list.value = list.value.slice(0, 6);
        state.list = state.list.slice(0, 6);
        // listHeight = list.length * itemSize.value;
        listHeight = state.list.length * itemSize.value;
        function onScroll() {
            console.log(123);
            //当前滚动位置
            let scrollTop = listRef.value.scrollTop;
            // 列表开始索引
            let startIndex = Math.floor(scrollTop / itemSize.value);
            console.log(startIndex, "startIndex");
            // 列表结束索引
            let endIndex = Math.ceil(
                (scrollTop + containerHeight.value) / itemSize.value
            );
            // list.value = data.value.slice(startIndex, endIndex);
            state.list = state.data.slice(startIndex, endIndex);
            // 列表移动距离
            startOffset = scrollTop - (scrollTop % itemSize.value);
            console.log(state.list, "list");
        }

        let arr = ref([1, 2, 3]);
        function changeArr() {
            arr.value = [4, 5, 6];
            console.log(arr, "arr");
        }

        return {
            // count,
            // increment,
            a,
            // list,
            state,
            listHeight,
            listRef,
            startOffset,
            arr,
            onScroll,
            changeArr,
        };
    },
};
</script>
<style>
.scrollView {
    width: 200px;
    height: 300px;
    background-color: red;
    overflow-y: scroll;
    position: relative;
}
.item {
    height: 50px;
}
.list {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
