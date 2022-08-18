//执行具体指令的方法
const compileUtil = {
    setVal(expr,vm,inputVal){
        expr.split('.').reduce((data, currentVal) => {
            data[currentVal] = inputVal;
        }, vm.$data);
    },
    getVal(expr,vm) { 
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal];
        }, vm.$data);
    },
    getContent(expr,vm){
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1],vm);
        })
    },
    text(node, expr, vm) { // expr:msg {{}}
        let value;
        if (/\{\{/.test(expr)) {//{{a}} {{person.name}}
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                new Watcher(vm,args[1],(newVal) => {
                    this.update.textUpdate(node, this.getContent(expr,vm));
                })  
                return this.getVal(args[1],vm);
            })
        } else { 
            value = this.getVal(expr,vm);
        }
        this.update.textUpdate(node, value);
    },
    html(node, expr, vm) { 
        const value = this.getVal(expr,vm);
        new Watcher(vm,expr,(newVal) => {
            this.update.htmlUpdate(node, newVal);
        })
        this.update.htmlUpdate(node, value);
    },
    model(node, expr, vm) { 
        const value = this.getVal(expr,vm);
        //绑定更新函数   数据 => 视图
        new Watcher(vm,expr,(newVal) => {
            this.update.modelUpdate(node, newVal);
        })
        // 视图 => 数据 => 视图
        node.addEventListener('input',(e) => {
            this.setVal(expr,vm,e.target.value);
        });
        this.update.modelUpdate(node, value);
    },
    on(node,expr,vm,eventName) { 
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName,fn.bind(vm),false)
    },
    //更新数据的函数
    update: {
        textUpdate(node,value) { 
            node.textContent = value;
        },
        htmlUpdate(node,value) { 
            node.innerHTML = value;
        },
        modelUpdate(node,value) { 
            node.value = value;
        }
    }
}
//指令解析器
class Compile { 
    constructor(el,vm) { 
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        //1、获取文档碎片对象，放入内存中会减少页面的回流和重绘
        const fragment = this.nodeFragment(this.el);
        //2、编译fragment
        this.compile(fragment);
        // console.log(fragment.childNodes);
        //3、追加子元素到根元素
        this.el.appendChild(fragment);
    }
    //编译fragment
    compile(f) { 
        //获取子节点
        const childNodes = f.childNodes;
        [...childNodes].forEach(child => { 
            if (this.isElementNode(child)) { //是元素节点
                //编译元素节点
                this.compileElement(child);
            } else { //文本节点
                //编译文本节点
                this.compileText(child);
            }
            if (child.childNodes && child.childNodes.length) {
                this.compile(child);
            }
        })
    }
    //编译元素节点
    compileElement(node) { 
        // <div v-text = "msg"></div>
        const attributes = node.attributes;
        [...attributes].forEach((attr) => { 
            let { name, value } = attr;
            if (this.isDirective(name)) { //v-text v-html v-model v-on:click
                const [, dirctive] = name.split('v-');//text html model on:click
                const [dirName, eventName] = dirctive.split(':');//text html model on
                //更新数据  数据驱动视图
                compileUtil[dirName](node, value, this.vm, eventName)
                //删除有指令的标签上的属性
                node.removeAttribute('v-'+dirctive)
            }else if(this.isEventName(name)){//@click = 'handleClick'
                const [dirName, eventName] = name.split('@');//@click
                compileUtil['on'](node, value, this.vm, eventName)
            }
        })
    }
    //判断一个指令是否以v-开头
    isDirective(attrName) { 
        return attrName.startsWith('v-');
    }
    //判断一个指令是否以@开头
    isEventName(attrName){
        return attrName.startsWith('@');
    }
    //编译文本节点
    compileText(node) { //{{}}
        const content = node.textContent;
        if (/\{\{(.*?)\}\}/.test(content)) { 
            compileUtil['text'](node,content,this.vm)
        }
    }
    //获取文档碎片对象
    nodeFragment(el) {
        //创建文档碎片
        const f = document.createDocumentFragment();
        let firstChild;
        while (firstChild = el.firstChild) { 
            f.appendChild(firstChild)
        }
        return f;
    }
    //判断是否为元素节点
    isElementNode(node) { 
        return node.nodeType === 1;
    }
}
class MVue { 
    constructor(options) { 
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if (this.$el) { 
            //1.实现数据的观察者
            new Observer(this.$data);
            //2.实现一个指令的解析器
            new Compile(this.$el, this);
            this.proxyData(this.$data);
        }
    }
    proxyData(data){
        for(cost key in data) {
            Object.defineProperty(this,key,{
                get(){
                    return data[key];
                },
                set(newVal){
                    data[key] = newVal;
                }
            })
        }
    }
}




