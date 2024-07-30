import { userService } from "../../services/user.service";
import { SET_USER, SET_USER_POSTS } from '../reducers/user.reducer'
import { store } from '../store'

export async function loadUser(userId) {
    

    try {
        const user = await userService.getUserById(userId)

        store.dispatch({
            type: SET_USER,
            user
        })

    }

    catch (error) {
        console.error('Failed to fetch user:', error);
    }

}

