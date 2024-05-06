// // 生成器
// function* gen() {
//     yield Promise.resolve(1)
//     yield Promise.resolve(2)
//     yield 3
//     yield 4
// }
// const man = gen()
// console.log(man.next());
// console.log(man.next());
// console.log(man.next());
// console.log(man.next());
// 迭代器
// set map
let set = new Set([1, 2, 3, 2, 2]); // 天然去重
let map = new Map([['a', 1], ['b', 2]]);
// function args() {
//     let args = Array.from(arguments)
//     console.log(args);
// }
// function each(value) {
//     let It = value[Symbol.iterator]()
//     let next = { done: false }
//     console.log(It);
//     while (!next.done) {
//         next = It.next()
//         if (!next.done) {
//             console.log(next.value);
//         }
//     }
// }
// each(map)
// 迭代器语法糖
// for (let value of set) {}
// 解构 底层原理也是调用 interator
// 对象支持for of
let obj = {
    a: 1,
    b: 2,
    [Symbol.iterator]: function* () { }
};
for (let value of obj) {
    console.log(value);
}
//# sourceMappingURL=es6.js.map