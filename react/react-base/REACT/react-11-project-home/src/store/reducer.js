

import { combineReducers } from 'redux'

import user from './user'
import allen from './allen'

const reducer = combineReducers({
	user,allen
})

export default reducer
