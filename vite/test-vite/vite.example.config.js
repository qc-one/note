// 测试vite配置

import { defineConfig } from 'vite'

export default defineConfig({
    optimizeDeps: {
        // include: ['vue', 'vue-router']
    },
    envPrefix: 'QC_', // 配置vite注入客户端环境变量校验的env前缀
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
    }
})
