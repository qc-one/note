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
    }
}
export default util