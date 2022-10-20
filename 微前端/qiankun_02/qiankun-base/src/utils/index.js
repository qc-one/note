import {
    Message
} from 'element-ui'

const util = {
    // 获取cookie
    getCookieValue(name) {
        name = encodeURI(name);
        var allcookies = document.cookie;
        name += "=";
        var pos = allcookies.indexOf(name);
        if (pos != -1) {
            var start = pos + name.length;
            var end = allcookies.indexOf(";", start);
            if (end == -1) {
                end = allcookies.length;
            }
            var value = allcookies.substring(start, end);
            return (value);
        } else {
            return "";
        }
    },
    // 设置cookie
    setCookie(obj) {
        const {
            key,
            value,
            day,
            domain,
            SameSite
        } = obj;
        var cookie = key + '=' + encodeURIComponent(value);
        if (day > 0) {
            var date = new Date();
            date.setDate(date.getDate() + day);
            cookie += ';expires=' + date;
        }
        if (domain) {
            cookie += ';domain=' + domain;
        }
        if (SameSite) {
            cookie += ';SameSite=' + SameSite + ';Secure';
        }
        document.cookie = cookie;
    },
    // 判断是否是外部链接
    isExternal(path) {
        return /^(https?:|mailto:|tel:)/.test(path)
    },
    /**
     * 拆分子应用地址
     * @params: url-子应用的地址
     * @return: array-包含域名、路径、url参数
     *
     */
    splitUrl(url = '') {
        try {
            const urlObj = new URL(url);
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

}
export default util