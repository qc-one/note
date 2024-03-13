import React, { Component } from 'react';
import axios from 'axios';

import './App.css'

import Search from './components/Search'
import List from './components/List'

class App extends Component {
    state = {
        userData: [],
        isFirst: true,
        isLoading: false,
        err: ''
    }
    render() {
        return (
            <div className="container">
                <Search updateAppState={this.updateAppState}/>
                <List {...this.state}/>
            </div>
        );
    }
    updateAppState = (stateObj) => {
        this.setState({
            ...stateObj
        })
    }
}

export default App;
