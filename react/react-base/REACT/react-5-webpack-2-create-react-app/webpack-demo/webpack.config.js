
let devConfig = require('./webpack.dev.js')
let productionConfig = require('./webpack.production.js')

//输入webpack --env params
module.exports = ( env ) => {
    if(env === 'production') {
        return productionConfig
    } else { 
        return devConfig
    }
}