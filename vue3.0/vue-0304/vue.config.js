const { defineConfig } = require("@vue/cli-service");
// import { defineConfig } from "vite";
// 实现 Vue及Vue相关的库、api的 按需加载
// import AutoImport from "unplugin-auto-import/vite";
const AutoImport = require("unplugin-auto-import/webpack");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        plugins: [
            AutoImport({
                imports: ["vue", "vue-router", "pinia"],
            }),
        ],
    },
});
