import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Item from '../Item';

class List extends Component {
    static propTypes = {
        changeTodo: PropTypes.func.isRequired,
        todos: PropTypes.array.isRequired,
        delHandle: PropTypes.func.isRequired
    }
    render() {
        let {todos} = this.props;
        return (
            <div>
                <ul className="todo-main">
                    {
                        todos.map((v, i) => {
                            return <Item todo={v} key={v.id} changeCheck={this.changeCheck} delHandle={this.delHandle}/>
                        })
                    }
                </ul>
            </div>
        );
    }
    changeCheck = (todo, flag) => {
        this.props.changeTodo(todo, flag)
    }
    // 删除todo
    delHandle = (todo) => {
        this.props.delHandle(todo);
    }
}

export default List;
