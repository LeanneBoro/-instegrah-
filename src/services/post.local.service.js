
import { storageService } from './async-storage.service.js'
import { demoDataService } from './demoData.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'
// import { httpService } from './http.service.js'
const POST_DB = 'post_db'
const USER_DB = "user_db"
const BASE_URL = 'post/'
const zBASE_URL = 'post/'

export const postService = {
    query,
    queryPostsByUser,
    getById,
    save,
    remove,
    getLatestComment,
    addComment,
    isCommentLiked,
    getPostsByUserId,
    getPostComments

}

// async function query(filterBy = {}) {
//     try {
//         // Query users
//         let users = await storageService.query(USER_DB);

//         // If no users found, create demo users
//         if (!users || !users.length) {
//             users = demoDataService.createUsersDemoData();
//         }

//         // Create posts if not already created
//         let posts = await demoDataService.createPostsDemoData(users);

//         // Sort posts by timestamp in descending order
//         posts = posts.sort((a, b) => b.timeStamp - a.timeStamp)

//         return posts;
//     } catch (err) {
//         console.log(err);
//     }
// }

function query() {

    return httpService.get(BASE_URL)
}

function queryPostsByUser(userId) {

    return httpService.get(BASE_URL + userId)
}



async function getById(postId) {
    try {
        const post = await storageService.get(POST_DB, postId)
        return post
    } catch (err) {
        console.log(err)
    }
}

async function getPostsByUserId(userId) {
    try {
        const posts = await storageService.query(POST_DB)
        return posts.filter(post => post.by.id === userId)
    } catch (err) {
        console.error('Error fetching user posts:', err)
        throw err
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



function _savePosts(posts) {
    localStorage.setItem(POST_DB, JSON.stringify(posts))
}

function getLatestComment(comments) {
    const latestComment = { user: comments[comments.length - 1].by.fullname, comment: comments[comments.length - 1].txt }

    return latestComment
}

async function addComment(postId, comment) {

    try {
        comment.id = utilService.makeId()

        let post = await storageService.get(POST_DB, postId)
        post.comments = post.comments ? [...post.comments, comment] : [comment]
        const updatedPost = await storageService.put(POST_DB, post)
        return updatedPost
    }

    catch (err) {
        console.error('Error adding comment:', err);
        throw err;  // Rethrow the error to be handled by the caller
    }

}

function isCommentLiked(comment) {
    const userId = userService.getLoggedInUser()._id

    const isLiked = comment.likedBy.some(like => {
        return like.userId === userId
    })

    return isLiked
}

async function getPostComments(postId) {
    return httpService.get(`post/comments/${postId}`)
  }