import { userService } from "../../services/user.service";
import { SET_USER, SET_USER_POSTS } from '../reducers/user.reducer'
import { SET_IS_LOADING } from './utility.actions';
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
    
    finally{
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }

}

