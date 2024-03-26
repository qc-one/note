const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        hot: true,
        host: "0.0.0.0",
        port: 8081,
        client: {
            webSocketURL: "ws://0.0.0.0:8081/ws",
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
});
