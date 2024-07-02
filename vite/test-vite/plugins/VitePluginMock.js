const fs = require('fs')
const path = require('path')

export default (options) => {
    // 做的最主要的事情就是拦截http请求，然后返回数据
    // 
    return {
        name: 'vite-plugin-mock',
        enforce: 'pre',
        apply: 'serve',
        configResolved(resolvedConfig) {
            console.log('configResolved')
        },
        configureServer(server) {
            // 服务器相关的配置
            // req：请求对象，用户发过来的请求，请求头，请求体，url，cookie
            // res：响应对象，服务器返回给用户的数据，可以设置响应头，响应体
            // next：回调函数，告诉服务器，我已经处理完了，可以继续下一个中间件
            const mockStat = fs.statSync("mock")
            const isDirectory = mockStat.isDirectory()
            let mockResult = []
            if (isDirectory) {
                let children = fs.readdirSync("mock")
                console.log('children', children)
                // process.cwd()：获取当前的执行根目录
                mockResult = require(path.resolve(process.cwd(), 'mock', children[0]))
                console.log('mockResult', mockResult)
            }

            server.middlewares.use((req, res, next) => {
                console.log('server.middleware', req.url)
                // 看请求的地址在mockResult中是否存在
                const matchItem = mockResult.find(item => item.url === req.url)
                console.log('matchItem', matchItem)
                if (matchItem) {
                    console.log('进来了')
                    const responseData = matchItem.response(req)
                    console.log('responseData', responseData)
                    // 强制设置一下请求头为JSON格式
                    res.setHeader('Content-Type', 'application/json') 
                    res.end(JSON.stringify(responseData))
                    
                } else {
                    next()
                }
                
            })
        }
        // configureServer({ app }) {
        //     app.get('/api/userInfo', (req, res) => {
        //         res.send({ name: 'zhangsan' })
        //     })
        // }
    }
}