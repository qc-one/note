import React, { Component } from 'react';
import MyNavLink from '../../components/MyNavLink'
import {Route, Switch, Redirect} from 'react-router-dom'

import News from './News'
import Message from './Message'

class List extends Component {
    render() {
        return (
            <div>
                <div>
                    <ul className="nav nav-tabs">
                        <li>
                            <MyNavLink to="/home/news" title="News">News</MyNavLink>
                        </li>
                        <li>
                            <MyNavLink to="/home/message" title="Message">Message</MyNavLink>
                        </li>
                    </ul>
                    <div>
                    <Switch>
                        <Route path="/home/news" component={News}/>
                        <Route path="/home/message" component={Message}/>
                        <Redirect to="/home/news"></Redirect>
                    </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
