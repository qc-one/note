import React, { Component } from 'react';
import ReactDOM from 'react-dom'

// 类式组件
// class Hooks extends Component {
//     state = {
//         count: 0
//     }
//     myRef = React.createRef();
//     componentDidMount() {
//         this.timer = setInterval(() => {
//             this.setState({
//                 count: this.state.count + 1
//             })
//         }, 1000);
//     }
//     render() {
//         return (
//             <div>
//                 <h2>当前求和为：{this.state.count}</h2>
//                 <button onClick={this.add}>点我加一</button>
//                 <button onClick={this.unmount}>卸载组件</button>
//                 <input type="text" ref={this.myRef}/>
//                 <button onClick={this.showValue}>展示输入框的数据</button>
//             </div>
//         );
//     }
//     componentWillUnmount() {
//         clearInterval(this.timer);
//     }
//     showValue = () => {
//         let v = this.myRef.current.value;
//         alert(v);
//     }
//     add = () => {
//         this.setState(state => ({count: state.count + 1}))
//     }
//     unmount = () => {
//         ReactDOM.unmountComponentAtNode(document.getElementById('root'));
//     }
// }

// 函数式组件
function Hooks() {
    const [count, method] = React.useState(0);
    const [name, setName] = React.useState('tom');
    const myRef = React.useRef();
    React.useEffect(() => {
        console.log('@');
        let timer = setInterval(() => {
            // method(count+1)
            method(count => count + 1)
        }, 1000);
        // 返回的函数相当于componentWillUnmount
        return () => {
            clearInterval(timer)
        }
    }, []); // 空数组代表谁也不检测，不写代表谁都检测
    return (
        <div>
            <h2>当前求和为：{count}</h2>
            <h2>我的名字是：{name}</h2>
            <button onClick={add}>点我加一</button>
            <button onClick={changName}>改名</button>
            <button onClick={unmount}>卸载组件</button>
            <input type="text" ref={myRef}/>
            <button onClick={showValue}>展示输入框的数据</button>
        </div>
    );
    function showValue() {
        let v = myRef.current.value;
        alert(v);
    }
    // 卸载组件的回调
    function unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    }
    function add() {
        // method({count: state.count + 1})
        method(value => {
            return value + 1
        })
    }
    function changName() {
        setName('jack')
    }
}

export default Hooks;
