import { SET_IS_COMMENTS_LOADING, SET_IS_LOADING } from "../reducers/utility.reducer"


export function setIsLoading(isLoading) {
  return {
    type: SET_IS_LOADING,
    isLoading
  }
}

export function setIsCommentsLoading(isLoading) {
  return {
    type: SET_IS_COMMENTS_LOADING,
    isLoading
  }
}

export function setModalContent(content){

}