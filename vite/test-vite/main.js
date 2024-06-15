// import { counter } from './counter.js'
// console.log(counter);
// import "./variables.css"
// import "./index.less"
// import './index.css'
// import "./componentB.js"
// import "./componentA.js"

import "./src/imageLoader"
// import jsonFile from "./src/assets/json/001.json" // 以一个对象的形式使用，vite会将这个对象中所有属性都打包进来
import { name } from "./src/assets/json/001.json" // 只引入需要的属性，vite不会将整个对象打包进来，而是单独打包这个属性
console.log(name)

// tree shaking摇树优化：打包工具会自动帮你移除掉那些没有用到的变量或者方法
// console.log(jsonFile) // 如果不是vite，在其他构建工具中json文件的导入会作为一个json字符串形式存在

import "./src/components/baseComponents/Button/index.js"
