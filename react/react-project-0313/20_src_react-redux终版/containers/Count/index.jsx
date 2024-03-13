// 引入Count的UI组件
// import CountUI from '../../components/Count';
// 引入redux
import store from '../../redux/store'; 
// 引入connect用于连接UI组件与redux
import {connect} from 'react-redux'
// 引入action
import { createIncrementAction, createDecrementAction} from '../../redux/actions/count'
import { number } from 'prop-types';

import React, { Component } from 'react';

// 定义UI组件
class Count extends Component {
    state = {
        // count: 0
    }
    render() {
        console.log(this.props, 'ppp');
        // const { count } = this.state; 
        const { count } = this.props; 
        return (
            <div>
                <h1>当前求和为：{count}</h1>
                <select ref={ c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.incrementIfOdd}>和为奇数加</button>
                <button onClick={this.incrementAsync}>异步加</button>
                <hr />
                <h1>当前求和为：{count}</h1>
                <select ref={ c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button onClick={this.incrementStore}>+</button>
                <button onClick={this.decrementStore}>-</button>
                <button onClick={this.incrementIfOddStore}>和为奇数加</button>
                <button onClick={this.incrementAsyncStore}>异步加</button>
            </div>
        );
    }
    // 加法
    increment = () => {
        const { value } = this.selectNumber;
        const { count } = this.state;
        this.setState({
            count: count + value*1
        })
    }
    // 减法
    decrement = () => {
        const { value } = this.selectNumber;
        const { count } = this.state;
        this.setState({
            count: count - value*1
        })
    }
    // 奇数再加
    incrementIfOdd = () => {
        const { value } = this.selectNumber;
        const { count } = this.state;
        if (count % 2 !== 0) {
            this.setState({
                count: count + value*1
            })
        }
    }
    // 异步加
    incrementAsync = () => {
        const { value } = this.selectNumber;
        const { count } = this.state;
        setTimeout(() => {
            this.setState({
                count: count + value*1
            })
        }, 3000);
    }
    // redux
    // 加
    incrementStore = () => {
        const { value } = this.selectNumber;
        this.props.add(value*1);
    }
    // 减
    decrementStore = () => {
        const { value } = this.selectNumber;
        this.props.jian(value*1);
    }
    // 奇数再加
    incrementIfOddStore = () => {
        const { value } = this.selectNumber;
        // if (count % 2 !== 0) {

        // }
    }
    // 异步加
    incrementAsyncStore = () => {
        const { value } = this.selectNumber;
    }
}


// 创建Count的容器组件
// connect接收两个参数，必须是函数，第一个参数为redux中所保存的状态，第二个参数为操作状态的方法
// mapStateToProps函数的返回值作为状态传递给了UI组件，返回值必须为一个对象，对象的key作为传递给UI组件props的key，value就作为传递给UI组件props的value---状态
function mapStateToProps(state) {
    return {
        count: state.count
    }
}
// mapDispatchToProps函数的返回值作为状态传递给了UI组件，返回值必须为一个对象，对象的key作为传递给UI组件props的key，value就作为传递给UI组件props的value---操作状态的方法
function mapDispatchToProps(dispatch) {
    return {
        add: (number) => {
            // dispatch({type: 'increment', data: number})
            dispatch(createIncrementAction(number))
        },
        jian: number => dispatch(createDecrementAction(number))
    }
}
// connect函数拥有监听store变化的能力
// const CountContainer = connect(mapStateToProps, mapDispatchToProps)(CountUI);
// mapDispatchToProps的简写方式
const CountContainer = connect(mapStateToProps, {
    add: createIncrementAction,
    jian: createDecrementAction
})(Count);

export default CountContainer


