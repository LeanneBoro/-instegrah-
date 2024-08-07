import { SET_IS_LOADING } from '../actions/utility.actions'

const initialState = {
    isLoading: false
  }
  
  export function utilityReducer(state = initialState, action = {}) {
    switch (action.type) {
      case SET_IS_LOADING:
        return { ...state, isLoading: action.isLoading };
      default:
        return state
    }
  }