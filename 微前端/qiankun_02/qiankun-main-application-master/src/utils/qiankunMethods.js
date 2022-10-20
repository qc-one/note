import {
    Message
} from 'element-ui'
/**
 * @params: url-子应用的地址
 * @return: array-包含域名、路径、url参数
 * 
 */
export const splitUrl = (url = '') => {
    try {
        const urlObj = new URL(url)
        // {
        //     hash: "#/subattr/subattr"
        //     host: "10.2.51.5:8081"
        //     hostname: "10.2.51.5"
        //     href: "http://10.2.51.5:8081/#/subattr/subattr"
        //     origin: "http://10.2.51.5:8081"
        //     password: ""
        //     pathname: "/"
        //     port: "8081"
        //     protocol: "http:"
        //     search: ""
        //     searchParams: URLSearchParams {}
        //     username: ""
        // }
        const origin = urlObj.origin
        // 如果是hash模式
        if (urlObj.hash) {
            const hashPath = urlObj.hash.slice(1)
            // 有查询参数拆分
            if (hashPath.includes('?')) {
                // 拆分查询参数和path
                const pathAnQueryArr = hashPath.split('?')
                const hasPathOnly = pathAnQueryArr[0]
                const query = `?${pathAnQueryArr[1]}`
                return [origin, hasPathOnly, query]
            } else {
                return [origin, hashPath]
            }
        }
        if (urlObj.pathname) {
            if (urlObj.search) {
                return [origin, urlObj.pathname, urlObj.search]
            } else {
                return [origin, urlObj.pathname]
            }
        }
    } catch (error) {
        Message.error(`解析菜单url失败,非法的url为：${url}`)
        return [window.location.origin, `/unknown${Math.random() * 100}`]
    }
}
