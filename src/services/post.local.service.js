
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
const POST_DB = 'post_db'
const zBASE_URL = 'post/'

export const postService = {
    query,
    getById,
    save,
    remove,

}

async function query(filterBy = {}) {

    try {
        let posts = await storageService.query(POST_DB)
 
        return posts
    } catch (err) {
        console.log(err)
    }
}

async function getById(postId) {
    try {
        const post = await storageService.get(POST_DB, postId)
        return post
    } catch (err) {
        console.log(err)
    }
}

async function remove(postId) {
    try {
        await storageService.remove(POST_DB, postId)
    } catch (err) {
        console.log(err)
    }
}

async function save(post) {
    try {
        if (post._id) {
            const updatedPost = await storageService.put(POST_DB, post)
            return updatedPost
        } else {
            post._id = utilService.makeId()
            console.log(post._id);
            const postToAdd = await storageService.post(POST_DB, post)
            return postToAdd
        }
    } catch (err) {
        console.log(err)
    }
}