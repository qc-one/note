const mysql = require("mysql2");

// 创建数据库连接对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '@qc540595510',
    database: 'qc_one'
})

module.exports = db;