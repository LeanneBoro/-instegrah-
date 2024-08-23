export const SET_POSTS = 'SET_POSTS'
export const SET_PROFILE_POSTS = 'SET_PROFILE_POSTS'
export const CLEAR_PROFILE_DATA = 'CLEAR_PROFILE_DATA'
export const ADD_POST = 'ADD_POST'
export const SET_POST_COMMENTS = 'SET_POST_COMMENTS'
export const HANDLE_COMMENT_LIKE = 'HANDLE_COMMENT_LIKE'

export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

const initialState = {
  posts: [],
  profilePagePosts: [],
  profilePostOwner: [],
  postComments: []


}

export function postReducer(state = initialState, action = {}) {



  switch (action.type) {


    case SET_PROFILE_POSTS:
      return {
        ...state,
        profilePagePosts: action.profilePosts.posts,
        profilePostOwner: action.profilePosts.user
      }

    case CLEAR_PROFILE_DATA:
      return {
        ...state,
        profilePostOwner: [],
        profilePagePosts: []
      }

      case SET_POST_COMMENTS:
        return {
          ...state,
          postComments: action.comments
        }
  

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

    case HANDLE_COMMENT_LIKE:
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