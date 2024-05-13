var Interface;
(function (Interface) {
    let a = {
        name: 'a'
    }; // interface
    let b = {
        name: 'b'
    }; //type
    let user; // key string value string
    // 把interface 赋值给Record的时候需要明确interface里面的属性，interface后续可以新增合并，Record类型不能新增合并，type是固定的
    user = a; // interface 赋值给Record类型会报错，解决方案增加索引签名
    user = b; // type类型是没有问题的
})(Interface || (Interface = {}));
//# sourceMappingURL=interface.js.map