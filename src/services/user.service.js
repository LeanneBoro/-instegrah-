import { storageService } from './async-storage.service.js'

export const userService = {
    getUserById,
    getUserPosts,
    getUsersById
};

const USER_DB= "user_db"
const POST_DB= "post_db"

async function getUserById(userId) {
    try {
        const users = await storageService.query(USER_DB)
        return users.find(user => user._id === userId)

    } catch (err) {
        console.error('Error fetching user:', err);
        throw err
    }
}

async function getUserPosts(userId) {
    try {
        const posts = await storageService.query(POST_DB)
        return posts.filter(post => post.by.id === userId)
    } catch (err) {
        console.error('Error fetching user posts:', err)
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

