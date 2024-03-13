import React from 'react';

const Son = (props) => {
    console.log(props);
    return (
        <div className='son'>
            <h2>son</h2>
            {props.name}
        </div>
    )
}

export default Son;
