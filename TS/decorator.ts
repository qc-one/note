import axios from "axios"
import 'reflect-metadata'

// 属性装饰器 PropertyDecorator
// 参数装饰器 ParameterDecorator
// 方法装饰器 MethodDecorator PropertyDescriptor
// 装饰器工厂
// import 'reflect-metadata'
// axios

namespace Decorator {
    // 类装饰器 ClassDecorator target构造函数
    const Base = (name: string) => {
        const fn: ClassDecorator = (target) => {
            // console.log(target)
            target.prototype.name = name || 'base'
            target.prototype.say = function () {
                // console.log('base say')
            }
        }
        return fn
    }
    // 方法装饰器 MethodDecorator PropertyDescriptor
    const Get = (url: string) => {
        const fn: MethodDecorator = (target, key, descriptor: PropertyDescriptor) => {
            // console.log(target)
            // console.log(key)
            // console.log(descriptor)
            const value = Reflect.getMetadata('key', target)
            axios.get(url).then((res) => {
                // console.log(res)
                descriptor.value(value ? res.data[value] : res.data)
            })
        }
        return fn
    }
    // 参数装饰器 ParameterDecorator
    const Result = () => {
        const fn: ParameterDecorator = (target, key, index) => {
            console.log(target)
            console.log(key)
            console.log(index)
            Reflect.defineMetadata('key', 'result', target)
        }
        return fn
    }
    // 属性装饰器 PropertyDecorator
    const name: PropertyDecorator = (target, key) => {
        console.log(target, key);
    }

    @Base('qc')
    class Http {
        qc: string
        constructor() {
            this.qc = '123'
        }

        @Get('https://api.apiopen.top/api/getHaoKanVideo?page=1&size=10')
        getList(@Result() data: any) {
            console.log('getList', data)
        }
    }
    const http: any = new Http()
    // Base(Http)
    // http.say()
    // console.log(http.name)
}