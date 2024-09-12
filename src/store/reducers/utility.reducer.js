export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_IS_COMMENTS_LOADING = 'SET_IS_COMMENTS_LOADING'
export const SET_IS_LIST_LOADING = 'SET_IS_LIST_LOADING'
export const MODAL_CONTENT = 'MODAL_CONTENT'
export const SET_FOLLOWING_BTNS = 'SET_FOLLOWING_BTNS'
export const SET_NAVBAR_SECTION = 'SET_NAVBAR_SECTION'

const initialState = {
  isLoading: false,
  isCommentLoading: false,
  isListLoading: false,
  disableFollowingBtn: false,
  modalContent: {},
  navBarSection: ''
}

export function utilityReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };

    case SET_IS_COMMENTS_LOADING:
      return { ...state, isCommentLoading: action.isCommentLoading };

    case SET_IS_LIST_LOADING:
      return { ...state, isListLoading: action.isListLoading };

    case SET_FOLLOWING_BTNS:
      return { ...state, disableFollowingBtn: action.btnState };


    case SET_NAVBAR_SECTION:
      return { ...state, navBarSection: action.section };
    default:
      return state
  }
}