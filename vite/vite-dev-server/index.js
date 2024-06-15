// 不能用esmodule语法，必须使用commonjs语法

const koa = require("koa")
const fs = require("fs")
const path = require("path")

// 读取vite.config.js文件
const viteConfig = require("./vite.config");
console.log(viteConfig)
const aliasResolver = require("./aliasResolver");

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
    if (req.url.endsWith(".js")) {
        console.log("req.url", req.url)
        const jsContent = await fs.promises.readFile(path.resolve(__dirname, "." + req.url))
        // 直接进行alias替换
        const lastResult = aliasResolver(viteConfig.resolve.alias, jsContent.toString())
        res.body = lastResult
        res.set("Content-Type", "text/javascript")
    }
    // if (req.url === "/src/main.js") {
    //     const mainContent = await fs.promises.readFile(path.resolve(__dirname, "./src/main.js"), "utf-8")
    //     res.body = mainContent
    //     res.set("Content-Type", "text/javascript")
    // }
    // if (req.url === "/src/App.vue") {
    //     const vueContent = await fs.promises.readFile(path.resolve(__dirname, "./src/App.vue"))
    //     res.body = vueContent
    //     res.set("Content-Type", "text/javascript")
    // }
})

app.listen(8888, () => {
    console.log("server is running at http://localhost:8888")
})