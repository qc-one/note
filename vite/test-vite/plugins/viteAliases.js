// vite的插件必须返回给vite一个配置对象
const fs = require('fs')
const path = require('path')

function getTotaSrcDir(keyName) {
    let obj = {
        dirs: [],
        files: []
    }
    const result = fs.readdirSync(path.resolve(__dirname, '../src'))
    result.forEach((name) => {
        const currentFile = fs.statSync(path.resolve(__dirname, '../src/' + name));
        console.log('currentFile', name, currentFile.isDirectory())
        const isDirectory = currentFile.isDirectory()
        if (isDirectory) {
            obj.dirs.push(name)
        } else {
            obj.files.push(name)
        }
    })
    const resolveAliasesObj = {}
    obj.dirs.forEach((dirName) => {
        const key = `${keyName}${dirName}`
        const absPath = path.resolve(__dirname, '../src/' + dirName)
        resolveAliasesObj[key] = absPath
    })
    return resolveAliasesObj
}

module.exports = ({
    keyName = '@'
} = {}) => {
    return {
        // config函数可以返回一个对象，这个对象时部分的viteconfig.js的配置，其实就是想改的部分
        config(config, env) {
            console.log(config, env, 111)
            // config：vite.base.config.js的配置
            // env：环境变量，包括mode和command
            // 这个对象会与vite.base.config.js合并，所以这里可以配置一些公共的配置
            // console.log('result', result)
            return {
                resolve: {
                    alias: getTotaSrcDir(keyName)
                }
            }
        }
    }
}
