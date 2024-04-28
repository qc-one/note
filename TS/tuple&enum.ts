// 元祖类型
// let arr: readonly [x: number, y?: boolean] = [1, false]
// console.log(arr[0])

// type first = typeof arr[0]
// type second = typeof arr['length']

// 枚举类型
// 数字枚举
enum Color {
    red,
    green,
    blue
}
console.log(Color.red); // 0
console.log(Color.green); // 1
console.log(Color.blue); // 2

// 增长枚举
enum Color2 {
    red = 2,
    green,
    blue
}
console.log(Color.red); // 2
console.log(Color.green); // 3
console.log(Color.blue); // 4

// 字符串枚举
enum Color3 {
    red = 'red',
    green = 'green',
    blue = 'blue'
}
// 异构枚举
enum Color4 {
    red = 1,
    green = 'green',
    blue = 'blue'
}
// 接口枚举
enum Color5 {
    red,
    green,
    blue
}
interface Color6 {
    // [Color5.red]: string;
    // [Color5.green]: number;
    // [Color5.blue]: boolean;
    red: Color5.red,
    green: Color5.green,
    blue: Color5.blue,
}
const color: Color6 = {
    red: Color5.red,
    green: Color5.green,
    blue: Color5.blue
}
console.log(color); // { red: 'red', green: 10, blue: false }
// const枚举 使用const枚举会编译成常量，不使用const枚举会编译成一个对象
const enum Color7 {
    red,
    green,
    blue
}
const color2: Color7 = 0; // error
// 反向映射--字符串不支持反向映射
enum Color8 {
    red,
    green,
    blue
}
const color3: string = Color8[2]; // blue
const color4: Color8 = Color8.blue; // 2