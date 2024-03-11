
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    //配置入口文件
    // entry : './src/main.js',
    //多入口,打包到一起，在数组的索引靠前，代码就先执行
    // entry : ['./src/main.js', './src/vendor.js'],
    //多入口，多出口
    mode: 'development',
    entry : {
        main: './src/main.js',
        vendor: './src/vendor.js'
    },
    output: {
        //绝对路径，打包的位置
        path: __dirname+'/build',
        // filename:'main[hash]- '+Date.now()+'.js'
        // filename:'main.js',
        filename: '[name].js'
    },
    devServer:{
        port:9000,
        contentBase:'./build',
        historyApiFallback: true,
        open: true,
        proxy:{
            
        }
    },
    plugins: [//在这里配置使用插件，放入的是插件的实例
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin({
            allChunks: true,
            filename: 'app.css'
        })

    ],
    module: {
        rules: [//在这里配置loader的使用
            {
                test: /\.jade$/ ,
                loader: 'jade-loader'
            },
            // {
            //     test: /\.css$/,
            //     loader: ['style-loader', 'css-loader']
            // },
            // {
            //     test: /\.scss$/,
            //     loader: ['style-loader', 'css-loader', 'sass-loader']
            // },
            {			
    			test: /\.css$/,
    			use: ExtractTextPlugin.extract({
			      fallback: "style-loader",
			      use: "css-loader"
			    })
    		},
    		{
    			test: /\.scss$/,
    			use: ExtractTextPlugin.extract({
			      fallback: "style-loader",
			      use: ["css-loader","sass-loader"]
			    })
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader:'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            }
            
        ]
    }

}