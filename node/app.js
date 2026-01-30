// 导入http模块
const http = require("http");
const path = require("path");
const fs = require("fs");

// 创建web服务器实例
const serve = http.createServer();

// 为服务器实例绑定request事件，监听客户端的请求
// serve.on("request", (req, res) => {
//     console.log('请求服务器', req.url, req.method);
//     let content = '<h1>404 Not Found!</h1>';
//     const url = req.url;
//     if (url === '/' || url === '/index.html') {
//         content = '<h1>首页</h1>'
//     } else if (url === '/about.html') {
//         content = '<h1>关于页面</h1>'
//     }

//     // 为了防止中文显示乱码的问题，需要设置响应头 Content-Type的值为 text/html;charset=utf-8
//     res.setHeader('Content-Type', 'text/html;charset=utf-8');
//     res.end(content);
// })

// req是请求对象，包含了与客户端相关的数据和属性
serve.on("request", (req, res) => {
    const url = req.url;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    let fpath = '';
    if (url === '/') {
        fpath = path.join(__dirname, './file/index.html');
    } else {
        fpath = path.join(__dirname, '/file', url);
    }

    fs.readFile(fpath, 'utf8', (err, dataStr) => {
        if (err) {
            return res.end('<h1>404 Not Found!</h1>');
        }
        res.end(dataStr)
    })
})

// 启动服务器
serve.listen(8080, () => {
    console.log('http server running at http://127.0.0.1:8080');
});