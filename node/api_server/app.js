const express = require('express');
const bodyParser = require('body-parser')
const joi = require('joi')

const app = express();

app.use(bodyParser.json());
// 配置解析表单数据的中间件，这个中间件只能解析application/x-www-form-urlencoded格式的表单数据
app.use(bodyParser.urlencoded({
    extended: false
}))

const cors = require('cors');
app.use(cors());

// 响应数据的中间件
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next();
})

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 错误中间件
app.use((err, req, res, next) => {
    console.log(err);
    // 数据验证失败
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    // 未知错误
    res.cc(err)
})

app.listen(3007, () => {
    console.log("api server running at [http://127.0.0.1:3007]");
})