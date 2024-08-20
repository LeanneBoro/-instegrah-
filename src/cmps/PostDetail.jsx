import { useEffect, useState, useRef } from 'react';
import { CommentPreview } from './CommentPreview';
import { ProfileImg } from './ProfileImg';
import { utilService } from '../services/util.service';
import { ListModal } from './ListModal';
import { BackDrop } from './BackDrop';
import { useSelector } from 'react-redux';

import { addComment, removeComment } from '../store/actions/post.actions'

export function PostDetail({ selectedPostId, setSelectedPostId, navigateToProfile, setModalData }) {


    const [isBackdropDisabled, setIsBackdropDisabled] = useState(false)
    const [commentText, setCommentText] = useState('')
    const inputRef = useRef(null)
    const posts = useSelector(storeState => storeState.postModule.profilePagePosts);
    const selectedPost = posts.find(post => post._id === selectedPostId);

    useEffect(() => {
        if (selectedPostId) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }

        return () => {
            document.body.classList.remove('no-scroll')
        }
    }, [selectedPostId])



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



    return (
        <BackDrop disableAt={780} zIndex={1000} dataState={setSelectedPostId}>

            <section className="post-details">
                <section className="details-nav">
                    <img className="back-btn" src="src/assets/svgs/Close-Arrow.svg" alt="" onClick={() => setSelectedPostId(null)} />
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
                                    <div>{utilService.timeDifferenceUpToWeeks(selectedPost.timeStamp)}</div>
                                    <div>reply</div>
                                </section>
                            </div>
                        </section>

                        {selectedPost.comments.map(comment => (
                            <CommentPreview key={comment._id} setModalData={setModalData} selectedPost={selectedPost} comment={comment} navigateToProfile={navigateToProfile} />
                        ))}
                    </section>

                    <section className="likes-and-actions">
                        <section className="actions">
                            <img className='comment' src="src/assets/svgs/Heart.svg" alt="" />
                            <img onClick={handleCommentBtnClick} className='like' src="src/assets/svgs/Comment.svg" alt="" />
                        </section>

                        {selectedPost.likes.length > 0 && (
                            <section className="likes-and-date">
                                <section className="likes">
                                    <div className="liked-by-profile">
                                        {selectedPost.likes.slice(0, 3).map((like, index) => (
                                            <ProfileImg key={index} imgUrl={like.profileImg} diameter={"23px"} />
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
                                                and <h2>{selectedPost.likes.length - 1} more</h2>
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