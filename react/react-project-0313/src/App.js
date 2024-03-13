import React, { Component } from 'react';

import './App.less'

import ShowArea from './components/redux/ShowArea.jsx'
import Buttons from './components/redux/Buttons.jsx'
import Father from './components/children/Father';
import Son from './components/children/Son';

import { Color } from "./redux/color";
class App extends Component {
    render() {
        return (
            <div className='app'>
                <h1>app</h1>
                
                <Color>
                    <ShowArea></ShowArea>
                    <Buttons></Buttons>
                </Color>
                <hr></hr>
                
                <Father>
                    <Son name="a"></Son>
                    <Son name="b"></Son>
                </Father>
            </div>
        );
    }
}

export default App;
