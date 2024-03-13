import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Item extends Component {
    state = {
        mouse: false
    }
    static propTypes = {
        delHandle: PropTypes.func.isRequired
    }
    render() {
        let {todo} = this.props;
        let {mouse} = this.state;
        return (
            <div>
                <li style={{backgroundColor: mouse ? '#ddd' : 'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
                    <label>
                        {/* <input type="checkbox" checked={todo.done} onChange={this.changeTodo}/> */}
                        <input type="checkbox" checked={todo.done} onChange={this.handleCheck(todo)}/>
                        <span>{todo.name}</span>
                    </label>
                    <button onClick={this.deleteHandle(todo)} className="btn btn-danger" style={{display: mouse ? 'block' : 'none'}}>删除</button>
                </li>
            </div>
        );
    }
    handleMouse = (flag) => {
        return () => {
            this.setState({
                mouse: flag
            })
        }
    }
    handleCheck = (todo) => {
        return (event) => {
            this.props.changeCheck(todo, event.target.checked);
        }
    }
    deleteHandle = (todo) => {
        return () => {
            if (window.confirm('确定删除吗？')) {
                this.props.delHandle(todo);
            }
        }
    }
}

export default Item;
