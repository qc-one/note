var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import axios from "axios";
import 'reflect-metadata';
// 属性装饰器 PropertyDecorator
// 参数装饰器 ParameterDecorator
// 方法装饰器 MethodDecorator PropertyDescriptor
// 装饰器工厂
// import 'reflect-metadata'
// axios
var Decorator;
(function (Decorator) {
    // 类装饰器 ClassDecorator target构造函数
    const Base = (name) => {
        const fn = (target) => {
            // console.log(target)
            target.prototype.name = name || 'base';
            target.prototype.say = function () {
                // console.log('base say')
            };
        };
        return fn;
    };
    // 方法装饰器 MethodDecorator PropertyDescriptor
    const Get = (url) => {
        const fn = (target, key, descriptor) => {
            // console.log(target)
            // console.log(key)
            // console.log(descriptor)
            const value = Reflect.getMetadata('key', target);
            axios.get(url).then((res) => {
                // console.log(res)
                descriptor.value(value ? res.data[value] : res.data);
            });
        };
        return fn;
    };
    // 参数装饰器 ParameterDecorator
    const Result = () => {
        const fn = (target, key, index) => {
            console.log(target);
            console.log(key);
            console.log(index);
            Reflect.defineMetadata('key', 'result', target);
        };
        return fn;
    };
    // 属性装饰器 PropertyDecorator
    const name = (target, key) => {
        console.log(target, key);
    };
    let Http = class Http {
        qc;
        constructor() {
            this.qc = '123';
        }
        getList(data) {
            console.log('getList', data);
        }
    };
    __decorate([
        Get('https://api.apiopen.top/api/getHaoKanVideo?page=1&size=10'),
        __param(0, Result()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Http.prototype, "getList", null);
    Http = __decorate([
        Base('qc'),
        __metadata("design:paramtypes", [])
    ], Http);
    const http = new Http();
    // Base(Http)
    // http.say()
    // console.log(http.name)
})(Decorator || (Decorator = {}));
//# sourceMappingURL=decorator.js.map