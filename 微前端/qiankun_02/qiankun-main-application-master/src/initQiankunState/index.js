import {
    initGlobalState
} from 'qiankun'
import {
    goToRouter
} from './navigator.js'
import {
    clearLogin
} from '@/utils/tokenExpired.js'

export const initState = function () {
    console.log('开始初始化state')
    const allInfoJSON = window.localStorage.getItem('allUserInfo') || '{}'
    // 没初始化过且有数据
    if (!window.actionsQiankun) {
        console.log('没有初始化state');
        const allInfo = JSON.parse(allInfoJSON)
        window.actionsQiankun = initGlobalState({
            authToken: allInfo.authToken,
            appName: '',
            eventType: '',
            theme: window.localStorage.getItem('theme') || 'dark',
            routeParams: {},
            subAppOptions: {}
        })
        window.actionsQiankun.onGlobalStateChange((state, prev) => {
            console.log('子应用收到的全量state', state)
            // 处理路由跳转navigateto
            if (state.eventType === 'NAVIGATETO' && state.routeParams) {
                console.log('开始路由跳转', state.routeParams)
                goToRouter(state)
            }
            // 处理过期
            if (state.eventType === 'TOKEN_EXPIRED') {
                console.log('登录过期')
                clearLogin()
            }
        })
        console.log(window.actionsQiankun, 'window.actionsQiankun');
    } else {
        console.log('已经初始化过state')
    }
}
