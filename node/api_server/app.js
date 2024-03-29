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

// 导入配置文件
const config = require('./config')
// 解析 token 的中间件，一定要在路由之前配置
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({
    secret: config.jwtSecretKey
}).unless({
    path: [/^\/api\//]
}))

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)

// 导入并使用文章分类管理路由模块
const articateRouter = require('./router/articate')
app.use('/my/article', articateRouter)

// 错误中间件
app.use((err, req, res, next) => {
    // 数据验证失败
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败！')
    }
    // 未知错误
    res.cc(err)
})

app.listen(3007, () => {
    console.log("api server running at [http://127.0.0.1:3007]");
})