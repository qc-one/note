// color.js
import React, {
    createContext
} from "react";

// 创建 context
export const ColorContext = createContext({});

// reducer
export const UPDATE_COLOR = "UPDATE_COLOR";
const reducer = (state, action) => {
    switch(action.type) {
        case UPDATE_COLOR:
            return action.color;
        default: 
            return state
    }
}

/**
 * 创建一个 Color 组件
 * Color 组件包裹的所有子组件都可以通过调用 ColorContext 访问到 value
 */
export const Color = props => {
    console.log(props);
    const [color, colorDispatch] = React.useReducer(reducer, 'blue');
    return ( 
        <ColorContext.Provider value = {
            {
                color,
                colorDispatch
            }
        }> 
            {
                props.children
            } 
        </ColorContext.Provider>
    );
};