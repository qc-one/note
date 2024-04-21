// let str:string = "qinc";
// console.log(str)

// let test: void = undefined
// let num2: string = "1"
// num2 = test

// let test: null = undefined
// let num2: string = "12"
// num2 = test
// console.log(num2)

// let o1: Object = {
//     name: 'qin'
// }
// o1.age = 18
// console.log(o1);

// interface A {
//     name: string
// }
// let a:A = {
//     name: '小满'
// }
// console.log(a);

// let arr:number[] = [1,2,3,4]
// let b:Array<boolean> = [true, false]

// interface X {
//     name: string
//     age: number
// }
// let c:X[] = [{name: 'qin', age: 18}, {name: 'chuang', age: 20}]

// let d:number[][] = [[1],[2],[3]]
// let e:Array<Array<number>> = [[1],[2],[3]]
// let f:any[] = [1, 'sdfs', true, {}]

// interface User{
//     name: string
//     age: number
// }
// function fn(user:User):User {
//     return user
// }
// console.log(fn({
//     name: 'qin',
//     age: 19
// }))

// interface Obj {
//     arr: number[]
//     add: (this:Obj, num:number) => void
// }
// // ts可以定义this的类型，在js中无法使用，第一个参数必须定义this的类型
// let obj: Obj = {
//     arr: [1,3,3],
//     add(this:Obj, num:number) {
//         this.arr.push(num)
//     }
// }
// obj.add(9)

// let user:number[] = [1,2,3]
// function findNum(add:number[]):number[] // 如果传的是一个number类型的数组就做添加
// function findNum(id:number):number[] // 如果传入了id就是单个查询
// function findNum():number[] // 如果没有传入东西就是查询全部
// function findNum(ids?:number | number[]):number[] {
//     if (typeof ids == 'number') {
//         return user.filter(v => v==ids)
//     } else if (Array.isArray(ids)) {
//         user.push(...ids)
//         return user
//     } else {
//         return user
//     }
// }

// let num:Number = new Number(1)
// let date:Date = new Date();
// let reg:RegExp = new RegExp(/\w/)
// let error:Error = new Error('错了');
// let xhr:XMLHttpRequest = new XMLHttpRequest();

// // HTML(元素名称)Element HTMLElement
// let div:HTMLDivElement = document.querySelector("div");
// let header:HTMLElement = document.querySelector("header");
// let footer = document.querySelector("footer") as Element;
// let arrDiv:NodeList = document.querySelectorAll("div");
// let arrDiv2:NodeListOf<HTMLDivElement | HTMLElement> = document.querySelectorAll("div footer");

// let local:Storage = localStorage
// let lo:Location = location
// let permise:Promise<number> = new Promise((r)=>r(1))
// permise.then(res => {
//     console.log(res)
// })
// let cookie:string = document.cookie

// interface Options {
//     el: string | HTMLElement
// }
// interface VueCls {
//     options: Options
//     init(): void
// }

// interface Vnode {
//     tag: string // div span
//     text?: string // 123
//     children?: Vnode[]
// }
// // 虚拟dom
// class Dom {
//     // 创建节点
//     createElement(el: string) {
//         return document.createElement(el)
//     }
//     // 填充文本的方法
//     setText(el: HTMLElement, text: string | null) {
//         el.textContent = text
//     }
//     // 渲染函数
//     render(data: Vnode) {
//         let root = this.createElement(data.tag)
//         if (data.children && Array.isArray(data.children)) {
//             data.children.forEach(item => {
//                 let child = this.render(item)
//                 root.appendChild(child)
//             })
//         } else {
//             this.setText(root, data.text)
//         }
//         return root
//     }
// }

// class Vue extends Dom implements VueCls {
//     options: Options
//     constructor(options: Options) {
//         super()
//         this.options = options
//         this.init()
//     }
//     init(): void {
//         let data: Vnode = {
//             tag: 'div',
//             children: [
//                 {
//                     tag: 'span',
//                     text: '我是子节点'
//                 },
//                 {
//                     tag: 'button',
//                     text: '点击'
//                 }
//             ]
//         }
//         // let app = typeof this.options.el === 'string' ? document.querySelector(this.options.el) : this.options.el
//         // app.appendChild(this.render(data))
//     }
// }
// new Vue({
//     el: '#app'
// })

// 交叉类型
// interface People {
//     name: string,
//     age: number
// }
// interface Man {
//     sex: number
// }
// const qin = (man: People & Man) => {
//     console.log(man)
// }
// qin({
//     name: 'qinc0',
//     age: 18,
//     sex: 0
// })

// // 类型断言
// let fn = function (num: number | string): void {
//     console.log((num as string).length)
// }
// fn('1234')

// let fn1 = (type: any): boolean => {
//     return type as boolean
// }
// let b = fn1(1)
// console.log(b, 123);

