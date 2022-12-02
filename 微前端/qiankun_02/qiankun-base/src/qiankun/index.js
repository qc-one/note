// import {
//     initGlobalState
// } from 'qiankun'

export const initState = () => {
    // const allInfoJSON = window.localStorage.getItem('allUserInfo') || '{}';
    // console.log(window);
    // 没初始化过且有数据
    // if (!window.actionsQiankun) {
    //     console.log('开始初始化qiankun');
    //     const allInfo = JSON.parse(allInfoJSON);
    //     console.log(allInfo);
    //     window.actionsQiankun = initGlobalState({
    //         authToken: allInfo.authToken,
    //         appName: '',
    //         eventType: '',
    //         theme: window.localStorage.getItem('theme') || 'dark',
    //         routeParams: {},
    //         subAppOptions: {}
    //     })
    //     window.actionsQiankun.onGlobalStateChange((state, prev) => {
    //         console.log('子应用收到的全量state', state, prev)
    //         // 处理路由跳转navigateto
    //         if (state.eventType === 'NAVIGATETO' && state.routeParams) {
    //             console.log('开始路由跳转', state.routeParams)
    //             // goToRouter(state)
    //         }
    //         // 处理过期
    //         if (state.eventType === 'TOKEN_EXPIRED') {
    //             console.log('登录过期')
    //             // clearLogin()
    //         }
    //     })
    // } else {
    //     console.log('已经初始化了qiankun');
    // }
}
