import { defineConfig } from 'vite'
const postcssPresetEnv = require('postcss-preset-env');
const path = require('path');
import { ViteAliases } from "vite-aliases"
// const { ViteAliases } = require('vite-aliases')
import MyViteAlias from "./plugins/viteAliases"
import { createHtmlPlugin } from "vite-plugin-html"
// import CreateHtmlPlugin from "./plugins/CreateHtmlPlugin"
import { viteMockServe} from 'vite-plugin-mock'
import VitePluginMock from './plugins/VitePluginMock';

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
    },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, './src') },
            { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
            // { find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' }
        ]
    },
    build: {
        minify: false, // 配置是否压缩html，默认是true
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, './index.html'),
                product: path.resolve(__dirname, './product.html'),
            },
            output: {
                // 配置输出文件名，默认是index.html
                // entryFileNames: 'js/[name]-[hash].js',
                // chunkFileNames: 'js/[name]-[hash].js',
                assetFileNames: '[name]-[hash].[ext]',
                manualChunks: (id) => {
                    console.log(id);
                    if (id.includes('node_modules')) {
                        return id.toString().split('/').splice(-1)[0].toString();
                    }
                }
            },
            // 配置输入文件的入口，默认是src/main.js
            // input: ['main.js'],
            // 配置是否生成sourceMap，默认是true
            sourcemap: true,
            
        },
        assetsInlineLimit: 409600, // 配置资源大小，默认是4096
        outDir: 'distTest', // 配置输出目录，默认是dist
        assetsDir: 'assets', // 配置静态资源目录，默认是assets
        emptyOutDir: true, // 配置是否清空输出目录，默认是true
    },
    plugins: [
        // viteMockServe(),
        // VitePluginMock(),
        // ViteAliases(),
        // MyViteAlias(),
        // CreateHtmlPlugin(),
        // createHtmlPlugin({
        //     minify: true, // 配置是否压缩html，默认是true
        //     inject: {
        //         // 配置是否注入，默认是true
        //         data: {
        //             title: 'vite-test', // 配置注入的变量名，默认是html
        //         },
        //         injectOptions: {
        //             // 配置注入的选项，默认是空对象
        //             script: true, // 配置是否注入js文件，默认是true
        //             style: false, // 配置是否注入css文件，默认是false
        //         },
        //     }
        // }),
        // vite插件调用原理
        // {
        //     config(options) {
        //         console.log('config执行了', options);
        //     },
        //     configureServer(server) {},
        //     transformIndexHtml() {},
        //     configResolved(resolvedConfig) {
        //         // 整个配置文件的解析流程完全完毕以后会走的钩子
        //         // vite在内部有一个默认的配置文件，这个配置文件会和用户自定义的配置文件进行合并
        //         console.log('configResolved执行了', resolvedConfig);
        //     },
        //     configurePreviewServer(server) {},
        //     handleHotUpdate() {},
        //     generateBundle() {},
        //     // universal hooks -->vite和rollup的钩子函数
        //     options(rollupOptions) {
        //         console.log('rollupOptions执行了', rollupOptions);
        //     },
        //     buildStart(fullRollupOptions) {
        //         console.log('buildStart执行了', fullRollupOptions); v
        //     },
        //     transform() {},
        //     closeBundle() {},
        // }
    ]
})