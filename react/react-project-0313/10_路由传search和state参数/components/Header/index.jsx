import React, { Component } from 'react';

class Header extends Component {
    render() {
        console.log('Header组件收到的props', this.props);
        return (
            <div>
                <div className="col-xs-offset-2 col-xs-8">
                    <div className="page-header">
                        <h2>React Router Demo</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
