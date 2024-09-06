export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_IS_COMMENTS_LOADING = 'SET_IS_COMMENTS_LOADING'
export const MODAL_CONTENT = 'MODAL_CONTENT'
export const SET_FOLLOWING_BTNS = 'SET_FOLLOWING_BTNS'

const initialState = {
  isLoading: false,
  isCommentLoading: false,
  disableFollowingBtn: false,
  modalContent: {}
}

export function utilityReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_IS_COMMENTS_LOADING:
      return { ...state, isCommentLoading: action.isLoading };
      case SET_FOLLOWING_BTNS:
        return { ...state, disableFollowingBtn: action.btnState };
    default:
      return state
  }
}