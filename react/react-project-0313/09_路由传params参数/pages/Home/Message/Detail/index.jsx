import React, { Component } from 'react';

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
        let {id, title} = this.props.match.params;
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
