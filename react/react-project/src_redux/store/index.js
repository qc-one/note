
import {createStore} from 'redux'//创建store
import reducer from './reducer'

const store = createStore(reducer)

export default store