import { defineConfig } from 'vite'
const postcssPresetEnv = require('postcss-preset-env');
const path = require('path');

export default defineConfig({
    //     optimizeDeps: {
    //         // exclude: ['lodash-es'], // 当遇到lodash-es时，不进行tree shaking预构建，将指定数组中的依赖不进行依赖预构建
    //     },
    envPrefix: 'ENV_',
    // 对css进行配置
    css: {
        // 是对css模块化的默认行为进行覆盖，所有的配置最终会丢给postcss-modules插件
        modules: {
            // 修改生成类名的展示形式（驼峰还是中划线形式），默认是dashesOnly，值有camelCase(驼峰)、camelCaseOnly(只有驼峰)、dashes(中划线)、dashesOnly(只有中划线)
            // localsConvention: 'camelCaseOnly',
            // 配置当前的模块化行为，默认是global，值有local(局部)、global(全局)
            // scopeBehaviour: 'local',
            // 生成类名的规则，指定css文件中的变量名，默认是类名
            // generateScopedName: '[name]__[local]___[hash:base64:5]',
            // generateScopedName: (name, filename, css) => {
            //     // name：代表的是css文件中变量名
            //     // filename：代表的是css文件名
            //     // css：代表的是css文件内容
            //     return '[name]__[local]___[hash:base64:5]'
            // }
            // 配置是否生成hash前缀，默认是true
            // hashPrefix: 'vite-'
            // 代表不想参与模块化的文件，默认是空数组
            // globalModulePaths: ['./componentA.module.css']
        },
        preprocessorOptions: {
            // 配置对css进行预处理，默认是空对象，整个配置对象最终都会给到less的执行参数（全局参数）中去            
            less: {
                math: 'always', // 开启math计算，默认是never
                // 配置全局变量，默认是空对象
                globalVars: {
                    primaryColor: '#333',
                },
                javascriptEnabled: true, // 开启js语法解析
            },
            // sass: {}
        },
        devSourcemap: true, // 开启开发环境下的sourcemap
        postcss: {
            plugins: [
                postcssPresetEnv({
                    importFrom: path.resolve(__dirname, "./variables.css"), // 让postcss知道全局变量文件在哪里，默认是空
                })
                // 配置postcss的插件，默认是空数组
                // require('autoprefixer')({
                //     overrideBrowserslist: ['last 2 versions', '>1%'], // 指定浏览器版本
                // }),
                // require('postcss-nested'), // 开启嵌套语法
                // require('postcss-px-to-viewport')({
                //     unitToConvert: 'px', // 需要转换的单位，默认是px
                //     viewportWidth: 750, // 视窗的宽度，
                //     unitPrecision: 3, // 指定`单位转换后`保留的精度，默认是0
                //     propList: ['*'], // 指定转换的属性，默认是['*']
                //     viewportUnit: 'vw', // 指定视窗单位，默认是vw
                //     fontViewportUnit: 'vw', // 指定字体视窗单位，默认是vw
                //     selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类名，默认是[]
                //     minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，默认是1
                //     mediaQuery: false, // 允许在媒体查询中转换`px`，默认是false
                //     exclude: [/TabBar/i], // 指定不转换的类名，默认是[]
                //     landscape: false, // 允许在横屏下转换`px`，默认是false
                //     landscapeUnit: 'vw', // 横屏时使用的视窗单位，默认是`vw`
                //     landscapeWidth: 568, // 横屏时使用的视窗宽度，默认是`750px`
                //     // landscapeMinPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，默认是1
                //     // transformUnit: 'vw', // 转换后使用的视窗单位，默认是`vw`
                //     // transformValue: 1, // 转换值，默认是1
                //     // transformFunction: 'rem', // 转换函数，默认是rem
                // })
            ]
        }
    }
})