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
let user = [1, 2, 3];
function findNum(ids) {
    if (typeof ids == 'number') {
        return user.filter(v => v == ids);
    }
    else if (Array.isArray(ids)) {
        user.push(...ids);
        return user;
    }
    else {
        return user;
    }
}
