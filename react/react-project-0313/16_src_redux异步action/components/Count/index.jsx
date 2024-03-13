import React, { Component } from 'react';
import store from '../../redux/store'

// 引入actionCreator，专门用于创建action对象
import {createIncrementAction, createDecrementAction, createIncrementAsyncAction} from '../../redux/count_action_creators'

class Count extends Component {
    state = {
        count: 0
    }
    componentDidMount() {
        // 检测redux中数据的变化，只要数据变化，就调用render
        // store.dispatch(createDecrementAction(1));
        // store.subscribe(() => {
        //     // redux中的任一数据发生改变就会执行该回调
        //     this.setState({});
        // })
        store.dispatch(createIncrementAsyncAction(1, 3000))
    }
    render() {
        const { count } = this.state; 
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
                <h1>当前求和为：{store.getState()}</h1>
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
        // store.dispatch({
        //     type: 'increment',
        //     data: value*1
        // })
        store.dispatch(createIncrementAction(value*1))
    }
    // 减
    decrementStore = () => {
        const { value } = this.selectNumber;
        // store.dispatch({
        //     type: 'decrement',
        //     data: value*1
        // })
        store.dispatch(createDecrementAction(value*1))
        
    }
    // 奇数再加
    incrementIfOddStore = () => {
        const { value } = this.selectNumber;
        const count = store.getState();
        if (count % 2 !== 0) {
            // store.dispatch({
            //     type: 'increment',
            //     data: value*1
            // })
            store.dispatch(createIncrementAction(value*1))
        }
    }
    // 异步加
    incrementAsyncStore = () => {
        const { value } = this.selectNumber;
        const count = store.getState();
        // setTimeout(() => {
        //     // store.dispatch({
        //     //     type: 'increment',
        //     //     data: value*1
        //     // })
        //     store.dispatch(createIncrementAction(value*1))
        // }, 2000);
        // 发送异步action
        store.dispatch(createIncrementAsyncAction(value*1, 3000))
    }
}

export default Count;
