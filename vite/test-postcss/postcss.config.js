// 安装预设环境，预设环境里面有很多插件，例如：
// 语法降级————>postcss-low-level
// 编译插件————>postcss-compiler
// 做语法编译 less语法 sass语法（语法嵌套 函数 变量）
const postcssPresetEnv = require('postcss-preset-env');


module.exports = {
    // parser: 'sugarss',
    plugins: [
        postcssPresetEnv(),
        // require('postcss-import')({ ...options }),
        // require('postcss-url')({ url: 'copy', useHash: true }),
    ],
}