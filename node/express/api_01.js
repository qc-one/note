const express = require("express");
const qs = require("querystring");
const cors = require("cors");
const router = require("./router/index");
const mysql = require("mysql2");
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '@qc540595510',
    database: 'qc_one'
})

const app = express();

// let a = {};
// const sqlAllUsers = "select * from users";
// // 检测mysql模块能否正常工作
// db.query(sqlAllUsers, (err, result) => {
//     if (err) return console.log(err.message);
//     a = result;
//     console.log(result); // 只要能打印出{'1': 1}的结果，就证明数据库连接正常 
// })

// 通过mysql2模块往MySQL数据库中插入数据
// const user = {
//     username: "superman2",
//     password: "pcc1234"
// };
// 待执行的SQL语句，其中英文的?表示占位符
// const sqlAddUsers = "insert into users (username, password) values (?, ?)";
// const sqlAddUsers = "insert into users set ?";
// // 使用数组的形式，依次为?占位符指定具体的值
// // db.query(sqlAddUsers, [user.username, user.password], (err, results) => {
// db.query(sqlAddUsers, user, (err, results) => {
//     if (err) return console.log(err.message);
//     if (results.affectedRows === 1) {
//         console.log("插入数据成功");
//     }
// })

// 通过mysql2模块更新MySQL数据库中的数据
// const userUpdate = {
//     id: 3,
//     username: 'aaa',
//     password: '000'
// };
// const sqlUpdate = "update users set username=?, password=? where id=?";
// db.query(sqlUpdate, [userUpdate.username, userUpdate.password, userUpdate.id], (err, results) => {
//     if (err) return console.log(err.message);
//     if (results.affectedRows === 1) {
//         console.log("更新数据成功");
//     }
// })

// 标记删除
// db.query('update users set status=? where id=?', [1, 3], (err, res) => {
//     if (err) return console.log(err.message) // 失败
//     if (res.affectedRows === 1) {
//         console.log('删除数据成功!');
//     }
// })

// app.get('/api/jsonp', (req, res) => {
//     const funcName = req.query.callback;
//     const data = {
//         name: 'ls',
//         age: 18
//     };
//     // const scriptStr = `${funcName}(${JSON.stringify(data)})`;
//     const scriptStr = `${funcName}(${JSON.stringify(a)})`;
//     res.send(scriptStr);
// })

app.use(cors());
// app.use(express.urlencoded({
//     extended: false
// }));

app.use((req, res, next) => {
    let str = '';
    let body = {};
    req.on("data", (chunk) => {
        str += chunk;
    })
    req.on("end", () => {
        body = qs.parse(str);
        req.body = body;
        next();
    })
})

// const session = require("express-session");
// app.use(session({
//     secret: "keyboard cat", // secret属性的值可以为任意字符串
//     resave: false,
//     saveUninitialized: true
// }))
// app.post('/api/login', (req, res) => {
//     // 判断用户提交的登录信息是否正确
//     if (req.body.username !== 'admin' || req.body.password !== '000000') {
//         return res.send({
//             status: 1,
//             msg: '登录失败！'
//         });
//     }
//     req.session.user = req.body;
//     req.session.isLogin = true;
//     res.send({
//         status: 0,
//         mag: '登录成功'
//     })
// });
// // 获取用户姓名的接口
// app.get('/api/username', (req, res) => {
//     // 判断用户是否登录
//     if (!req.session.isLogin) {
//         return res.send({
//             status: 1,
//             mag: 'fail'
//         });
//     }
//     res.send({
//         status: 0,
//         msg: 'success',
//         username: req.session.user.username
//     });
// })
// // 退出登录
// app.post('/api/logout', (req, res) => {
//     req.session.destroy();
//     res.send({
//         status: 0,
//         msg: '退出登录成功'
//     })
// })

// JWT
const jwt = require("jsonwebtoken");
const {
    expressjwt: expressJWT
} = require("express-jwt");

const secretKey = "qinc-c";

app.use(expressJWT({
    secret: secretKey,
    algorithms: ['HS256']
}).unless({
    path: [/^\/api\//]
}))

app.post('/api/login', (req, res) => {
    // 判断用户提交的登录信息是否正确
    if (req.body.username !== 'admin' || req.body.password !== '000000') {
        return res.send({
            status: 1,
            msg: '登录失败！'
        });
    }
    res.send({
        status: 0,
        mag: '登录成功',
        token: jwt.sign({
                username: req.body.username
            },
            secretKey, {
                expiresIn: '30s'
            })
    })
});
// 这是一个有权限的 API 接口
app.get('/admin/getinfo', function (req, res) {
    // TODO_05：使用 req.auth 获取用户信息，并使用 data 属性将用户信息发送给客户端
    console.log(req);
    res.send({
        status: 200,
        message: '获取用户信息成功！',
        data: req.auth // 要发送给客户端的用户信息
    })
})
// 全局错误处理中间件，捕获解析JWT失败后产生的错误
app.use((err, req, res, next) => {
    // token解析失败导致的错误
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: '无效的token'
        });
    }
    // 其它原因导致的错误
    res.send({
        status: 500,
        message: '未知错误'
    })
})

app.use('/api', router);

app.listen("80", () => {
    console.log("express serve running at http://127.0.0.1");
})