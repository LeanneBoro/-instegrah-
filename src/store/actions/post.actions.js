import { postService } from '../../services/post.local.service'
import { SET_POSTS, ADD_COMMENT, REMOVE_COMMENT } from '../reducers/post.reducer'
import { store } from '../store'

export async function loadPosts() {
    try {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const posts = await postService.query()
        store.dispatch({ type: SET_POSTS, posts })
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
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
      });
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