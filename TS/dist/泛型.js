// function fn<T>(a: T, b: T): Array<T> {
//     return [a, b]
// }
// console.log(fn(1, 2));
// console.log(fn('q', 'c'));
// namespace中所有的变量以及方法必须要导出才能访问
var Test;
(function (Test) {
    Test.obj = {
        name: 'q',
        age: 12,
        sex: true
    };
    let Test2;
    (function (Test2) {
        Test2.obj = {
            name: 'q',
            age: 12,
            sex: true
        };
    })(Test2 = Test.Test2 || (Test.Test2 = {}));
})(Test || (Test = {}));
// 同名namespace会进行合并
(function (Test) {
    Test.obj2 = {
        name: 'q',
        age: 12,
        sex: true
    };
})(Test || (Test = {}));
console.log(Test.obj);
export var Test2;
(function (Test2) {
    Test2.obj2 = {
        name: 'q',
        age: 12,
        sex: true
    };
})(Test2 || (Test2 = {}));
//# sourceMappingURL=%E6%B3%9B%E5%9E%8B.js.map