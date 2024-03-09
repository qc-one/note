
import {createStore,applyMiddleware} from 'redux'//创建store
import reducer from './reducer'

import thunk from "redux-thunk"

const store = createStore(reducer,applyMiddleware(thunk))

export default store