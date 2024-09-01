import { userService } from "../../services/user.service";
import { TOGGLE_FOLLOW } from "../reducers/user.reducer";
import { SET_USER, SET_USER_POSTS, SET_USERS_DATA, } from '../reducers/user.reducer'

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
        const users = await userService.getUsersById(idArr)
        store.dispatch({ type: SET_USERS_DATA, users })
        return users
    } catch (err) {
        console.log(err);

    }
}


export async function toggleFollow(idToFollow) {
    const loggedinUser = userService.getLoggedInUser()
    if (!loggedinUser) return
    const loggedinUserId = loggedinUser._id


    try {
        const isFollowed = await userService.toggleFollow(idToFollow)
        console.log("🚀 ~ toggleFollow ~ isFollowed:", isFollowed)

        store.dispatch({ type: TOGGLE_FOLLOW, isFollowed, loggedinUserId, idToFollow })

    } catch (err) {
        console.log(err);
    }


}


