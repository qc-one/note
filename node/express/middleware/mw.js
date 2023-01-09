const mw = function (req, res, next) {
    console.log('中间件');
    const time = Date.now();
    req.startTime = time;
    next();
}

module.exports = mw;