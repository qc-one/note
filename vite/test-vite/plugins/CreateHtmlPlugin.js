// 转换html
module.exports = (options) => {
    return {
        name: "create-html-plugin",
        transformIndexHtml: {
            enforce: "pre",
            transform: (html, ctx) => {
                // console.log(html, ctx, 999)
                return html.replace(/<%= title %>/g, options.inject.data.title)
            }
        }
    }
}