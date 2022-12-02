const {
    defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    //关闭eslint校验
    lintOnSave: false,
    devServer: {
        open: true, // 编译后默认打开浏览器
        host: '127.0.0.1', // 域名
        port: 8080, // 端口
        https: false, // 是否https
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:10001',
                changeOrigin: true, // 是否跨域
                ws: false, // 是否支持 websocket
                secure: false, // 如果是 https 接口，需要配置这个参数
                pathRewrite: { // 可以理解为一个重定向或者重新赋值的功能
                    '^/api': '' // '^/api': '/'    这种接口配置出来     http://127.0.0.1:10001/login
                } // '^/api': '/api'  这种接口配置出来     http://127.0.0.1:10001/api/login
            }
        }
    },
})