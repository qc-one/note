import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom'

import Detail from './Detail'

class Message extends Component {
    state = {
        messageArr: [
            {id: '01', title: '消息1'},
            {id: '02', title: '消息2'},
            {id: '03', title: '消息3'},
            {id: '04', title: '消息4'}
        ]
    }
    render() {
        let {messageArr} = this.state;
        return (
            <div>
                <ul>
                    {
                        messageArr.map((item) => {
                            return (
                                <li key={item.id}>
                                    {/* 向路由组件传params参数 */}
                                    {/* <Link to={`/home/message/detail/${item.id}/${item.title}`} title="News">{item.title}</Link> */}

                                    {/* 向路由组件传search参数 */}
                                    <Link to={`/home/message/detail/?id=${item.id}&title=${item.title}`} title="News">{item.title}</Link>

                                    {/* 向路由组件传state参数 */}
                                    {/* <Link replace={true} to={{pathname: '/home/message/detail', state: {id: item.id, title: item.title}}} title="News">{item.title}</Link> */}

                                    &nbsp;<button onClick={this.pushShow(item.id, item.title)}>push查看</button>
                                    &nbsp;<button onClick={this.replaceShow(item.id, item.title)}>replace查看</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr/>
                <Switch>
                    {/* 声明接收params参数 */}
                    {/* <Route path="/home/message/detail/:id/:title" component={Detail}/> */}

                    {/* search参数无需声明接收，正常注册路由即可 */}
                    {/* <Route path="/home/message/detail" component={Detail}/> */}
                    
                    {/* state参数无需声明接收，正常注册路由即可 */}
                    <Route path="/home/message/detail" component={Detail}/>
                </Switch>

                <button onClick={this.back}>回退</button>
                <button onClick={this.forward}>前进</button>
            </div>
        );
    }
    // 编程式路由导航，replace
    replaceShow = (id, title) => {
        return () => {
            // replace跳转+params参数
            // this.props.history.replace(`/home/message/detail/${id}/${title}`);

            // replace跳转+query参数
            // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`);

            // replace跳转+state参数
            this.props.history.replace(`/home/message/detail`, {
                id, title
            });
        }
    }
    pushShow = (id, title) => {
        return () => {
            // push跳转+params参数
            // this.props.history.push(`/home/message/detail/${id}/${title}`);

            // push跳转+params参数
            // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`);

            // push跳转+state参数
            this.props.history.push(`/home/message/detail`, {
                id, title
            });
        }
    }
    back = () => {
        this.props.history.goBack();
    }
    forward = () => {
        this.props.history.goForward();
    }
    go = () => {
        this.props.history.go(2);
    }
}

export default Message;
