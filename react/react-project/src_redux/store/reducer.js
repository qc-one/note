

import { combineReducers } from 'redux'
//引入分开的reducer
import one from './one/reducer'
//将分开的reducer合并在一起，形成一个整体的reducer
const reducer = combineReducers({
    one
})

export default reducer