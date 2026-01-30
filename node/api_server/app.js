const express = require('express');
const bodyParser = require('body-parser')
const joi = require('joi')
const app = express();
const path = require('path');
const fs = require('fs');
const mime = require('mime'); // 自动识别文件类型

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

app.get('/api/excelpreview', (req, res) => {
  try {
    console.log(1)
    const filePath = path.join(__dirname, './file.xlsx'); // 替换为实际文件路径

    // 2. 校验文件是否存在
    if (!fs.existsSync(filePath)) {
      // 若目录不存在，创建目录（可选）
      fs.mkdirSync(filePath, { recursive: true });
      return res.status(404).json({
        code: 404,
        msg: 'Excel 文件目录不存在，已自动创建，请先上传文件'
      });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        code: 404,
        msg: `Excel 文件 ${filePath} 不存在`
      });
    }

    // 3. 获取文件信息（大小、类型等）
    const fileStat = fs.statSync(filePath);
    if (!fileStat.isFile()) {
      return res.status(400).json({
        code: 400,
        msg: '指定路径不是有效文件'
      });
    }

    // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Type',  mime.getType(filePath));
    console.log(filePath, 22, mime.getType(filePath))
    // res.sendFile(filePath); // 此方法会自动设置正确的 Content-Type 和 Content-Disposition

    // 5. 流式传输文件（推荐，内存友好）
    const fileStream = fs.createReadStream(filePath);
    
    // 监听流错误
    fileStream.on('error', (err) => {
      console.error('文件读取失败：', err);
      res.status(500).json({
        code: 500,
        msg: '服务器读取文件失败'
      });
    });

    // 监听流结束
    fileStream.on('end', () => {
      console.log(`文件 ${filePath} 传输完成`);
    });

    // 将文件流管道到响应
    fileStream.pipe(res);
  } catch (error) {
    console.error(error);
    // res.status(500).send('文件读取失败');
    res.status(500).json({
      code: -1,
      msg: '读取文件失败：' + error.message,
      data: null
    });
  }
});

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