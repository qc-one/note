import React, { Component, PureComponent } from 'react';
import './index.css'

class Renderprops extends PureComponent {
    state = {
        carName: '雅阁'
    }
    render() {
        return (
            <div className="parent">
                <h3>我是父组件</h3>
                <span>我的车是：{this.state.carName}</span>
                {/* render名字是自定义的 */}
                <A render={(name) => {return <B name={name}><h1>bbbb</h1></B>}}>
                    <div>aaa</div>
                </A>
            </div>
        );
    }
}
class A extends PureComponent {
    state = {
        name: 'qin'
    }
    render() {
        console.log(this, 'aaaa');
        let {name} = this.state;
        return (
            <div className="a">
                <h3>我是A组件</h3>
                {this.props.render(name)}
            </div>
        );
    }
}
class B extends PureComponent {
    render() {
        return (
            <div className="b">
                <h3>我是B组件</h3>
                <h1>{this.props.name}</h1>
                {this.props.children}
            </div>
        );
    }
}

export default Renderprops;
