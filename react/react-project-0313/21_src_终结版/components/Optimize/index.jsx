import React, { Component, PureComponent } from 'react';
import './index.css'

class Optimize extends PureComponent {
    state = {
        carName: '雅阁'
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(this.props, this.state); // 目前的props和state
    //     console.log(nextProps, nextState); // 接下来要变的目标props和state
    //     if (this.state.carName === nextState.carName) {
    //         return false
    //     }
    //     else {
    //         return true
    //     }
    // }
    render() {
        return (
            <div className="parent">
                <h3>我是父组件</h3>
                <span>我的车是：{this.state.carName}</span>
                <button onClick={this.changeCar}>换车</button>
                <Child carName={this.state.carName}/>
            </div>
        );
    }
    changeCar = () => {
        this.setState({
            carName: '奥迪'
        })
        // 错误写法
        // let obj = this.state;
        // obj.carName = '奥迪';
        // this.setState(obj);
    }
}

class Child extends PureComponent {
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(this.props, this.state); // 目前的props和state
    //     console.log(nextProps, nextState); // 接下来要变的目标props和state
    //     if (this.props.carName === nextProps.carName) {
    //         return false
    //     }
    //     else {
    //         return true
    //     }
    // }
    render() {
        console.log('子组件');
        return (
            <div className="child">
                <h3>我是子组件</h3>
                <h4>我接受到的车是：{this.props.carName}</h4>
            </div>
        );
    }
}

export default Optimize;
