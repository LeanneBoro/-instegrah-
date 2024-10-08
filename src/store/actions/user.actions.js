import { userService } from "../../services/user.service";
import { LOGOUT, SET_LOGGED_IN_USER, TOGGLE_FOLLOW } from "../reducers/user.reducer";
import { SET_USER, SET_USER_POSTS, SET_USERS_DATA, } from '../reducers/user.reducer'
import { SET_FOLLOWING_BTNS, SET_IS_LIST_LOADING } from "../reducers/utility.reducer";

import { store } from '../store'

export async function loadUser(userId) {


    try {
        store.dispatch({
            type: SET_USER,
            user: null
        })

        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const user = await userService.getUserById(userId)

        store.dispatch({
            type: SET_USER,
            user
        })

    }

    catch (error) {
        console.error('Failed to fetch user:', error);
    }

    finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }

}

export async function loadUsers(idArr) {
    try {
        store.dispatch({ type: SET_IS_LIST_LOADING, isListLoading : true })
        const users = await userService.getUsersById(idArr)
        store.dispatch({ type: SET_USERS_DATA, users })
        return users
    } catch (err) {
        console.log(err);

    }
    finally {
        store.dispatch({ type: SET_IS_LIST_LOADING, isListLoading : false })
    }
}

export async function signUp(credentials){
    try {
        const loggedInUser = await userService.signup(credentials)
        store.dispatch({ type: SET_LOGGED_IN_USER, loggedInUser })
        return loggedInUser
    } catch (err) {
        
    }

}

export async function login(credentials) {
    try {
        const loggedInUser = await userService.login(credentials)
        store.dispatch({ type: SET_LOGGED_IN_USER, loggedInUser })
        return loggedInUser
    } catch (err) {
        console.error('Login failed:', err.message)
        throw err 
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: LOGOUT })
        window.location.reload()
    } catch (err) {
        console.log(err)
        throw err
    }
}




export async function toggleFollow(idToFollow) {
    const loggedinUser = userService.getLoggedInUser()
    if (!loggedinUser) return
    const loggedinUserId = loggedinUser._id

    try {
        store.dispatch({ type: SET_FOLLOWING_BTNS, btnState: true })

        const isFollowed = await userService.toggleFollow(idToFollow)
  

        let updatedFollowing
        if (isFollowed) {
            updatedFollowing = [...loggedinUser.following, idToFollow]
        } else {
            updatedFollowing = loggedinUser.following.filter(userId => userId !== idToFollow)
        }

        // Ensure atomic update of user information
        await userService.updateLoggedInUser({ ...loggedinUser, following: updatedFollowing })
        store.dispatch({ type: TOGGLE_FOLLOW, isFollowed, loggedinUserId, idToFollow })

    } catch (err) {
        console.log(err)
    }
    finally {
        store.dispatch({ type: SET_FOLLOWING_BTNS, btnState: false })
    }
}

