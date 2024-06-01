const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,  //添加这行
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
        // 其他别名配置
      }
    }
  }
});
