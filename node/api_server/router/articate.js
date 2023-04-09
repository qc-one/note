// 文章分类路由

const express = require('express');
// 导入用户路由处理函数模块
const artHandler = require('../router_handler/articate')

// 创建路由对象
const router = express.Router();
// 获取文章分类的列表数据
router.get('/cates', artHandler.getArticate)

// 将路由对象共享出去
module.exports = router