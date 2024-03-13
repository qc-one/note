import React, { Component } from 'react';
import qs from 'querystring';

// let obj = {a:123,b:234};
// console.log(qs.stringify(obj)); // a=123&b=234
// let str = 'a=123&b=234';
// console.log(qs.parse(str)); // {a:123,b:234}

const data = [
    {id: '01', content: '你好，小明'},
    {id: '02', content: '你好，小hong '},
    {id: '03', content: '你好，小lv'},
    {id: '04', content: '你好，小ljkj'}
]

class Detail extends Component {
    render() {
        console.log(this.props, 'proips');
        // 接收params参数
        // let {id, title} = this.props.match.params;

        // 接收search参数
        // let {search} = this.props.location;
        // let {id, title} = qs.parse(search.slice(1));

        // 接收state参数
        let {id, title} = this.props.location.state;
        
        let result = data.find((item) => {
            return item.id === id
        })
        return (
            <ul>
                <li>ID:{id}</li>
                <li>title:{title}</li>
                <li>内容:{result.content}</li>
            </ul>
        );
    }
}

export default Detail;
