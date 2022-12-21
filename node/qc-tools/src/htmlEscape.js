// 定义转义html字符的函数
function htmlEscape(htmlStr) {
    return htmlStr.replace(/<|>|"|&/g, (match) => {
        switch (match) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "&":
                return "&amp;";
        }
    })
}
// 定义转义str为html的函数
function htmlUnEscape(str) {
    return str.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
        switch (match) {
            case "&lt;":
                return "<";
            case "&gt;":
                return ">";
            case '&quot;':
                return '"';
            case "&amp;":
                return "&";
        }
    })
}

modules.export = {
    htmlEscape,
    htmlUnEscape
}