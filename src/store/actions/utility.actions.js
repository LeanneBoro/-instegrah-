import { store } from '../store'

import { SET_IS_COMMENTS_LOADING, SET_IS_LOADING, SET_NAVBAR_SECTION } from "../reducers/utility.reducer"


export function setIsLoading(isLoading) {
  store.dispatch( {
    type: SET_IS_LOADING,
    isLoading
  })
}

export function setIsCommentsLoading(isLoading) {
  store.dispatch({
    type: SET_IS_COMMENTS_LOADING,
    isLoading
  })
}

export function setModalContent(content){

}

export function setNavBarSection(section){
// console.log("🚀 ~ setNavBarSection ~ section:", section)

  store.dispatch({
    type: SET_NAVBAR_SECTION,
    section
  })

}