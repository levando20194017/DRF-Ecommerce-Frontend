import { createStore, combineReducers } from 'redux'
import { authReducer } from './reducers/auth'

const rootReducer = combineReducers({
    auth: authReducer
})
const store = createStore(rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__())
export default store