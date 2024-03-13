import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class List extends Component {
    componentWillMount() {
        console.log(this.props.userData);
        this.token = PubSub.subscribe('getData', this.handleData);
    }
    render() {
        let {userData, isFirst, isLoading, err} = this.props;
        return (
            <div>
                <div className="row">
                    {
                        isFirst ?
                        <h2>欢迎</h2> : 
                        isLoading ? <h2>Loading....</h2> :
                        err ? <h2 style={{color: "red"}}>{err}</h2> :
                        userData.length > 0 ?
                        userData.map((obj) => {
                            return (
                                <div key={obj.id} className="card">
                                    <a rel="noreferrer" href={obj.html_url} target="_blank">
                                    <img alt="" src={obj.avatar_url} style={{width: "100px"}}/>
                                    </a>
                                    <p className="card-text">{obj.login}</p>
                                </div>
                            )
                        }) :
                        <h1>用户不存在</h1>
                    }
                </div>
            </div>
        );
    }
    handleData = (handleName, data) => {
        console.log(handleName, data, 'sub');
    }
    // 取消订阅消息
    unSubscribe = () => {
        PubSub.unsubscribe(this.token);
    }
    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }
}

export default List;
