

import { combineReducers } from 'redux'
//引入分开的reducer
import one from './one/reducer'
import allen from './allen/reducer'
import user from './user/reducer'
import cars from './cars'
//将分开的reducer合并在一起，形成一个整体的reducer
const reducer = combineReducers({
    one,allen,user,cars
})

export default reducer