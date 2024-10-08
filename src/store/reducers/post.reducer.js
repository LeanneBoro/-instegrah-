import { userService } from "../../services/user.service"

export const SET_POSTS = 'SET_POSTS'
export const SET_POST_FOR_PAGE = 'SET_POST_FOR_PAGE'
export const SET_PROFILE_POSTS = 'SET_PROFILE_POSTS'
export const CLEAR_PROFILE_DATA = 'CLEAR_PROFILE_DATA'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const SET_POST_COMMENTS = 'SET_POST_COMMENTS'
export const TOGGLE_COMMENT_LIKE = 'TOGGLE_COMMENT_LIKE'
export const TOGGLE_POST_LIKE = 'TOGGLE_POST_LIKE'



export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

const initialState = {
  postsByFollowing: [],
  suggestedPosts: [],
  profilePagePosts: [],
  profilePostOwner: [],
  postComments: [],
  postForPage : null,
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

      case SET_POST_FOR_PAGE:
        return {
          ...state,
          postForPage: action.post
        }
  


    case SET_POSTS:
      return {
        ...state,
        postsByFollowing: [...state.postsByFollowing, ...action.postsByFollowing]
        , suggestedPosts: [...state.suggestedPosts, ...action.suggestedPosts]
      }

    case ADD_POST:
      return {
        ...state,
        postsByFollowing: [action.uploadedPost, ...state.postsByFollowing]
      }

      case DELETE_POST:
        return {
          ...state,
          postsByFollowing: state.postsByFollowing.filter(post => post._id !== action.postId),
          suggestedPosts: state.suggestedPosts.filter(post => post._id !== action.postId),
          profilePagePosts: state.profilePagePosts.filter(post => post._id !== action.postId)
        }

      case ADD_COMMENT:
      
        return {
          ...state,
          postComments: [action.comment, ...state.postComments,]
    
        }
        case TOGGLE_COMMENT_LIKE:
          return {
            ...state,
            postComments: state.postComments.map(comment => {
              if (comment._id === action.comment._id) {
                const likedBy = [...comment.likedBy]
        
                
                const userIndex = likedBy.findIndex(id => id === action.user._id)
  
                
    
                if (userIndex !== -1) {
                  likedBy.splice(userIndex, 1)
                } else {
                  likedBy.push(action.user._id)
                }likedBy
                console.log(likedBy);
                return { ...comment, likedBy }
              }
    
              return comment
            })
          }
  
      case REMOVE_COMMENT:
        return {
          ...state,
          postsByFollowing: state.postsByFollowing.map(post =>
            post._id === action.postId
              ? { ...post, comments: post.comments.filter(comment => comment.id !== action.commentId) }
              : post
          ),
          suggestedPosts: state.suggestedPosts.map(post =>
            post._id === action.postId
              ? { ...post, comments: post.comments.filter(comment => comment.id !== action.commentId) }
              : post
          ),
        }
      case TOGGLE_POST_LIKE:
        return {
          ...state,
          postsByFollowing: state.postsByFollowing.map(post =>
            post._id === action.postId
              ? {
                  ...post,
                  likes: post.likes.includes(action.userId)
                    ? post.likes.filter(like => like !== action.userId)
                    : [...post.likes, action.userId]
                }
              : post
          ),
          suggestedPosts: state.suggestedPosts.map(post =>
            post._id === action.postId
              ? {
                  ...post,
                  likes: post.likes.includes(action.userId)
                    ? post.likes.filter(like => like !== action.userId)
                    : [...post.likes, action.userId]
                }
              : post
          ),
          profilePagePosts: state.profilePagePosts.map(post =>
            post._id === action.postId
              ? {
                  ...post,
                  likes: post.likes.includes(action.userId)
                    ? post.likes.filter(like => like !== action.userId)
                    : [...post.likes, action.userId]
                }
              : post
          ),
        }

        
        
      default:
        return state
    }  
}
