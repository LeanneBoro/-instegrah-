export const SET_IS_LOADING = 'SET_IS_LOADING'
export const MODAL_CONTENT = 'MODAL_CONTENT'

const initialState = {
    isLoading: false,
    modalContent: {}
  }
  
  export function utilityReducer(state = initialState, action = {}) {
    switch (action.type) {
      case SET_IS_LOADING:
        return { ...state, isLoading: action.isLoading };
      default:
        return state
    }
  }