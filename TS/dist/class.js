// class 的基本用法 继承和类型约束 implements
// class 的修饰符 readonly private protected public
// super 原理
// get set
// 虚拟dom 通过js渲染真是dom
class Dom {
    constructor(name) {
        console.log(name, 'name');
    }
    // 创建节点的方法
    createElement(el) {
        return document.createElement(el);
    }
    // 填充文本的方法
    setText(el, text) {
        el.textContent = text;
    }
    // 渲染函数
    render(data) {
        let root = this.createElement(data.tag);
        if (data.children && Array.isArray(data.children)) {
            data.children.forEach((item) => {
                let child = this.render(item);
                root.appendChild(child);
            });
        }
        else {
            this.setText(root, data.text);
        }
        return root;
    }
}
class Vue extends Dom {
    constructor(options) {
        super('qin');
        this.options = options;
        this.init();
    }
    init() {
        let data = {
            tag: "div",
            children: [
                {
                    tag: "section",
                    text: "我是子节点1"
                },
                {
                    tag: "section",
                    text: "我是子节点2"
                }
            ]
        };
        let app = typeof this.options.el === 'string' ? document.querySelector(this.options.el) : this.options.el;
        app.appendChild(this.render(data));
    }
}
new Vue({
    el: "#app"
});
//# sourceMappingURL=class.js.map