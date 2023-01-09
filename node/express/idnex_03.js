const express = require("express");
const router = require("./router/index");
const mw = require('./middleware/mw');

const app = express();

app.use(mw);
// 第一个全局中间件
app.use((req, res, next) => {
    console.log("第一个全局中间件");
    next();
})
// 第二个全局中间件
app.use((req, res, next) => {
    console.log("第二个全局中间件");
    next();
});

app.use(router);

app.listen("80", () => {
    console.log("express serve running at http://127.0.0.1");
})