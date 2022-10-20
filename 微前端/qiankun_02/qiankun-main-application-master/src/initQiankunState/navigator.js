import {
    Message
} from 'element-ui'
import {
    autoFillComponent,
    addAllRoutes
} from '@/makeAllComponentRouter/makeComponents.js'
import router from '@/router/index.js'
export const goToRouter = (state) => {
    if (!state.routeParams.name) {
        Message({
            message: '缺少路由name，请联系管理员',
            type: 'error',
            duration: 3 * 1000
        })
        return
    }
    if (!state.routeParams.url) {
        Message({
            message: '缺少路由url，请联系管理员',
            type: 'error',
            duration: 3 * 1000
        })
        return
    }
    const fullRouter = autoFillComponent(state.routeParams, true)
    const firstChild = fullRouter.children[0] || {}
    // 取query
    const queryStr = firstChild.meta.query || ''
    const urlSearchParams = new URLSearchParams(queryStr)
    const query = Object.fromEntries(urlSearchParams.entries())
    console.log('urlquery', query)
    // 这里生成的fullRouter如果是重复的子应用路由，id一样，且查询参数一样，那么addAllRoutes的时候
    // 执行router.addRoutes方法时因为name一致会先删除前一个同name的路由，但是不会对跳转造成影响，但是要知道这个逻辑
    // 但是在addAllRoute里面手动设置ADD_DYNAMIC_ROUTE时，也会造成重复的影响，
    addAllRoutes([fullRouter])
    // 除了正常加入全量动态路由外，考虑到subApp给的临时路由会存在刷新页面的情况，所以需要收集上传的路由到本地，
    // 然后刷新页面初始化路由的时候再把本地临时路由加回去
    const tempRouteJson = window.localStorage.getItem('tempRouteJson')
    const tempRoute = tempRouteJson ? JSON.parse(tempRouteJson) : []
    let routeHasExist = false
    for (let index = 0; index < tempRoute.length; index++) {
        const element = tempRoute[index] || {}
        if (element.url === state.routeParams.url) {
            routeHasExist = true
            break
        }
    }
    if (!routeHasExist) {
        tempRoute.push(state.routeParams || {})
    }
    window.localStorage.setItem('tempRouteJson', JSON.stringify(tempRoute))

    router.push({
        path: firstChild.path,
        query
    })
}
