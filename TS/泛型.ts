// function fn<T>(a: T, b: T): Array<T> {
//     return [a, b]
// }
// console.log(fn(1, 2));
// console.log(fn('q', 'c'));

// type A<T> = string | number | T
// let aa: A<string> = '1'

// interface Data<T> {
//     msg: T
// }
// let data: Data<number> = {
//     msg: 123
// }

// function fn<T = number, K = number>(a: T, b: K): Array<T | K> {
//     return [a, b]
// }
// console.log(fn('1', '2'));

// const axios = {
//     get<T, K>(url: string): Promise<{ data: T }> {
//         return new Promise((resolve, reject) => {
//             let xhr: XMLHttpRequest = new XMLHttpRequest()
//             xhr.open('GET', url)
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4 && xhr.status === 200) {
//                     resolve(JSON.parse(xhr.responseText))
//                 }
//             }
//             xhr.send(null)
//         })
//     }
// }
// interface Data {
//     message: string
//     code: number
// }
// axios.get<Data, string>('./index.json').then(res => {
//     console.log(res.data.code, res.data.message);
// })
// axios.get<Data, string>('./index.json').then(res => {
//     console.log(res.data);
// })

// 泛型约束
// function add<T extends number>(a: T, b: T) {
//     return a + b
// }
// console.log(add(1, 2));

// interface Len {
//     length: number
// }
// function fn<T extends Len>(a: T) {
//     return a.length
// }
// console.log(fn('123'));

// let Obj = {
//     name: 'q',
//     age: 12,
//     sex: true
// }
// type key = keyof typeof Obj
// function Ob<T extends object, K extends keyof T>(obj: T, key: K) {
//     return obj[key]
// }

interface Data {
    name: string,
    age: number,
    sex: boolean
}
type Option<T extends object> = {
    // [key in keyof T]?: T[key]
    readonly [key in keyof T]?: T[key]
}
type B = Option<Data>

// namespace中所有的变量以及方法必须要导出才能访问
namespace Test {
    interface Data {
        name: string,
        age: number,
        sex: boolean
    }
    type Option<T extends object> = {
        // [key in keyof T]?: T[key]
        readonly [key in keyof T]?: T[key]
    }
    export let obj: Option<Data> = {
        name: 'q',
        age: 12,
        sex: true
    }
    export namespace Test2 {
        export let obj: Option<Data> = {
            name: 'q',
            age: 12,
            sex: true
        }
    }
}
// 同名namespace会进行合并
namespace Test {
    export let obj2: Option<Data> = {
        name: 'q',
        age: 12,
        sex: true
    }
}
console.log(Test.obj);

export namespace Test2 {
    export let obj2: Option<Data> = {
        name: 'q',
        age: 12,
        sex: true
    }
}
