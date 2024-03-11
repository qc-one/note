
import _state from './state'
import {
    INCREMENT,
    SUBTRACT
} from './const'
const reducer = (state = _state, action) => {
    let new_state = Object.assign({}, state)
    switch ( action.type ) {
        case INCREMENT:
            new_state.num ++ ;
            break;
        case SUBTRACT:
            new_state.num -= action.num;
            break;
    }
    return new_state
}

export default reducer