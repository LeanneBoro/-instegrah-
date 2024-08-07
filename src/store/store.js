import {
    combineReducers,
    compose,
    legacy_createStore as createStore
} from 'redux'

import { postReducer } from './reducers/post.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { utilityReducer } from './reducers/utility.reducer.js'

const rootReducer = combineReducers({
    postModule: postReducer,
    userModule: userReducer,
    utilityModule: utilityReducer,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store