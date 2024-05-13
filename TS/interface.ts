namespace Interface {
    interface Obj {
        name: string
        [key: string]: string
    }
    interface Obj3 {
        age: string
    }
    type Obj2 = {
        name: string
    }
    let a: Obj = {
        name: 'a'
    } // interface
    let b: Obj2 = {
        name: 'b'
    } //type
    let user: Record<string, string> // key string value string

    // 把interface 赋值给Record的时候需要明确interface里面的属性，interface后续可以新增合并，Record类型不能新增合并，type是固定的

    user = a; // interface 赋值给Record类型会报错，解决方案增加索引签名
    user = b; // type类型是没有问题的
}

