export const SET_USER = 'SET_USER'
export const SET_USER_POSTS = 'SET_USER_POSTS'

const initialState = {
    user: null,
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user };
        case SET_USER_POSTS:
            return { ...state, posts: action.posts };
        default:
            return state;
    }
}