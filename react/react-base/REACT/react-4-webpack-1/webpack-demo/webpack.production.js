

module.exports = {
    //配置入口文件
    // entry : './src/main.js',
    //多入口,打包到一起，在数组的索引靠前，代码就先执行
    // entry : ['./src/main.js', './src/vendor.js'],
    //多入口，多出口
    entry : {
        main: './src/main.js',
        vendor: './src/vendor.js'
    },
    output: {
        //绝对路径，打包的位置
        path: __dirname+'/build',
        // filename:'main[hash]- '+Date.now()+'.js'
        // filename:'main.js',
        filename: '[name]-[hash].js'
    }

}