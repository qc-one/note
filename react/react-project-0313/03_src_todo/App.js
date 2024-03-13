import React,{ Component} from 'react';
import {nanoid} from 'nanoid'

// import Hello from './components/Hello/hello'
// import Welcome from './components/Welcome'
import Header from './components/Header'
import Footer from './components/Footer';
import List from './components/List';

import './App.css';
class App extends Component {
    state = {
        todos: [
            {id: 1, name: '吃饭', done: true},
            {id: 2, name: '睡觉', done: true},
            {id: 3, name: '敲代码', done: false}
        ]
    }
    render() {
        let {todos} = this.state;
        return (
            <div>
                <div className="todo-container">
                    <div className="todo-wrap">
                        <Header changeTodo={this.addTodo}/>
                        <List todos={todos} changeTodo={this.changeTodo} delHandle={this.deleteHandle}/>
                        <Footer todos={todos} allChecked={this.allChecked} clearAll={this.clearAll}/>
                    </div>
                </div>
            </div>
        )
    }
    addTodo = (data) => {
        this.setState({
            todos: [{
                id: nanoid(),name: data, done: false
            }, ...this.state.todos]
        })
    }
    changeTodo = (todo, flag) => {
        let obj = this.state.todos.map((v, i) => {
            if (v.id === todo.id) {
                return {...v, done: flag}
            }
            else {
                return v
            }
        })
        this.setState({
            todos: obj
        });
    }
    // 删除todo
    deleteHandle = (todo) => {
        let obj = this.state.todos.filter((v, i) => {
            if (v.id !== todo.id) {
                return v
            }
        })
        this.setState({
            todos: obj
        });
    }
    // 全选
    allChecked= (flag) => {
        let obj = this.state.todos.map((v, i) => {
            return {...v, done: flag}
        })
        this.setState({
            todos: obj
        });
    }
    // 清楚已经完成的
    clearAll = () => {
        let obj = this.state.todos.filter((v, i) => {
            if (!v.done) {
                return v
            }
        })
        this.setState({
            todos: obj
        });
    }
}

export default App;
