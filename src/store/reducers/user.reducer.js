export const SET_USER = 'SET_USER'
export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'
export const SET_USER_POSTS = 'SET_USER_POSTS'
export const SET_USERS_DATA = 'SET_USERS_DATA'
export const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW'
export const LOGOUT = 'LOGOUT'


const initialState = {
    // user: null,
    usersData: [],
    loggedInUser: null
}




export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }

        case LOGOUT:
            return { ...state, loggedInUser: '' }

        case SET_LOGGED_IN_USER:
            return { ...state, loggedInUser: action.loggedInUser }

        case SET_USER_POSTS:
            return { ...state, posts: action.posts }

        case SET_USERS_DATA:
            return { ...state, usersData: action.users }

        case TOGGLE_FOLLOW: {
            const updatedUsersData = state.usersData.map(user => {
                if (user._id === action.loggedinUserId) {
                    return {
                        ...user,
                        following: action.isFollowed
                            ? [...user.following, action.idToFollow]  // Add idToFollow to following array
                            : user.following.filter(id => id !== action.idToFollow)  // Remove idToFollow from following array
                    }
                }
                if (user._id === action.idToFollow) {
                    return {
                        ...user,
                        followers: action.isFollowed
                            ? [...user.followers, action.loggedinUserId]  // Add loggedinUserId to followers array
                            : user.followers.filter(id => id !== action.loggedinUserId)  // Remove loggedinUserId from followers array
                    }
                }
                return user
            })

            return { ...state, usersData: updatedUsersData }
        }
        default:
            return state;
    }
}