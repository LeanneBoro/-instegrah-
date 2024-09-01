import { postService } from '../../services/post.local.service'
import { userService } from '../../services/user.service'
import { SET_POSTS, SET_POST_COMMENTS, ADD_POST, ADD_COMMENT, REMOVE_COMMENT, TOGGLE_COMMENT_LIKE, SET_PROFILE_POSTS, CLEAR_PROFILE_DATA, TOGGLE_POST_LIKE } from '../reducers/post.reducer'
import { SET_IS_LOADING, SET_IS_COMMENTS_LOADING } from '../reducers/utility.reducer'
import { store } from '../store'



export async function loadPosts(pagination) {
  try {
    if (pagination.skip === 0)   store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    const posts = await postService.query(pagination)
    store.dispatch({ type: SET_POSTS, posts })

  } catch (err) {
    console.log(err)
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export async function togglePostLike(postId) {
  const userId = userService.getLoggedInUser()._id


  if (!userId) return

  try {
    store.dispatch({ type: TOGGLE_POST_LIKE, postId, userId })
    await postService.togglePostLike(postId)
  }

  catch (err) {
    console.log(err)
  }

}

export async function toggleCommentLike(comment, postId) {
  const user = userService.getLoggedInUser()

  if (!user) return

  try {
    const commentId = comment._id
    store.dispatch({ type: TOGGLE_COMMENT_LIKE, comment, postId, user })
    await postService.updateCommentLikes(postId, commentId)
  }

  catch (err) {
    console.log('failed liking comment', err);


  }
}

export async function getPostComments(postId) {
  try {
    store.dispatch({ type: SET_IS_COMMENTS_LOADING, isLoading: true })

    // Clear existing comments before fetching new ones
    store.dispatch({ type: SET_POST_COMMENTS, comments: [] })

    const comments = await postService.getPostComments(postId)
    store.dispatch({ type: SET_POST_COMMENTS, comments })

  } catch (err) {
    console.log('Failed to fetch comments:', err)
  } finally {
    store.dispatch({ type: SET_IS_COMMENTS_LOADING, isLoading: false })
  }
}

export async function loadPostsByUser(userId) {
  try {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    const profilePosts = await postService.queryPostsByUser(userId)
    store.dispatch({ type: SET_PROFILE_POSTS, profilePosts })

  } catch (err) {
    console.log(err)
  }
  finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export function clearProfileData() {
  store.dispatch({ type: CLEAR_PROFILE_DATA })
}

export async function addComment(postId, comment) {

  try {
    const updatedComment = await postService.addComment(postId, comment);
    store.dispatch({
      type: ADD_COMMENT,
      postId,
      comment: comment,
    })
  } catch (err) {
    console.error('Error in addComment action creator:', err);
  }
}

export async function removeComment(postId, commentId) {
  try {
    await postService.removeComment(postId, commentId);
    store.dispatch({
      type: REMOVE_COMMENT,
      postId,
      commentId,
    });
  } catch (err) {
    console.error('Error in removeComment action creator:', err);
  }
}



export async function savePost(newPost) {
  const { profileImg, username } = userService.getLoggedInUser()

  try {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const uploadedPost = await postService.save(newPost)
    uploadedPost.authorUsername = username,
      uploadedPost.authorProfileImg = profileImg,


      store.dispatch({
        type: ADD_POST,
        uploadedPost
      })

  }

  catch (err) {
    console.error('error posting new post:', err)
  }

  finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }

}

