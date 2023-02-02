// 自定义解析表单数据的中间件
const express = require("express");
const qs = require("querystring");

const app = express();

app.use((req, res, next) => {
    let str = '';
    let body = {};
    req.on("data", (chunk) => {
        str += chunk;
    })
    req.on("end", () => {
        body = qs.parse(str);
        req.body = body;
        next();
    })
})

// 监听post请求
app.post('/user', (req, res) => {
    console.log(req, 123);
    res.send(req.body)
})

app.listen("80", () => {
    console.log("express serve running at http://127.0.0.1");
})