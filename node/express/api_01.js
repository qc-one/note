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

let a = {};
const sqlAllUsers = "select * from users";
// 检测mysql模块能否正常工作
db.query(sqlAllUsers, (err, result) => {
    if (err) return console.log(err.message);
    a = result;
    console.log(result); // 只要能打印出{'1': 1}的结果，就证明数据库连接正常 
})

// 通过mysql2模块往MySQL数据库中插入数据
const user = {
    username: "superman2",
    password: "pcc1234"
};
// 待执行的SQL语句，其中英文的?表示占位符
// const sqlAddUsers = "insert into users (username, password) values (?, ?)";
const sqlAddUsers = "insert into users set ?";
// 使用数组的形式，依次为?占位符指定具体的值
// db.query(sqlAddUsers, [user.username, user.password], (err, results) => {
db.query(sqlAddUsers, user, (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log("插入数据成功");
    }
})

// 通过mysql2模块更新MySQL数据库中的数据
const userUpdate = {
    id: 3,
    username: 'aaa',
    password: '000'
};
const sqlUpdate = "update users set username=?, password=? where id=?";
db.query(sqlUpdate, [userUpdate.username, userUpdate.password, userUpdate.id], (err, results) => {
    if (err) return console.log(err.message);
    if (results.affectedRows === 1) {
        console.log("更新数据成功");
    }
})

app.get('/api/jsonp', (req, res) => {
    const funcName = req.query.callback;
    const data = {
        name: 'ls',
        age: 18
    };
    // const scriptStr = `${funcName}(${JSON.stringify(data)})`;
    const scriptStr = `${funcName}(${JSON.stringify(a)})`;
    res.send(scriptStr);
})

app.use(cors());
app.use(express.urlencoded({
    extended: false
}));

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

app.use('/api', router);

app.listen("80", () => {
    console.log("express serve running at http://127.0.0.1");
})