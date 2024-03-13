import {React, Component} from 'react';
import hello from './hello.module.css';

export default class Hello extends Component {
    render() {
        return (
            <div>
                <h3 className={hello.welcome}>
                    Hello react
                </h3>
            </div>
        )
    }
}