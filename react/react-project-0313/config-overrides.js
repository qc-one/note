const { 
    override, 
    fixBabelImports,
    addLessLoader,
    addBabelPlugins,
    addWebpackAlias,
} = require('customize-cra');

const path = require("path");

module.exports = override(
    ...addBabelPlugins( // 支持装饰器
        [
            '@babel/plugin-proposal-decorators',
            { legacy: true}
        ]
    ),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // style: 'css',
        style: true,
    }),
    adjustStyleLoaders(({ use: [ , css] }) => {
        css.options.sourceMap = true;
        css.options.modules = {
          // 配置默认的样式名称规则
          localIdentName:'[name]__[local]--[hash:base64:5]',
        } 
    }),
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            modifyVars: { '@primary-color': 'green' },
        }
    }),
    
    addWebpackAlias({ //路径别名
        '@': path.resolve(__dirname, 'src'),
    }),
    // (config) => {
    //     //修改、添加loader 配置 :
    //     // 全部的loaders规则是在config.module.rules(数组)的第二项
    //     // 即：config.module.rules[2].oneof  (若是不是，具体能够打印 一下是第几项目)
    //     // 修改 less 配置 ，规则 loader 在第7项(具体能够打印配置)
    //     const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
    //     // console.log(loaders, 123);
    //     loaders[7].use.push({
    //         loader: 'style-resources-loader',
    //         options: {
    //             patterns: path.resolve(__dirname, 'src/common/common.less')//全局引入公共的scss 文件
    //         }
    //     })
    //     return config
    // }
    adjustStyleLoaders(rule => {
        if (rule.test.toString().includes('less')) {
            rule.use.push({
                loader: require.resolve('nuxt-less-resources-loader'),
                options: {
                    resources: './src/common/common.less'
                }
            });
        }
    })
);