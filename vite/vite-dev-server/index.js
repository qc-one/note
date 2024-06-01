// 不能用esmodule语法，必须使用commonjs语法

const koa = require("koa")
const fs = require("fs")
const path = require("path")

const app = new koa()

app.use(async (ctx) => {
    console.log("ctx", ctx.request, ctx.response)
    const req = ctx.request
    const res = ctx.response
    if (req.url === '/') {
        const indexContent = await fs.promises.readFile(path.resolve(__dirname, "./index.html"), "utf-8")
        res.body = indexContent
        res.set("Content-Type", "text/html")
    }
})

app.listen(8888, () => {
    console.log("server is running at http://localhost:8888")
})