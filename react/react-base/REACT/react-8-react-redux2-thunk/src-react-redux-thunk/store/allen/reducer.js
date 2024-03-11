import {
    INCREMENT,
    SUBTRACT
} from './const'
import _state from './state'
const reducer = ( state = _state, action ) => {
    let new_state = Object.assign({}, state)

    switch ( action.type ) {
        case INCREMENT:
            new_state.num++;break;
        case SUBTRACT:
            new_state.num -= action.num;break;
        default: break;
    }

    return new_state
}

export default reducer