const express = require("express");

const app = express();

// 监听get请求
// 参数1：客户端请求的URL地址
// 参数2：请求对应的处理函数
// req：请求对象（包含了与请求相关的属性与方法）
// req：响应对象（包含了响应相关的属性与方法）
app.get('/user', (req, res) => {
    // req.query对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数
    // 通过req.params对象，可以访问到URL中，通过:匹配到的动态参数
    console.log(req.query);
    // res.send({
    //     name: 'lisi',
    //     age: 18
    // })
    res.send(req.query)
})
app.get('/user/:id', (req, res) => {
    // 通过req.params对象，可以访问到URL中，通过:匹配到的动态参数
    console.log(req.params);
    res.send(req.params)
})
// 监听post请求
app.post('/user', (req, res) => {
    res.send("请求成功")
})

// 调用express.static()方法，把public文件夹对外提供为静态资源
app.use(express.static('./public'));
app.use(express.static('./files'));

app.listen("80", () => {
    console.log("express serve running at http://127.0.0.1");
})