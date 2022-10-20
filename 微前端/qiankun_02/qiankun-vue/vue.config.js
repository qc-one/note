module.exports = {
    configureWebpack: {
        output: {
            library: "vueApp",
            // libraryTarget: "window"
            libraryTarget: "umd" // 会把属性挂载到window上。例如window.singleVue.bootstrap/mount/unmount
        },
    },
    devServer: {
        open: true,
        port: 10001,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}