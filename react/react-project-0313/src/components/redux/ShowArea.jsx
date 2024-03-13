import React from 'react';

import './index.less'

import { ColorContext } from '../../redux/color';

const ShowArea = (props) => {
    const {color} = React.useContext(ColorContext);
    return (
        <div className='show-area' style={{color: color}}>字体颜色展示为{color}</div>
    )
}

export default ShowArea;
