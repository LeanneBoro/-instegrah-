import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { showSuccessMsg, showErrorMsg } from './event-bus.service.js'



export const userService = {
    getUserById,
    getUsersById,
    getUsersByUsername,
    checkUsernameExists,
    handleSignUp,
    signup,
    logout,
    getLoggedInUser,
    toggleFollow,
    checkIfFollowing,
    updateLoggedInUser,
    login,
    getGuestUser,
    checkPostOwner,
}

const USER_DB = "user_db"
const BASE_AUTH_URL = 'auth/'
const BASE_USER_URL = 'user/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'


async function getUserById(userId) {
    try {
        const users = await storageService.query(USER_DB)
        return users.find(user => user._id === userId)

    } catch (err) {
        console.error('Error fetching user:', err)
        throw err
    }
}


async function getUsersById(userIds) {
    try {

        const idsQuery = userIds.join(',')
        const response = await httpService.get(`${BASE_USER_URL}ids/${encodeURIComponent(idsQuery)}`)

        return response

    } catch (err) {
        console.error('Error fetching users:', err)
        throw err
    }
}


async function getUsersByUsername() {
    try {
        return await storageService.query(USER_DB)
    } catch (err) {
        console.error('Error fetching users:', err)
        throw err
    }
}



// async function login({ username, password }) {
//     try {
//         const user = await httpService.post(BASE_AUTH_URL + 'login', { username, password })
//         if (user) {
//             return _setLoggedInUser(user)
//         } else {
//             return Promise.reject('Invalid login')
//         }
//     } catch (err) {
//         console.error('Error occurred during login:', err)
//         throw err
//     }
// }

async function signup({ username, password, fullname, profileImg, isAdmin = false, }) {
    try {
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        formData.append('fullname', fullname)

        if (profileImg) {
            const profileImgBlob = utilService.base64ToBlob(profileImg)
            formData.append('profileImg', profileImgBlob, 'profileImg.png')
        }


        const response = await httpService.post(BASE_AUTH_URL + 'signup', formData)
        const profileImgUrl = response.profileImg
        const { _id, followers, following } = response


        _setLoggedInUser({ _id: _id, username, password, fullname, profileImg: profileImgUrl, isAdmin, followers, following })
        showSuccessMsg(`${username} has signed in`, profileImgUrl)
        return { username, password, fullname, profileImg: profileImgUrl, isAdmin }
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_AUTH_URL + 'login', { username, password })

        if (user) {

            showSuccessMsg(`${username} has signed in`, user.profileImg)
            return _setLoggedInUser(user)

        } else {
            return Promise.reject('Invalid login')
        }
    } catch (error) {
        console.error('Error occurred during login:', error)
        throw error
    }
}


async function logout() {
    try {
        await httpService.post(BASE_AUTH_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        showSuccessMsg(`You have  signed out`,)
    } catch (err) {
        console.log(err)
    }
}

function _setLoggedInUser(user) {
    console.log(user);


    const userToSave = {
        _id: user._id, fullname: user.fullname,
        username: user.username, profileImg:
            user.profileImg, followers: user.followers, following: user.following
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

async function updateLoggedInUser(updatedUserInfo) {
    try {
        // Ensure this correctly updates the user information
        return _setLoggedInUser(updatedUserInfo)
    } catch (err) {
        console.error('Failed to update logged in user:', err)
        throw new Error('Failed to update logged in user')
    }
}

function getLoggedInUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
    return user
}




async function checkUsernameExists(username) {

    try {
        const availability = await httpService.get(`user/verify/${username}`)
        console.log(availability)

        return availability
    } catch (err) {
        console.error('Error checking username:', err)
        throw err
    }
}

async function toggleFollow(idToFollow) {

    try {
        const isFollowing = await httpService.get(`user/follow/${idToFollow}`)
        console.log(isFollowing);
        return isFollowing
    } catch (err) {
        console.error('Error following user:', err)
    }

}

function getGuestUser() {
    return {
        username: 'Guest_Account',
        password: '12345',
        fullname: 'Guest Account',
        profileImg: 'https://res.cloudinary.com/db7t5amdv/image/upload/v1725829145/Assets/GuestImage_dupcmy.jpg',
    }

}

function checkIfFollowing(userFollowedList) {
    const user = getLoggedInUser()
    if (!user) return
    const userId = user._id

    const isFollowing = userFollowedList.some(id => id === userId)
    return isFollowing

}

function checkPostOwner(postById){
    const user = getLoggedInUser()
    if (!user) return
    
   return  user._id === postById ? true : false
}






async function handleSignUp(userData, currentFeedback) {
    const feedback = { ...currentFeedback }

    if (userData.username.trim() === '') {
        feedback.usernameFeedback = {
            type: 'denied',
            text: '* username must be between 3 and 25 characters'
        }
    } else if (userData.username.length < 3 || userData.username.length > 25) {
        feedback.usernameFeedback = {
            type: 'denied',
            text: '* username must be between 3 and 25 characters'
        }
    } else {
        feedback.usernameFeedback = {
            type: currentFeedback.usernameFeedback.type === 'approved' ? 'approved' : '',
            text: currentFeedback.usernameFeedback.type === 'approved' ? currentFeedback.usernameFeedback.text : ''
        }
    }

    if (userData.fullname.trim() === '') {
        feedback.fullnameFeedback = {
            type: 'denied',
            text: '* full name must be at least 1 character'
        }
    } else {
        feedback.fullnameFeedback = {
            type: currentFeedback.fullnameFeedback.type === 'approved' ? 'approved' : '',
            text: currentFeedback.fullnameFeedback.type === 'approved' ? currentFeedback.fullnameFeedback.text : ''
        }
    }

    if (userData.password.trim() === '') {
        feedback.passwordFeedback = {
            type: 'denied',
            text: '* password must be between 5 and 12 characters'
        }
    } else if (userData.password.length < 5 || userData.password.length > 12) {
        feedback.passwordFeedback = {
            type: 'denied',
            text: '* password must be between 5 and 12 characters'
        }
    } else {
        feedback.passwordFeedback = {
            type: currentFeedback.passwordFeedback.type === 'approved' ? 'approved' : '',
            text: currentFeedback.passwordFeedback.type === 'approved' ? currentFeedback.passwordFeedback.text : ''
        }
    }

    const usernameExists = await checkUsernameExists(userData.username)
    const isValid = [
        !usernameExists,
        userData.username.trim().length >= 3 && userData.username.length <= 25,
        userData.fullname.trim() !== '',
        userData.password.trim().length >= 5 && userData.password.length <= 12
    ].every(condition => condition)

    if (isValid) {
        try {
            await signup(userData)
            console.log('signed up!');
            return { success: true, feedback }
        } catch (error) {
            console.error('Sign up error:', error)
            return { success: false, feedback: { ...feedback, general: 'Error during sign up' } }
        }
    }

    return { success: false, feedback }
}