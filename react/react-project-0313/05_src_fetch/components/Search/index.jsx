import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';

class Search extends Component {
    render() {
        return (
            <div>
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">Search Github Users</h3>
                    <div>
                        <input ref={c => this.keyWordEle = c} type="text" placeholder="enter the name you search"/>&nbsp;<button onClick={this.search}>Search</button>
                    </div>
                </section>
            </div>
        );
    }
    search = async () => {
        let {keyWordEle: {value: keyword}} = this;
        this.props.updateAppState({isFirst: false, isLoading: true});
        // 使用axios发送网络请求
        // axios.get(`/api1/search/users?q=${keyword}`).then((res) => {
        //     PubSub.publish('getData', res.data.items);
        //     this.props.updateAppState({
        //         userData: res.data.items,
        //         isLoading: false
        //     });
        // }).catch((err) => {
        //     this.props.updateAppState({
        //         err: '请求出错了',
        //         isLoading: false
        //     });
        // })
        // 使用fetch发送网络请求
        // window.fetch('api1/search/users', {
        //     method: "GET",
        //     body: JSON.stringify({}),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }).then(
        //     (res) => {
        //         console.log('连接服务器成功了', res);
        //         return res.json()
        //     },
        //     (err) => {
        //         console.log('服务器连接失败了', err);
        //         return new Promise();
        //     }
        // ).then((data) => {
        //     console.log('数据返回成功', data);
        // }).catch((err) => {
        //     console.log(err);
        // })
        // window.fetch('api1/search/users', {
        //     method: "GET",
        //     body: JSON.stringify({}),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }).then((res) => {
        //     console.log('连接服务器成功了', res);
        //     return res.json()
        // }).then((data) => {
        //     console.log('数据返回成功', data);
        // }).catch((err) => {
        //     console.log(err);
        // })

        try {
            let res = await fetch('api1/search/users');
            let data = await res.json();
            console.log(data);
        } catch (e) {
            console.log(e, '请求出错');
        }
    }
}

export default Search;

