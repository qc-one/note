const express = require("express");

const router = express.Router();

router.get("/get", (req, res, next) => {
    // 局部中间件
    next();
}, (req, res) => {
    let query = req.query;
    res.send({
        status: 0,
        msg: "GET请求成功",
        data: query
    });
})
router.post("/post", (req, res) => {
    let body = req.body;
    res.send({
        status: 0,
        msg: "POST请求成功",
        data: body
    });
})
router.delete("/delete", (req, res) => {
    let body = req.body;
    res.send({
        status: 0,
        msg: "DELETE请求成功",
        data: body
    });
})

module.exports = router;