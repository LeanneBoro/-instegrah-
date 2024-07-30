import {
    combineReducers,
    compose,
    legacy_createStore as createStore
} from 'redux'

import { postReducer } from './reducers/post.reducer.js'

const rootReducer = combineReducers({
    postModule: postReducer,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store