import React, { Component } from 'react';
import {nanoid} from 'nanoid';
import { connect } from 'react-redux';
import { createAddpersonAction } from '../../redux/actions/person'
import Item from 'antd/lib/list/Item';

class Person extends Component {
    render() {
        console.log(this.props, 'lll');
        const { person, count } = this.props;
        return (
            <div>
                <h2>我是Person组件</h2>
                <input type="text" ref={c => {this.name = c}} placeholder="输入名字"/>
                <input type="text" ref={c => {this.age = c}} placeholder="输入年龄"/>
                <button onClick={this.addPerson}>添加{count}</button>
                <ul>
                    {
                        person.map((p) => {
                            return (
                                <li key={p.id}>名字：{p.name}年龄：{p.age}</li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
    addPerson = () => {
        let name = this.name.value;
        let age = this.age.value;
        let personObj = {id: nanoid(), name, age}
        console.log(personObj);
        this.props.addPerson(personObj);
    }
}

export default connect(
    state => ({
        person: state.person,
        count: state.count
    }),
    {
        addPerson: createAddpersonAction
    }
)(Person);
