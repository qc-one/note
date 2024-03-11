
//在这里，我们的actionCreator只负责创建action，不需要负责传递action了

import {
    INCREMENT,
    SUBTRACT
} from './const'

export default {

    increment () {
        let action = {
            type: INCREMENT
        }
        return action
    },
    subtract () {
        return dispatch => {
            setTimeout(() => {
                let num = Math.floor(Math.random()*10)
    
                let action = {
                    type: SUBTRACT,
                    num
                }
    
                dispatch( action )
    
            }, 500);
        }
    }

}