import React, { Component } from 'react';
import {Link, Route, NavLink} from 'react-router-dom'

import Home from './pages/Home' // 路由组件
import About from './pages/About' // 路由组件
import Header from './components/Header' // 一般组件
import MyNavLink from './components/MyNavLink'

import './App.css'
class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Header/>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/* 原生html中，靠<a>跳转不同的页面 */}
                            {/* <a className="list-group-item active" href="./about.html">About</a>
                            <a className="list-group-item" href="./home.html">Home</a> */}
                            {/* 在React中靠路由连接实现切换组件 */}
                            {/* <NavLink activeClassName="active" className="list-group-item" to="/about">About</NavLink>
                            <NavLink activeClassName="active" className="list-group-item" to="/home">Home</NavLink> */}
                            <MyNavLink to="/about" title="About">About</MyNavLink>
                            <MyNavLink to="/home" title="Home">Home</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/* 注册路由 */}
                                <Route path="/about" component={About}/>
                                <Route path="/home" component={Home}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
