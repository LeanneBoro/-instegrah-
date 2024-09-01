import { userService } from "../../services/user.service"

export const SET_POSTS = 'SET_POSTS'
export const SET_PROFILE_POSTS = 'SET_PROFILE_POSTS'
export const CLEAR_PROFILE_DATA = 'CLEAR_PROFILE_DATA'
export const ADD_POST = 'ADD_POST'
export const SET_POST_COMMENTS = 'SET_POST_COMMENTS'
export const TOGGLE_COMMENT_LIKE = 'TOGGLE_COMMENT_LIKE'
export const TOGGLE_POST_LIKE = 'TOGGLE_POST_LIKE'



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
        return { ...state, posts: [...state.posts, ...action.posts] }

    case ADD_POST:
      return {
        ...state,
        posts: [action.uploadedPost, ...state.posts]
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
    case TOGGLE_COMMENT_LIKE:
      return {
        ...state,
        postComments: state.postComments.map(comment => {
          if (comment._id === action.comment._id) {
            const likes = [...comment.likes]
    
            
            const userIndex = likes.findIndex(id => id === action.user._id)
            

            if (userIndex !== -1) {
              likes.splice(userIndex, 1)
            } else {
              likes.push(action.user._id)
            }likes
            console.log(likes);
            return { ...comment, likes }
          }

          return comment
        })

      }
      case TOGGLE_POST_LIKE:
        return {
          ...state,
          posts: state.posts.map(post =>
            post._id === action.postId
              ? {
                  ...post,
                  likes: (() => {
                    const userIndex = post.likes.findIndex(like => like === action.userId)
      
                    if (userIndex !== -1) {
                      const updatedLikes = [...post.likes]
                      updatedLikes.splice(userIndex, 1)
                      return updatedLikes
                    } else {
                      return [...post.likes, action.userId]
                    }
                  })()
                }
              : post
          ),
          profilePagePosts: state.profilePagePosts.map(post =>
            post._id === action.postId
              ? {
                  ...post,
                  likes: (() => {
                    const userIndex = post.likes.findIndex(like => like === action.userId)
      
                    if (userIndex !== -1) {
                      const updatedLikes = [...post.likes]
                      updatedLikes.splice(userIndex, 1)
                      return updatedLikes
                    } else {
                      return [...post.likes, action.userId]
                    }
                  })()
                }
              : post
          )
        }
   

      
    default:
      return state
  }
}