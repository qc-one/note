module.exports = {
	
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
		filename:'[name]-[hash].min.js'//多入口，多出口时，可以不写出口文件名称或者写成[name].js
	}
}
