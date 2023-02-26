const express = require('express');
const app = express();
// 配置解析表单数据的中间件，这个中间件只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({
    extended: false
}))

const cors = require('cors');
app.use(cors());

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

app.listen(3007, () => {
    console.log("api server running at [http://127.0.0.1:3007]");
})