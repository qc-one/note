import router from '@/router/index.js'
import {
    removeToken
} from '@/utils/auth'
let disable = false
export const clearLogin = () => {
    if (!disable) {
        disable = true
        console.log('开始执行removeToken-tokenExpired')
        removeToken()
        router.push('/login')
    }
    setTimeout(() => {
        disable = false
    }, 1500)
}
