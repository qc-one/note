import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Footer extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        allChecked: PropTypes.func.isRequired
    }
    render() {
        let {todos} = this.props;
        // 已完成的数量
        let doneCount = todos.reduce((pre, currentDone) => {
            return pre + (currentDone.done ? 1 : 0) 
        }, 0)
        return (
            <div>
                <div className="todo-footer">
                    <label>
                    <input type="checkbox" onChange={this.allChecked} checked={todos.length === doneCount && todos.length > 0 ? true : false}/>
                    </label>
                    <span>
                    <span>已完成{doneCount}</span> / 全部{todos.length}
                    </span>
                    <button className="btn btn-danger" onClick={this.clearAll}>清除已完成任务</button>
                </div>
            </div>
        );
    }
    allChecked = (event) => {
        console.log(event.target.checked);
        this.props.allChecked(event.target.checked);
    }
    // 清楚已经完成
    clearAll = () => {
        this.props.clearAll();
    }
}

export default Footer;
