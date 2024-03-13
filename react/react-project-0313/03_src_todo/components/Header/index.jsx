import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    static propTypes = {
        changeTodo: PropTypes.func.isRequired
    }
    render() {
        return (
            <div>
                <div className="todo-header">
                    <input type="text" placeholder="请输入你的任务名称，按回车键确认" onKeyUp={this.enterHandle}/>
                </div>
            </div>
        );
    }
    enterHandle = (e) => {
        const event = e || window.event
        if (event.keyCode !== 13) return
        if (event.target.value.trim() === '') {
            alert('输入的内容不能为空');
            return
        }
        this.props.changeTodo(event.target.value);
        event.target.value = '';
    }
}
// 属性规则
// Header.propTypes = {
//     changeTodo: PropTypes.func
// }

export default Header;
