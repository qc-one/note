// 自定义解析表单数据的中间件
const qs = require("querystring");

function bodyParse(req, res, next) {
    let str = '';
    req.on("data", (chunk) => {
        str += chunk;
    })
    req.on("end", () => {
        req.body = qs.parse(str);
        next();
    })
}

module.exports = bodyParse