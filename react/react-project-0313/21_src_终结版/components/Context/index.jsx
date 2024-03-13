import React, { Component } from 'react';

import './index.css'

// 创建一个上下文,context对象
const MyContext = React.createContext();

class A extends Component {
    state = {
        username: 'aaa'
    }
    render() {
        return (
            <div className='parent'>
                <h3>我是A组件</h3>
                <h4>我的用户名是：{this.state.username}</h4>
                {/* <B username={this.state.username}/> */}
                <MyContext.Provider value={this.state}>
                    <B/>
                </MyContext.Provider>
            </div>
        );
    }
}
class B extends Component {
    // 声明接收context
    static contextType = MyContext
    render() {
        console.log(this, 'this');
        return (
            <div className='child'>
                <h3>我是B组件</h3>
                <h4>从A组件接收到的用户名：{this.props.username}</h4>
                <C/>
            </div>
        );
    }
}
class C extends Component {
    // 声明接收context
    static contextType = MyContext
    render() {
        console.log(this);
        return (
            <div className='grand'>
                <h3>我是C组件</h3>
                <h4>从A组件接收到的用户名：{this.context.username}</h4>
                <D/>
            </div>
        );
    }
}
function D() {
    return (
        <div className='grand'>
            <h3>我是D组件</h3>
            <h4>从A组件接收到的用户名：</h4>
            <MyContext.Consumer>
                {
                    (value) => {
                        // 可以使用模板字符串
                        return (
                            <h4>从A组件接收到的用户名：{value.username}</h4>
                        )
                    }
                }
            </MyContext.Consumer>
        </div>
    )
}

export default A;
