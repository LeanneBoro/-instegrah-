import { useEffect, useState, useRef } from 'react';
import { CommentPreview } from './CommentPreview';
import { ProfileImg } from './ProfileImg';
import { utilService } from '../services/util.service';
import { ListModal } from './ListModal';
import { BackDrop } from './BackDrop';
import { useSelector } from 'react-redux';
import { toggleCommentLike, togglePostLike } from "../store/actions/post.actions";
import { getPostComments } from '../store/actions/post.actions';

import { addComment, removeComment } from '../store/actions/post.actions'
import { postService } from '../services/post.local.service';
import { loadUsers } from '../store/actions/user.actions';
import { userService } from '../services/user.service';

export function PostDetail({ selectedPost, setSelectedPost, navigateToProfile, setModalData }) {
    const { postComments } = useSelector(storeState => storeState.postModule)
    const { isCommentLoading } = useSelector(storeState => storeState.utilityModule)

    const sortedComments = postComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    const [isBackdropDisabled, setIsBackdropDisabled] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [userData, setUsersData] = useState('')
    const inputRef = useRef(null)

    const imgSrc = postService.isPostLiked(selectedPost)
    ? 'src/imgs/HeartFull.png'
    : 'src/assets/svgs/Heart.svg'


    useEffect(() => {
        getPostComments(selectedPost._id)
      
    }, [])

    useEffect(() => {
        loadUsers(selectedPost.likes)
            .then((fetchedUsers) => { 
                setUsersData(fetchedUsers) 
            })
            .catch(err => {
                console.error('Failed to load users', err)
            })
    }, [selectedPost.likes])

 
  
    

    function handleCommentBtnClick() {
        inputRef.current.focus()
    }

    function handleCommentSubmit(event) {
        event.preventDefault()

        if (commentText.trim()) {
            const newComment = {
                txt: commentText,
                timeStamp: Date.now(),
                by: {
                    id: 'currentUserId',
                    fullname: 'Current User',
                    username: 'currentUser',
                    imgUrl: 'https://randomuser.me/api/portraits/men/86.jpg',
                },
                likes: []
            }

            addComment(selectedPost._id, newComment)
        }
    }


    function handleCommentChange(event) {
        setCommentText(event.target.value)
    }

    function handlePostLike() {
        const userId = userService.getLoggedInUser()._id
    
        togglePostLike(selectedPost._id) 
    
        setSelectedPost(prevState => {
            const isLiked = prevState.likes.includes(userId) 
            const updatedLikes = isLiked
                ? prevState.likes.filter(id => id !== userId)
                : [...prevState.likes, userId] 
    
            return {
                ...prevState,
                likes: updatedLikes
            }
        })
    }


    return (
        <BackDrop disableAt={780} zIndex={1000} dataState={setSelectedPost}>

            <section className="post-details">
                <section className="details-nav">
                    <img className="back-btn" src="src/assets/svgs/Close-Arrow.svg" alt="" onClick={() => setSelectedPost(null)} />
                    <div>Post</div>
                </section>

                <section className="post-img-container">
                    <img src={selectedPost.image} alt="" />
                </section>

                <section className="media">
                    <section className="header">
                        <div onClick={() => navigateToProfile(selectedPost.by)} className='cursor-pointer'>
                            <ProfileImg imgUrl={selectedPost.authorProfileImg} diameter={'35px'} />
                        </div>

                        <section className="profile-details">
                            <h2 className="username cursor-pointer" onClick={() => navigateToProfile(selectedPost.by.id)}>{selectedPost.authorUsername}</h2>
                        </section>

                        <section className="options">
                            ...
                        </section>
                    </section>

                    <section className="comment-list">
                        <section className="post-title">
                            <div onClick={() => navigateToProfile(selectedPost.by)} className='cursor-pointer'>
                                <ProfileImg imgUrl={selectedPost.authorProfileImg} diameter={'35px'} />
                            </div>

                            <div>
                                <section className="content">
                                    <h2 onClick={() => navigateToProfile(selectedPost.by)} className="username cursor-pointer">{selectedPost.authorUsername}</h2>
                                    <span>{selectedPost.title}</span>
                                </section>

                                <section className="details">
                                    <div>{utilService.timeDifferenceUpToWeeks(selectedPost.createdAt)}</div>
                                    <div>reply</div>
                                </section>
                            </div>
                        </section>

                        {sortedComments.map((comment) => (
                            <CommentPreview key={comment._id}
                                isCommentLoading={isCommentLoading}
                                setModalData={setModalData}
                                postId={selectedPost._id}
                                comment={comment}
                                navigateToProfile={navigateToProfile}
                            />
                        ))}
                    </section>

                    <section className="likes-and-actions">
                        <section className="actions">
                            <img className='comment' src={imgSrc} alt=""  onClick={handlePostLike}/>
                            <img onClick={handleCommentBtnClick} className='like' src="src/assets/svgs/Comment.svg" alt="" />
                        </section>

                        {selectedPost.likes.length > 0 && (
                            <section className="likes-and-date">
                                <section className="likes">
                                    <div className="liked-by-profile">
                                        {userData && userData.slice(0, 3).map((user, index) => (
                                            <ProfileImg key={index} imgUrl={user.profileImg} diameter={"23px"} />
                                        ))}
                                    </div>

                                    <div className="amount">
                                        liked by <h2>{selectedPost.likes[0].fullname} </h2>
                                        {selectedPost.likes.length <= 2 ? (
                                            <>
                                                and <h2>{selectedPost.likes[1].fullname}</h2>
                                            </>
                                        ) : (
                                            <>
                                                and <h2 onClick={() => setModalData({ data: selectedPost.likes, dataType: 'likes' })}>{selectedPost.likes.length } more</h2>
                                            </>
                                        )}
                                    </div>
                                </section>

                            </section>
                        )}
                        <div className="date">
                            {utilService.timeDifferenceUpToWeeks(selectedPost.createdAt)}
                        </div>
                    </section>

                    <section className="add-comment">
                        <form onSubmit={handleCommentSubmit}>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Add a comment"
                                value={commentText}
                                onChange={handleCommentChange} />
                        </form>
                    </section>

                </section>
            </section>
        </BackDrop>
    )
}