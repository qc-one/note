import React from 'react';

const Father = (props) => {
    console.log(props);
    const {children} = props;
    const child = React.Children.map(children, (item, index) => {
        const childProps = {
            ...item.props,
            // 使用 index 赋值 haxi 属性
            haxi: index
        };
        // 使用 元素和新的 props 克隆一个新的 react 元素
        return React.cloneElement(item, childProps);
    })
    return (
        <div className='father'>
            father
            {
                props.children
            }
            {
                child
            }
        </div>
    )
}

export default Father;
