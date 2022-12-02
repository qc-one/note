export default {
    // 判断数据类型
    dataType(data) {
        return Object.prototype.toString.call(data).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
    },
    // 深拷贝
    deepClone(obj) {
        let copy;
        if (this.dataType(obj) === 'null' || "number" === this.dataType(obj) || "string" === this.dataType(obj) || this.dataType(obj) === 'undefined' || "boolean" === this.dataType(obj) || "regexp" === this.dataType(obj)) return obj;
        if (this.dataType(obj) === Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        if (this.dataType(obj) === 'array') {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.deepClone(obj[i]);
            }
            return copy;
        }
        if (this.dataType(obj) === 'function') {
            copy = function () {
                return obj.apply(this, arguments);
            }
            return copy;
        }
        if (this.dataType(obj) === 'object') {
            copy = {};
            for (var attr in obj) {
                if (Reflect.has(obj, attr)) copy[attr] = this.deepClone(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
    },
    // 获取地址栏参数
    getUrlSearch(name) {
        let str = location.href; //取得整个地址栏
        // 如果有#存在
        if (str.indexOf("#") !== -1) {
            str = str.substring(str.indexOf("?") + 1, str.indexOf("#"));
        } else {
            str = str.substring(str.indexOf("?") + 1);
        }
        var arr = str.split("&"); //各个参数放到数组里
        let obj = {}
        for (var i = 0; i < arr.length; i++) {
            let num = arr[i].indexOf("=");
            if (num > 0) {
                obj[arr[i].substring(0, num)] = arr[i].substring(num + 1)
            }
        }
        return obj[name]
    },
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
    }
}