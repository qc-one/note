import React, { Component } from 'react';

import LazyLoad from './components/LazyLoad'
import Hooks from './components/Hooks'
import Fragment from './components/Fragment'
import Context from './components/Context'
import Optimize from './components/Optimize'
import Renderprops from './components/Renderprops'
import ErrorBoundary from './components/ErrorBoundary/Parent.jsx'

import './App.css'
class App extends Component {
    render() {
        return (
            <div>
                <ErrorBoundary/>
                <br/>
                <Renderprops/>
                <LazyLoad/>
                <Hooks/>
                <Fragment/>
                <Context/>
                <Optimize/>
            </div>
        );
    }
}

export default App;
