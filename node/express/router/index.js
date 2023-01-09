const express = require("express");

const router = express.Router();

router.get("/user", (req, res, next) => {
    console.log("局部中间件");
    next();
}, (req, res) => {
    console.log(req.startTime, 'req');
    res.send('user get');
})
router.post("/user", (req, res) => {
    res.send('user post');
})

module.exports = router;