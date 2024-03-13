import React, {useContext} from 'react';

import './index.less'

import { ColorContext, UPDATE_COLOR } from '../../redux/color';


const Buttons = props => {
    const {colorDispatch} = React.useContext(ColorContext);
    return (
        <React.Fragment>
            <button onClick={() => {
                colorDispatch({type: UPDATE_COLOR, color: "red"})
            }}>红色</button>
            <button onClick={() => {
                colorDispatch({type: UPDATE_COLOR, color: "blue"})
            }}>黄色</button>
        </React.Fragment>
    );
};

export default Buttons;
