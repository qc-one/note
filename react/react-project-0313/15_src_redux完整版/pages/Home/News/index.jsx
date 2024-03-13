import React, { Component } from 'react';

class News extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.history.push(`/home/message`);
        }, 2000);
    }
    render() {
        return (
            <div>
                news
            </div>
        );
    }
}

export default News;
