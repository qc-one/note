const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy('/api1', {// 控制代理转发前缀
            target: 'http://localhost:5000', // 请求转发给谁
            changeOrigin: true, // 控制服务器收到的响应头中host字段的值
            pathRewrite: {// 重新请求路径
                '^/api1': ''
            }
        }),
        proxy('/api2', {
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrite: {
                '^/api2': ''
            }
        })
    )
}


