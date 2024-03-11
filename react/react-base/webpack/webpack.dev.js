const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
	mode:'development',
	//单入口
//	entry:'./src/main.js',//配置入口文件
	//多入口，打包到一起，在数组中索引靠前的文件先执行
//	entry:['./src/main.js','./src/vendor.js'],//配置入口文件
	//多入口，多出口
	entry:{
		main:'./src/main.js',
		vendor:'./src/vendor.js'
	},
	
	
	output:{//配置出口文件
		//配置打包路径
		path:__dirname+'/build',//使用绝对路径，打包路径
		
		//配置打包的文件名称
//		filename:'main[hash].js'//增加hash值，可以跟踪版本
//		filename:'main.js'//增加hash值，可以跟踪版本
		filename:'[name].min.js'//多入口，多出口时，可以不写出口文件名称或者写成[name].js
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
        	template:'./src/index.html',
        	filename:'index.html',
        	minify: {
	            removeAttributeQuotes: true, // 移除属性的引号
	            collapseWhitespace:true//去除空格
	        }
        }),
        new ExtractTextWebpackPlugin({//使用插件将css文件抽离出来
			filename:'app.css',
			allChunks:true
		})
    ],
    module:{
	    rules:[//在这里配置loader的使用
//	        {//处理css的loader
//	       		test:/\.css$/,
//	       		loader:['style-loader','css-loader']
//	        },
//	        {//处理scss的loader
//				test:/\.scss$/,
//				use:['style-loader','css-loader','sass-loader']
//			}

			{
				test:/\.css$/,
				use:ExtractTextWebpackPlugin.extract({//使用插件将css文件抽离出来
			      fallback: "style-loader",
			      use: "css-loader"
			    })
			},
			{
				test:/\.scss/,
				use:ExtractTextWebpackPlugin.extract({//使用插件将css文件抽离出来
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
	},
}
