import { useEffect, useRef, useState } from 'react'
import { CommentPreview } from './CommentPreview';
import { ProfileImg } from '../ProfileImg';
import { utilService } from '../../services/util.service';
import { ListModal } from '../ListModal';
import { BackDrop } from '../BackDrop';
import { useSelector } from 'react-redux';
import { toggleCommentLike, togglePostLike, getPostComments, addComment, removeComment, removePost } from "../../store/actions/post.actions";
import { postService } from '../../services/post.service';
import { loadUsers } from '../../store/actions/user.actions';
import { userService } from '../../services/user.service';
import { CommentPreviewPlaceholder } from '../CommentPreviewPlaceholder';
import { cloudinaryLinks } from '../../services/cloudinary.service';

export function PostDetail({ selectedPost, setSelectedPost, navigateToProfile, setModalData }) {
    const { postComments } = useSelector(storeState => storeState.postModule)

    const { isCommentLoading } = useSelector(storeState => storeState.utilityModule)
    const [commentText, setCommentText] = useState('')
    const [userData, setUsersData] = useState('')
    const inputRef = useRef(null)
    const commentListRef = useRef(null) // Ref for the comment list container


    const imgSrc = postService.isPostLiked(selectedPost)
        ? cloudinaryLinks.heartFull
        : cloudinaryLinks.heart

    useEffect(() => {
        getPostComments(selectedPost._id)
    }, [selectedPost._id])

    useEffect(() => {
        loadUsers(selectedPost.likes)
            .then((fetchedUsers) => {
                setUsersData(fetchedUsers)
            })
            .catch(err => {
                console.error('Failed to load users', err)
            })
    }, [selectedPost.likes])
        console.log("🚀 ~ useEffect ~ selectedPost.likes:", selectedPost.likes)

    useEffect(() => {
        if (commentListRef.current) {
            commentListRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [postComments.length])

    function handleCommentBtnClick() {
        inputRef.current.focus()
    }

    function handleCommentSubmit(event) {
        event.preventDefault()
        const user = userService.getLoggedInUser()
        if (!user) return

        if (commentText.trim()) {
            const newComment = {
                text: commentText,
            }

            addComment(selectedPost._id, newComment)
        }
    }

    function handleCommentChange(event) {
        setCommentText(event.target.value)
    }

    async function handleRemovePost() {
        try {
            const removedPost = removePost(selectedPost)
            if (removedPost) {
                setSelectedPost('')
            }
        } catch (err) {
            console.log('failed to remove post with id:', selectedPost.by._id)

        }
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
                    <img className="back-btn" src={cloudinaryLinks.closeArrow} alt="" onClick={() => setSelectedPost(null)} />
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

                        {userService.checkPostOwner(selectedPost.by) && <section className="options">
                            <div onClick={handleRemovePost}>
                                <h2>Delete post</h2>
                            </div>
                        </section>}
                    </section>

                    <section className="comment-list" ref={commentListRef}> {/* Added ref here */}
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

                        {isCommentLoading
                            ? Array.from({ length: selectedPost.commentsCount }, (_, index) => (
                                <CommentPreviewPlaceholder key={index} />
                            ))
                            : postComments.map((comment) => (
                                <CommentPreview
                                    key={comment._id}
                                    isCommentLoading={isCommentLoading}
                                    setModalData={setModalData}
                                    postId={selectedPost._id}
                                    comment={comment}
                                    navigateToProfile={navigateToProfile}
                                />
                            ))
                        }
                    </section>

                    <section className="likes-and-actions">
                        <section className="actions">
                            <img className='comment' src={imgSrc} alt="" onClick={handlePostLike} />
                            <img onClick={handleCommentBtnClick} className='like' src={cloudinaryLinks.comment} alt="" />
                        </section>

                        {userData && (
                            <section className="likes-and-date">
                                <section className="likes">
                                    <div className="liked-by-profile">
                                        {userData && userData.slice(0, 3).map((user, index) => (
                                            <ProfileImg key={index} imgUrl={user.profileImg} diameter={"23px"} />
                                        ))}
                                    </div>

                                    <div className="amount">
                                        liked by
                                        {selectedPost.likes.length > 0 && (
                                            <>
                                                <h2> {userData[0].username}</h2>
                                                {selectedPost.likes.length === 2 && (
                                                    <>
                                                        {' and '}
                                                        <h2>{userData[1].username}</h2>
                                                    </>
                                                )}
                                                {selectedPost.likes.length > 2 && (
                                                    <>
                                                        {' and '}
                                                        <h2 onClick={() => setModalData({ data: selectedPost.likes, dataType: 'likes' })}>
                                                            and {selectedPost.likes.length - 1} more
                                                        </h2>
                                                    </>
                                                )}
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
