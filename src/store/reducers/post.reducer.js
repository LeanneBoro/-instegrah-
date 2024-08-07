export const SET_POSTS = 'SET_COMMENTS'
export const ADD_POST = 'ADD_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

const initialState = {
  posts: [],
}

export function postReducer(state = initialState, action = {}) {

  switch (action.type) {

    case SET_POSTS:
      return { ...state, posts: action.posts }

    case ADD_POST:
      return {
        ...state,
        posts: [action.newPost, ...state.posts]
      }

    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>

          post._id === action.postId
            ? { ...post, comments: [...post.comments, action.comment] }
            : post
        ),
      }

    case REMOVE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.postId
            ? { ...post, comments: post.comments.filter(comment => comment.id !== action.commentId) }
            : post
        ),
      }

    default:
      return state
  }
}