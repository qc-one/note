// request.js

import axios from 'axios'
import Vuex from '@/store/index'
import actions from '@/actions.js'
// 动态获取origin
const origin = window.__POWERED_BY_QIANKUN__ ? window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ : window.location.origin
const servies = axios.create({
    baseURL: origin,
    withCredentials: true // 允许携带cookie
})
servies.interceptors.request.use(
    config => {
        config.headers['AUTH-TOKEN'] = Vuex.state.qiankun.authToken
        return config
    },
    () => {
        return Promise.reject()
    }
)
// 登录失效上报到workspace做退出登录处理
servies.interceptors.response.use(
    response => {
        if (response.data.code === 401) {
            actions.setGlobalState({
                appName: 'subapp', // 记得更改成自己的子应用名称
                eventType: 'TOKEN_EXPIRED'
            })
        }
    },
    error => {
        return Promise.reject(error)
    }
)
