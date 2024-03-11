let devCofig = require('./webpack.dev.js')//开发配置
let productionCofig = require('./webpack.production.js')//生产配置

//输入webpack --env params
module.exports = (env) => {
	if(env === "production"){
		return productionCofig
	}else{
		return devCofig
	}
}
