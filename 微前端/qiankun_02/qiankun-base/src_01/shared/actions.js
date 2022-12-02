import {
    initGlobalState,
} from 'qiankun';

let state = {
    nick_name: "乾坤"
}
// 初始化 state
const actions = initGlobalState(state);
export default actions;