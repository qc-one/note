// 对象混入 合并 A对象 B对象合并到一起
var Mixins;
(function (Mixins) {
    let a = {
        age: 18
    };
    // // 1、扩展运算符 浅拷贝 返回新的对象
    // let c = { ...a, ...b }
    // // 2、Object.assign() 浅拷贝 交叉类型
    // let d = Object.assign({}, a, b)
    console.log(structuredClone(a));
})(Mixins || (Mixins = {}));
// 类的混入 A类 B类 合并到一起
var Class;
(function (Class) {
    class Logger {
        log(msg) {
            console.log(msg);
        }
    }
    class Html {
        html(msg) {
            console.log(msg);
        }
    }
    class App {
        run() {
            console.log('run');
        }
    }
    /**
     * 插件混入函数，用于向传入的类中添加新的方法
     *
     * @param Base 需要被混入的类，需要是App的构造器类型
     * @returns 返回一个新的类，该类继承了传入的类并添加了新的方法
     */
    function pluginMixixns(Base) {
        return class extends Base {
            Logger = new Logger();
            Html = new Html();
            constructor(...args) {
                super(...args);
                this.Logger = new Logger();
                this.Html = new Html();
            }
            run() {
                this.Logger.log('run');
            }
            render() {
                this.Html.html('render');
                this.Logger.log('render');
            }
            html() {
                console.log('html');
            }
        };
    }
    const mixins = pluginMixixns(App);
    const app = new mixins();
    app.render();
})(Class || (Class = {}));
//# sourceMappingURL=mixins.js.map