import { postService } from '../../services/post.local.service'
import { SET_POSTS, ADD_POST, ADD_COMMENT, REMOVE_COMMENT } from '../reducers/post.reducer'
import { store } from '../store'
import { SET_IS_LOADING } from './utility.actions';

export async function loadPosts() {
  try {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    store.dispatch({ type: SET_POSTS, posts: [] })

    const posts = await postService.query();
    store.dispatch({ type: SET_POSTS, posts })

  } catch (err) {
    console.log(err)
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export async function loadPostsByUser(userId) {
  try {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    store.dispatch({ type: SET_POSTS, posts: [] })

    const posts = await postService.getPostsByUserId(userId)
    store.dispatch({ type: SET_POSTS, posts })
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  } catch (err) {
    console.log(err)
  }
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

  try {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    await postService.save(newPost)
    store.dispatch({
      type: ADD_POST,
      newPost
    })

  }

  catch (err) {
    console.error('error posting new post:', err)
  }

  finally{
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }

}