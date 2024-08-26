export const SET_USER = 'SET_USER'
export const SET_USER_POSTS = 'SET_USER_POSTS'
export const SET_USERS_DATA = 'SET_USERS_DATA'


const initialState = {
    user: null,
    usersData : []
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user };
        case SET_USER_POSTS:
            return { ...state, posts: action.posts };
         case SET_USERS_DATA:
            return {...state, usersData: action.users}
        default:
            return state;
    }
}