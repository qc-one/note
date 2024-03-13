import React, { Component } from 'react';
// import {Link, Route, Switch, Redirect} from 'react-router-dom'
import 'antd/dist/antd.css';
import { Button, DatePicker } from 'antd';
import { WechatOutlined, SearchOutlined  } from '@ant-design/icons'

import './App.css'

import Count from './components/Count'

const { RangePicker } = DatePicker;
class App extends Component {
    componentDidMount() {
        
    }
    render() {
        return (
            <div className="container">
                <button>app</button>
                <Button type="primary">Primary Button</Button>
                <Button type="primary" icon={<SearchOutlined />}>
                    Search
                </Button>
                <WechatOutlined style={{ fontSize: '16px', color: '#08c' }}/>
                <DatePicker onChange={this.onChange} />
                <RangePicker />
                <div className="redux">
                    <Count/>
                </div>
            </div>
        );
    }
    onChange(date) {
        console.log(date);
    }
}
export default App;
