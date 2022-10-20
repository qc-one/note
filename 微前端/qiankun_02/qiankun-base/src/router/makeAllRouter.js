// 抽出所有的tree结构的最后一层动态路由，做flat处理，然后拼装成qinakun模式。
function makePathArr(menus = []) {
    const pathArrTemp = []
    // 第一层
    for (let firstIndex = 0; firstIndex < menus.length; firstIndex++) {
        const firstElement = menus[firstIndex]
        if (firstElement.url && firstElement.id && firstElement.name) {
            pathArrTemp.push(firstElement)
        }
    }
    return pathArrTemp
}

export const makeAllRouter = () => {
    // const fullRouter = []
    const userInfo = JSON.parse(window.localStorage.getItem('allUserInfo') || '{}')
    // const preLoadArr = []
    if (userInfo.menus) {
        const pathArr = makePathArr(userInfo.menus)
        console.log('pathArr:', pathArr)
        // for (let index = 0; index < pathArr.length; index++) {
        //     // 拼接成qianku专属路由
        //     const element = pathArr[index]
        //     const fullSingleRouter = autoFillComponent(element)
        //     fullRouter.push(fullSingleRouter)
        //     // 预加载
        //     const pathSplit = splitUrl(element.url)
        //     const host = pathSplit[0]
        //     preLoadArr.push(host)
        // }
    } else {
        console.log('未登录或者已经初始化过router')
    }
}
