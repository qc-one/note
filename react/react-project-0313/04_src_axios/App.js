import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={this.getData}>获取数据</button>
                <button onClick={this.getDataCars}>获取数据</button>
            </div>
        );
    }
    getData = () => {
        axios.get('http://localhost:3000/api1/students').then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }
    getDataCars = () => {
        axios.get('http://localhost:3000/api2/cars').then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }
}

export default App;
