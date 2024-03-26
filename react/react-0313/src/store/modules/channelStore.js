import { createSlice } from "@reduxjs/toolkit";

// 创建store
const counterStore = createSlice({
    name: "channel",
    // 初始化state
    initialState: {
        channel: [],
    },
    // 修改状态的方法 同步方法 支持直接修改
    reducers: {
        setChannels(state, action) {
            state.channel = action.payload.channel;
        },
    },
});

// 解构出来actionCreater函数
const { setChannels } = counterStore.actions;

// 创建异步函数
const fetchChannels = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(
                setChannels({
                    channel: [2, 3, 4],
                })
            );
        }, 3000);
    };
};

// 获取reducer
const reducer = counterStore.reducer;

export { fetchChannels };

// 以默认导出的方式导出reducer
export default reducer;
