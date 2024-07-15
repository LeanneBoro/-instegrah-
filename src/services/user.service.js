import { storageService } from './async-storage.service.js'

export const userService = {
    getUserById
};

const USER_DB= "user_db"

async function getUserById(userId) {
    try {
        const users = await storageService.query(USER_DB); // Adjust database name as per your setup
        return users.find(user => user._id === userId);

    } catch (err) {
        console.error('Error fetching user:', err);
        throw err; // Optionally handle or rethrow the error
    }
}

