const express = require('express');
// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const {
    reg_login_schema
} = require('../schema/user')
const path = require('path');

// 创建路由对象
const router = express.Router();

router.post('/api/excelpreview', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../file.xlsx'); // 替换为实际文件路径
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.sendFile(filePath); // 此方法会自动设置正确的 Content-Type 和 Content-Disposition
  } catch (error) {
    console.error(error);
    res.status(500).send('文件读取失败');
  }
});

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
// 登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
// 将路由对象共享出去
module.exports = router