/**
    在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
*/
const db = require("../db/index");
const sqlReg = 'select * from ev_users where username=?'
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// 导入配置文件
const config = require('../config')

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
    const userinfo = req.body;
    const sql = `select * from ev_users where username=?`;
    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！')
        // 判断用户输入的登录密码是否和数据库中的密码一致
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('密码失败，登录失败！')
        }
        // 登录成功，生成 Token 字符串
        const user = {
            ...results[0],
            password: '',
            user_pic: ''
        };
        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token 有效期为 10 个小时
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })
    })
}