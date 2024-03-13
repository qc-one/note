import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

class MyNavLink extends Component {
    render() {
        console.log('MyNavLink', this.props);
        return (
            <div>
                {/* <NavLink activeClassName="active" className="list-group-item" {...this.props}>{this.props.children}</NavLink> */}
                {/* children属性由内部处理，已经带过来了 */}
                <NavLink activeClassName="active" className="list-group-item" {...this.props}/>
            </div>
        );
    }
}

export default MyNavLink;
