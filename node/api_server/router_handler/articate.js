/**
    相关的路由处理函数，供 /router/articate.js 模块进行调用
*/
const db = require("../db/index");

// 获取文章分类列表数据的处理函数
exports.getArticate = (req, res) => {
    // 根据分类的状态，获取所有未被删除的分类列表数据，使用order by根据id从小到大排序
    // is_delete 为 0 表示没有被 标记为删除 的数据
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc';
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results,
        })
    })
}