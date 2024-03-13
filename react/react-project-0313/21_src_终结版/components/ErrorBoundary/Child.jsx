import React, { Component } from 'react';

class Child extends Component {
    state = {
        // users: [
        //     {id: 1, name: '小明', age: 18},
        //     {id: 2, name: '小gang', age: 19},
        //     {id: 3, name: '小hong', age: 20}
        // ]
        users: 'qwe'
    }
    render() {
        return (
            <div>
                <h1>我是子组件</h1>
                {
                    this.state.users.map((item) => {
                        return (
                            <h2 key={item.id}>{item.name}---{item.age}</h2>
                        )
                    })
                }
            </div>
        );
    }
}

export default Child;
