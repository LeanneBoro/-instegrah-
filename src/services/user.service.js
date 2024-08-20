import Fuse from 'fuse.js'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const userService = {
    getUserById,
    getUsersById,
    getUsersByUsername,
    save,
    checkUsernameExists,
    handleSignUp,
}

const USER_DB = "user_db"
const POST_DB = "post_db"

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
        const users = await storageService.query(USER_DB)
        return users.filter(user => userIds.includes(user._id))
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

async function save(user) {
    try {
        if (user._id) {
            const updatedUser = await storageService.put(USER_DB, user)
            return updatedUser
        } else {
            user._id = utilService.makeId()
            const userToAdd = await storageService.post(USER_DB, user)
            return userToAdd
        }
    } catch (err) {
        console.log(err)
    }

}



async function checkUsernameExists(username) {
    try {
        const users = await storageService.query(USER_DB)
        return users.some(user => user.username === username)
    } catch (err) {
        console.error('Error checking username:', err)
        throw err
    }
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
         await save(userData)
          console.log('signed up!');
          
        } catch (error) {
            console.error('Sign up error:', error)
            return { success: false, feedback: { ...feedback, general: 'Error during sign up' } }
        }
    }

    return { success: false, feedback }
}
