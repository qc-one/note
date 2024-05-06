// 元祖类型
// let arr: readonly [x: number, y?: boolean] = [1, false]
// console.log(arr[0])
// type first = typeof arr[0]
// type second = typeof arr['length']
// 枚举类型
// 数字枚举
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
console.log(Color.red); // 0
console.log(Color.green); // 1
console.log(Color.blue); // 2
// 增长枚举
var Color2;
(function (Color2) {
    Color2[Color2["red"] = 2] = "red";
    Color2[Color2["green"] = 3] = "green";
    Color2[Color2["blue"] = 4] = "blue";
})(Color2 || (Color2 = {}));
console.log(Color.red); // 2
console.log(Color.green); // 3
console.log(Color.blue); // 4
// 字符串枚举
var Color3;
(function (Color3) {
    Color3["red"] = "red";
    Color3["green"] = "green";
    Color3["blue"] = "blue";
})(Color3 || (Color3 = {}));
// 异构枚举
var Color4;
(function (Color4) {
    Color4[Color4["red"] = 1] = "red";
    Color4["green"] = "green";
    Color4["blue"] = "blue";
})(Color4 || (Color4 = {}));
// 接口枚举
var Color5;
(function (Color5) {
    Color5[Color5["red"] = 0] = "red";
    Color5[Color5["green"] = 1] = "green";
    Color5[Color5["blue"] = 2] = "blue";
})(Color5 || (Color5 = {}));
const color = {
    red: Color5.red,
    green: Color5.green,
    blue: Color5.blue
};
console.log(color); // { red: 'red', green: 10, blue: false }
const color2 = 0; // error
// 反向映射--字符串不支持反向映射
var Color8;
(function (Color8) {
    Color8[Color8["red"] = 0] = "red";
    Color8[Color8["green"] = 1] = "green";
    Color8[Color8["blue"] = 2] = "blue";
})(Color8 || (Color8 = {}));
const color3 = Color8[2]; // blue
const color4 = Color8.blue; // 2
//# sourceMappingURL=tuple&enum.js.map