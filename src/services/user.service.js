import Fuse from 'fuse.js'
import { storageService } from './async-storage.service.js'

export const userService = {
    getUserById,
    getUsersById,
    getUsersByUsername,
    addUser,
    checkUsernameExists,
};

const USER_DB = "user_db"
const POST_DB = "post_db"

async function getUserById(userId) {
    try {
        const users = await storageService.query(USER_DB)
        return users.find(user => user._id === userId)

    } catch (err) {
        console.error('Error fetching user:', err);
        throw err
    }
}


async function getUsersById(userIds) {
    try {
        const users = await storageService.query(USER_DB);
        return users.filter(user => userIds.includes(user._id));
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
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

async function addUser() {

}



async function checkUsernameExists(username) {
    try {
        const users = await  storageService.query(USER_DB)
        return users.some(user => user.username === username)
    } catch (err) {
        console.error('Error checking username:', err)
        throw err;
    }
}
