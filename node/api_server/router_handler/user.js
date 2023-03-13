/**
    在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
*/
const db = require("../db/index");
const sqlReg = 'select * from ev_users where username=?'
const bcrypt = require("bcryptjs");

// 注册用户的处理函数
exports.regUser = (req, res) => {
    const userInfo = req.body;
    // if (!userInfo.username || !userInfo.password) {
    //     return res.send({
    //         status: 1,
    //         message: '用户名或密码不能为空！'
    //     });
    // }
    // 查询用户名是否被占用
    db.query(sqlReg, [userInfo.username], (err, results) => {
        console.log(err);
        console.log(results);
        if (err) {
            // return res.send({
            //     status: 1,
            //     message: err.message
            // })
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '用户名被占用，请更换其它用户名！'
            })
        }
        userInfo.password = bcrypt.hashSync(userInfo.password, 10);
        // 插入新用户
        const sqsIns = 'insert into ev_users set ?'
        db.query(sqsIns, {
            username: userInfo.username,
            password: userInfo.password
        }, (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '注册用户失败，请稍后尝试！'
                })
            }
            res.send('注册成功')
        })
    })
}
// 登录的处理函数
exports.login = (req, res) => {
    res.send('login OK')
}