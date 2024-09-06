
import { storageService } from './async-storage.service.js'
import { demoDataService } from './demoData.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'

import objectId from 'objectid'
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
    getPostComments,
    updateCommentLikes,
    togglePostLike,
    isPostLiked


}





function query(pagination, userId = null) {
    const { skip, limit } = pagination

    return httpService.get(`${BASE_URL}?skip=${skip}&limit=${limit}${userId ? `&userId=${userId}` : ''}`)
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
            post.by = objectId().toString()
            console.log(post.by)
            const postToAdd = await httpService.post(BASE_URL, post)
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

async function addComment(postId,comment,mentions) {
    console.log("🚀 ~ addComment ~ comment:", comment)
    console.log("🚀 ~ addComment ~ postId:", postId)
    try {
        if (comment._id) {
            // const updatedPost = await storageService.put(POST_DB, post)
            // return updatedPost
        } else {
   
            const commentToAdd = await httpService.post(`${BASE_URL}/${postId}/comments`, { comment, mentions })

            return commentToAdd
        }
    } catch (err) {
        console.log(err)
    }
}

async function togglePostLike(postId) {
    console.log(postId);

    const response = await httpService.put(`post/likes/${postId}`)
    return response

}

function isCommentLiked(comment) {
    const loggedInUser = userService.getLoggedInUser()
    if (!loggedInUser) return

    const userId = loggedInUser._id

    const isLiked = comment.likedBy.some(id => id === userId)


    return isLiked
}

function isPostLiked(post) {
    const loggedInUser = userService.getLoggedInUser()

    if (!loggedInUser) return

    const userId = loggedInUser._id

    const isLiked = post.likes.some(like => like === userId)





    return isLiked
}

async function getPostComments(postId) {
    return httpService.get(`post/comments/${postId}`)
}

async function updateCommentLikes(postId, commentId) {
    const response = await httpService.put(`post/${postId}/comments/${commentId}`)
    return response
}