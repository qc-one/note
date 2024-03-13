import React, { Component } from 'react';

import Child from './Child'

class Parent extends Component {
    state = {
        list: [1,2,3],
        hasErr: ''
    }
    // 当Parent的子组件出现错误时，会触发getDerivedStateFromError的调用，并携带错误信息
    static getDerivedStateFromError(error) {
        console.log('error', error);
        return {
            hasErr: error
        }
    }
    componentDidCatch() {
        alert(123);
        console.log('组件渲染出错');
    }
    render() {
        console.log('1');
        return (
            <div>
                <h1>我是父组件</h1>
                {this.state.hasErr ? <Child/> : ''}
                {/* <Child/> */}
                <button onClick={this.changeData}>改数据</button>
            </div>
        );
    }
    changeData = () => {
        let {list} = this.state;
        // 第一次点击没有问题，第二次点击会报错list.push is not a function
        // 因为第一次点击将list.push(4)的返回值赋值给了list，当第二次再次push操作时，实际上是4.push，因此报错
        this.setState({
            // list: [...list,4]
            list: list.push(4)
        })
    }
}

export default Parent;
