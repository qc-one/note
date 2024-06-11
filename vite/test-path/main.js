// 再读取文件的时候，如果写的是相对路径，那么会拼接成绝对路径，如果写的是绝对路径，那么直接读取 
// commonjs规范会给每个模块都注入几个变量，require, exports, module, __dirname, __filename

const fs = require("fs");
const path = require("path"); // path本质上就是一个字符串处理模块，它里面有非常多的方法，比如拼接路径，获取文件名等

// path.resolve() 拼接路径，返回绝对路径
const result = fs.readFileSync(path.resolve(__dirname + "/variables.css")); // 希望基于main.js去生成一个绝对路径

// console.log(1111, result.toString(), process.cwd(), require, exports, module, __dirname, __filename);

// node端读取文件或者操作文件的时候，如果发现用的是相对路径，则会使用process.cwd()来拼接成绝对路径
// process.cwd() 获取当前node执行目录
// __dirname 获取当前文件所在目录

// 在node中每个文件就相当于一个模块，每个模块都有自己的作用域，作用域中会存在一些变量，比如require, exports, module, __dirname, __filename，把每个模块的内容放入到一个立即执行函数中，这样就可以形成一个作用域，这些变量以参数的形式传入到这个立即执行函数中，这样就可以形成一个作用域
// (function(exports, require, module, __dirname, __filename) {

// }())
console.log(arguments, 111)
