import { createSlice } from "@reduxjs/toolkit";

// 创建store
const counterStore = createSlice({
    name: "counter",
    // 初始化state
    initialState: {
        countS: 0,
    },
    // 修改状态的方法 同步方法 支持直接修改
    reducers: {
        inscrement(state, action) {
            state.countS = state.countS + action.payload.num;
        },
        decrement(state, action) {
            state.countS = state.countS - action.payload.num;
        },
    },
});

// 解构出来actionCreater函数
const { inscrement, decrement } = counterStore.actions;
// 获取reducer
const reducer = counterStore.reducer;

// 以按需导出的方式导出actionCreater
export { inscrement, decrement };
// 以默认导出的方式导出reducer
export default reducer;
