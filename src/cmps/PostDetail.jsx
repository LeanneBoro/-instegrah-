import { useEffect, useState, useRef } from 'react';
import { CommentPreview } from './CommentPreview';
import { ProfileImg } from './ProfileImg';
import { utilService } from '../services/util.service';
import { ListModal } from './ListModal';
import { BackDrop } from './BackDrop';
import { useSelector } from 'react-redux';

import { addComment, removeComment } from '../store/actions/post.actions'

export function PostDetail({ selectedPostId, setSelectedPostId, navigateToProfile }) {

    const [isBackdropDisabled, setIsBackdropDisabled] = useState(false)
    const [commentText, setCommentText] = useState('')
    const inputRef = useRef(null)
    const posts = useSelector(storeState => storeState.postModule.posts);
    const selectedPost = posts.find(post => post._id === selectedPostId);



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
                likedBy: []
            }

            addComment(selectedPost._id, newComment)
        }
    }

    function handleCommentChange(event) {
        setCommentText(event.target.value)
    }


    return (
        <BackDrop disableAt={780} zIndex={1000} dataState={setSelectedPostId} >

            {/* <img className="close-btn" onClick={handleBackdropClick} src="src/assets/svgs/close.svg" alt="" /> */}

            <section className="post-details">
                <section className="details-nav">
                    <img className="back-btn" src="src/assets/svgs/Close-Arrow.svg" alt="" onClick={() => setSelectedPost(null)} />
                    <div>Post</div>
                </section>

                <section className="post-img-container">
                    <img src={selectedPost.postImg} alt="" />
                </section>

                <section className="media">
                    <section className="header">
                        <div onClick={() => navigateToProfile(selectedPost.by.id)} className='cursor-pointer'>
                            <ProfileImg imgUrl={selectedPost.by.profileImg} diameter={'35px'} />
                        </div>

                        <section className="profile-details">
                            <h2 className="username cursor-pointer" onClick={() => navigateToProfile(selectedPost.by.id)}>{selectedPost.by.fullname}</h2>
                        </section>

                        <section className="options">
                            ...
                        </section>
                    </section>

                    <section className="comment-list">
                        <section className="post-title">
                            <div onClick={() => navigateToProfile(selectedPost.by.id)} className='cursor-pointer'>
                                <ProfileImg imgUrl={selectedPost.by.profileImg} diameter={'35px'} />
                            </div>

                            <div>
                                <section className="content">
                                    <h2 onClick={() => navigateToProfile(selectedPost.by.id)} className="username cursor-pointer">{selectedPost.by.fullname}</h2>
                                    <span>{selectedPost.txt}</span>
                                </section>

                                <section className="details">
                                    <div>{utilService.timeDifferenceUpToWeeks(selectedPost.timeStamp)}</div>
                                    <div>reply</div>
                                </section>
                            </div>
                        </section>

                        {selectedPost.comments.map(comment => (
                            <CommentPreview key={comment.id} selectedPost={selectedPost} comment={comment} navigateToProfile={navigateToProfile} />
                        ))}
                    </section>

                    <section className="likes-and-actions">
                        <section className="actions">
                            <img className='comment' src="src/assets/svgs/Heart.svg" alt="" />
                            <img onClick={handleCommentBtnClick} className='like' src="src/assets/svgs/Comment.svg" alt="" />
                        </section>

                        <section className="likes-and-date">
                            <section className="likes">
                                <div className="liked-by-profile">
                                    {/* {selectedPost.likedBy.slice(0, 3).map((like, index) => (
                                        <ProfileImg key={index} imgUrl={like.profileImg} diameter={"30px"} />
                                    ))} */}
                                </div>

                                <div className="amount">
                                    liked by <h2>{selectedPost.likedBy[0].fullname}</h2>
                                    {selectedPost.likedBy.length >= 2 ? (
                                        <>
                                            and <h2>{selectedPost.likedBy[1].fullname}</h2>
                                        </>
                                    ) : (
                                        <>
                                            and <h2>{selectedPost.likedBy.length - 1} more</h2>
                                        </>
                                    )}
                                </div>
                            </section>

                            <div className="date">
                                {/* Add date here if needed */}
                            </div>
                        </section>
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
    );
}