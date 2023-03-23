const express = require('express');
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
// 导入需要的验证规则对象
const {
    update_userinfo_schema,
    update_password_schema
} = require('../schema/user')
// 创建路由对象
const router = express.Router();

// 获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)
// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
// 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 将路由对象共享出去
module.exports = router