// 文章分类路由

const express = require('express');
// 导入用户路由处理函数模块
const artcate_handler = require('../router_handler/articate')
const expressJoi = require('@escook/express-joi')
// 导入文章分类的验证模块
const {
    add_cate_schema,
    delete_cate_schema,
    get_cate_schema
} = require('../schema/artcate')

// 创建路由对象
const router = express.Router();
// 获取文章分类的列表数据
router.get('/cates', artcate_handler.getArticate)
// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)
// 删除文章分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)
// 根据ID获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCateById)

// 将路由对象共享出去
module.exports = router