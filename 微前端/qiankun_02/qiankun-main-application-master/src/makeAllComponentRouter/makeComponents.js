import {
    loadMicroApp
} from 'qiankun'
import Layout from '@/components/layout'
import store from '@/store/index.js'
import router from '@/router/index.js'
import {
    splitUrl
} from '@/utils/qiankunMethods.js'
import {
    getToken
} from '@/utils/auth.js'
const md5 = require('md5')

// 当菜单访问qiankun接入的子系统时，组装对应的路由配置，component为动态加载相应的子系统
export const autoFillComponent = (element = {}, isFromSubApp = false) => {
    console.log(element, 'elementelementelement');
    console.log(isFromSubApp, 'isFromSubAppisFromSubAppisFromSubApp');
    const pathSplit = splitUrl(element.url); //  ['http://10.2.51.5:8081', '/subattr/subattr']
    const host = pathSplit[0]
    const allPath = pathSplit[1]
    const query = pathSplit[2]
    const queryForSearch = {}
    if (query) {
        const queryOnly = query.slice(1)
        console.log(queryOnly, 'queryOnly')
        const tmpFirstArr = queryOnly.split('&')
        for (let index = 0; index < tmpFirstArr.length; index++) {
            const element = tmpFirstArr[index]
            const tmpSecondArr = element.split('=')
            const key = tmpSecondArr[0] || 'errorKey'
            const value = tmpSecondArr[1] || 'errorValue'
            queryForSearch[key] = value
        }
    }
    const splitPath = allPath.split('/')
    const firstPath = splitPath[1]
    // isFromSubApp标识从subApp传来的跳转路由方式，因为qiankun的name必须唯一，
    // 所以防止打开多个基础路由相同详情页的情况下报错(因为name相同), 需要标记id+path 作为唯一的标识。
    // md5防止出现特殊字符
    const identity = isFromSubApp ? `sub${md5(allPath)}` : element.id
    console.log(`/${firstPath}${identity}`, '`/${firstPath}${identity}`');
    return {
        path: `/${firstPath}${identity}`, // /suboriginsub_app  /subattrsub_app2
        meta: {
            title: element.name
        },
        component: Layout,
        children: [{
            path: allPath,
            name: identity,
            component: {
                render: function (h) {
                    // return h(
                    //     'div', {
                    //         attrs: {
                    //             id: identity,
                    //             class: `full-height-and-width`
                    //         }
                    //     },
                    //     [h('div', {
                    //         attrs: {
                    //             class: 'full-height-and-width-spin'
                    //         }
                    //     }, '加载中')]
                    // )
                    /* eslint-disable */
                    return ( < div id = {
                        identity
                    } > < h1 > 123 < /h1> </div > )
                },
                name: identity,
                data() {
                    return {
                        loading: false,
                        microApp: null,
                        routePath: '',
                        name: '',
                        username: ''
                    }
                },
                activated() {
                    console.log('activated subapp')
                    if (this.microApp.update) {
                        this.microApp.update({
                            routePath: this.routePath,
                            lifeCycle: 'onactive'
                        })
                    }
                },
                mounted() {
                    this.initQiankunMicroApp()
                },
                methods: {
                    initQiankunMicroApp() {
                        this.loading = true
                        store.commit('permission/CHANGE_MOUNTED_STATUS', this.loading)
                        console.log('当前qiankun容器的this.$route路由为:', this.$route)
                        const entry = this.$route.meta.qiankunConfig.entry
                        //   如果qiankunconfig有path就从qankun获取 如果没有去 默认的path
                        this.routePath = this.$route.meta.qiankunConfig.routePath || this.$route.path
                        console.log(identity, 'identityidentity');
                        console.log(this.routePath, 'this.routePath');
                        this.microApp = loadMicroApp({
                            name: identity,
                            entry,
                            container: `#${identity}`,
                            props: {
                                routePath: this.routePath,
                                query: queryForSearch,
                                workspaceWindow: window,
                                loginInfo: {
                                    platform: 'WORKSPACE',
                                    type: '2',
                                    authToken: getToken()
                                }
                            }
                        }, {
                            excludeAssetFilter: url => (url.includes('baidu') || url.includes('bdimg'))
                        })
                        this.microApp.mountPromise.then(() => {
                            this.loading = false
                        }).catch((err) => {
                            console.log(err, 'mount sub app fail')
                        }).finally(() => {
                            this.loading = false
                            console.log('子应用 finally')
                            store.commit('permission/CHANGE_MOUNTED_STATUS', this.loading)
                        })
                    }
                },
                beforeDestroy() {
                    console.log('beforeDestroy')
                    store.commit('permission/CHANGE_MOUNTED_STATUS', false)
                    if (this.microApp) {
                        this.microApp.unmount()
                    }
                }
            },
            meta: {
                qiankunConfig: {
                    entry: host
                },
                query,
                title: element.name,
                icon: 'form',
                activeMenu: element.activeMenu
            }
        }]
    }
}
export const addAllRoutes = (fullRouter = []) => {
    store.commit('permission/ADD_DYNAMIC_ROUTES', fullRouter)
    console.log(fullRouter, 'fullRouterfullRouterfullRouter');
    router.addRoutes(fullRouter)
    console.log(router);
}
