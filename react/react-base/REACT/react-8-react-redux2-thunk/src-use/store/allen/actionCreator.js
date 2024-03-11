import {
    INCREMENT,
    SUBTRACT
} from './const'

export default {


    increment () {
        return {
            type: INCREMENT
        }
    },
    subtract () {
        return dispatch => {
            setTimeout(() => {
                let num = Math.floor(Math.random()*5)
                dispatch({
                    type: SUBTRACT,
                    num
                })
            }, 1000);

        }
    }


}