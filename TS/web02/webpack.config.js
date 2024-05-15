const { Configuration } = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const CssExtractPlugin = require('mini-css-extract-plugin')

/**
 * @type {Configuration}
*/
const config = {
    mode: 'development', // 开发模式
    entry: './src/main.ts', // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // 生成目录
        // filename: 'bundle.js' // 生成文件名
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        clean: true, // 每次打包前清空
    },
    stats: 'errors-only', // 错误信息
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // 模板文件
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: 'true',
            __VUE_PROD_DEVTOOLS__: 'false',
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
        }),
        new CssExtractPlugin({
            filename: '[name].css',
        })

    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/] // 自动添加后缀
                    }
                },
                exclude: /node_modules/ // 处理ts文件
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    CssExtractPlugin.loader,
                    'css-loader'
                ] // 顺序是从右到左
            },
            {
                test: /\.less$/,
                use: [
                    CssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            // chunks: 'all' // 全部文件
            cacheGroups: {
                // 缓存组
                common: {
                    test: /[\\/]node_modules[\\/]/, // 匹配文件路径
                    name: 'common', // 打包后的文件名
                    chunks: 'all' // 全部文件
                },
                moment: {
                    test: /[\\/]node_modules[\\/](moment)[\\/]/, // 匹配文件路径
                    name: 'moment', // 打包后的文件名
                    chunks: 'all' // 全部文件
                }
            }
        }

    }
}

module.exports = config