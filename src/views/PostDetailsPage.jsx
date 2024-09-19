import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPostById } from '../store/actions/post.actions'
import { cloudinaryLinks } from '../services/cloudinary.service'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'
import { CommentPreview } from '../cmps/post cmps/CommentPreview'
import { ProfileImg } from '../cmps/ProfileImg'


export function PostDetailsPage() {
    const {  isLoading } = useSelector(storeState => storeState.postModule)

    const [postId, setPostId] = useState(null)
    const [selectedPost, setSelectedPost] = useState(null)
    const [commentText, setCommentText] = useState('')
    const [modalData, setModalData] = useState(null)

    useEffect(() => {
        const pathParts = window.location.pathname.split('/')
        const extractedPostId = pathParts[pathParts.length - 1]
        setPostId(extractedPostId)
    }, [])

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                try {
                    const post = await getPostById(postId)
                    setSelectedPost(post)  // Set the fetched post
                    console.log("🚀 ~ PostDetailsPage ~ selectedPost:", post)
                } catch (err) {
                    console.error('Failed to fetch post', err)
                }
            }
        }
        fetchPost()
    }, [postId])
    
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!selectedPost) {
        return <div>No post found.</div>
    }



    const handleCommentChange = (event) => {
        setCommentText(event.target.value)
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault()
        // Add your comment submission logic here
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


    const handleCommentBtnClick = () => {
        // Add your comment button logic here
    }

    const navigateToProfile = (userId) => {
        // Add your navigation logic here
    }

    const handleRemovePost = () => {
        // Add your remove post logic here
    }

    return (
        <section className="post-details-page">
            <section className="post-details">
                <section className="details-nav">
                    <img className="back-btn" src={cloudinaryLinks.closeArrow} alt="Back" onClick={() => setModalData(null)} />
                    <div>Post</div>
                </section>

                <section className="post-img-container">
                    <img src={selectedPost.image} alt="Post" />
                </section>

                <section className="media">
                    <section className="header">
                        <div onClick={() => navigateToProfile(selectedPost.by._id)} className='cursor-pointer'>
                            <ProfileImg imgUrl={selectedPost.by.profileImg} diameter={'35px'} />
                        </div>
                        <section className="profile-details">
                            <h2 className="username cursor-pointer" onClick={() => navigateToProfile(selectedPost.by._id)}>{selectedPost.by.username}</h2>
                        </section>

                        {userService.checkPostOwner(selectedPost.by) && (
                            <section className="options">
                                <div onClick={handleRemovePost}>
                                    <h2>Delete post</h2>
                                </div>
                            </section>
                        )}
                    </section>

                    <section className="comment-list">
                        <section className="post-title">
                            <div onClick={() => navigateToProfile(selectedPost.by._id)} className='cursor-pointer'>
                                <ProfileImg imgUrl={selectedPost.by.profileImg} diameter={'35px'} />
                            </div>

                            <div>
                                <section className="content">
                                    <h2 onClick={() => navigateToProfile(selectedPost.by)} className="username cursor-pointer">{selectedPost.by.username}</h2>
                                    <span>{selectedPost.title}</span>
                                </section>

                                <section className="details">
                                    <div>{utilService.timeDifferenceUpToWeeks(selectedPost.createdAt)}</div>
                                    <div>reply</div>
                                </section>
                            </div>
                        </section>

                        {selectedPost.comments.map((comment) => (
                            <CommentPreview
                                key={comment._id}
                                isCommentLoading={false}
                                setModalData={setModalData}
                                postId={selectedPost._id}
                                comment={comment}
                                navigateToProfile={navigateToProfile}
                            />
                        ))}



                    </section>

                    <section className="likes-and-actions">
                        <section className="actions">
                            <img className='comment' src={cloudinaryLinks.comment} alt="Comment" onClick={handlePostLike} />
                            <img onClick={handleCommentBtnClick} className='like' src={cloudinaryLinks.comment} alt="Like" />
                        </section>

                        {selectedPost.likes && (
                            <section className="likes-and-date">
                                <section className="likes">
                                    <div className="liked-by-profile">
                                        {selectedPost.likes.slice(0, 3).map((user, index) => (
                                            <ProfileImg key={index} imgUrl={user.profileImg} diameter={"23px"} />
                                        ))}
                                    </div>
                                    <div className="amount">
                                        liked by
                                        {selectedPost.likes.length > 0 && (
                                            <>
                                                <h2> {selectedPost.likes[0].username}</h2>
                                                {selectedPost.likes.length === 2 && (
                                                    <>
                                                        {' and '}
                                                        <h2>{selectedPost.likes[1].username}</h2>
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
                                type="text"
                                placeholder="Add a comment"
                                value={commentText}
                                onChange={handleCommentChange}
                            />
                        </form>
                    </section>
                </section>
            </section>
        </section>
    )
}
