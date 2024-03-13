import React, { Component } from 'react';

class Count extends Component {
    state = {
        count: 0
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
}

export default Count;
