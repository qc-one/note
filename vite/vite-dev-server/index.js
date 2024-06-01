// 不能用esmodule语法，必须使用commonjs语法

const koa = require("koa")
const fs = require("fs")
const path = require("path")

const app = new koa()

app.use(async (ctx) => {
    // console.log("ctx", ctx.request, ctx.response)
    const req = ctx.request
    const res = ctx.response
    if (req.url === '/') {
        const indexContent = await fs.promises.readFile(path.resolve(__dirname, "./index.html"), "utf-8")
        res.body = indexContent
        res.set("Content-Type", "text/html")
    }
    if (req.url === "/src/main.js") {
        const mainContent = await fs.promises.readFile(path.resolve(__dirname, "./src/main.js"), "utf-8")
        res.body = mainContent
        res.set("Content-Type", "text/javascript")
    }
    if (req.url === "/src/App.vue") {
        const vueContent = await fs.promises.readFile(path.resolve(__dirname, "./src/App.vue"))
        res.body = vueContent
        res.set("Content-Type", "text/javascript")
    }
})

app.listen(8888, () => {
    console.log("server is running at http://localhost:8888")
})