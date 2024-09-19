import { useState, useEffect } from 'react'
import { PostDetail } from './PostDetail'
import { ProfileImg } from '../ProfileImg'
import { utilService } from '../../services/util.service'
import { useNavigate } from 'react-router-dom'
import { ListModal } from '../ListModal'
import { PostPreviewPlaceholder } from '../PostPreviewPlaceholder'
import { postService } from '../../services/post.service'
import { togglePostLike } from '../../store/actions/post.actions'

import { cloudinaryLinks } from '../../services/cloudinary.service'
import { setNavBarSection } from '../../store/actions/utility.actions'
import { userService } from '../../services/user.service'


export function PostPreview({ post, idx }) {




    const [selectedPost, setSelectedPost] = useState(null)
    const [modalData, setModalData] = useState(null)
    const [loadingStates, setLoadingStates] = useState({
        image: false,
        likes: false,
        comments: false
    })
    const navigate = useNavigate()
    const isDataLoaded = loadingStates.image && loadingStates.likes && loadingStates.comments
    const imgSrc = postService.isPostLiked(post)
        ? cloudinaryLinks.heartFull
        : cloudinaryLinks.heart
    const user = userService.getLoggedInUser()


    useEffect(() => {

        const img = new Image()
        img.src = post.image
        img.onload = () => setLoadingStates(prev => ({ ...prev, image: true }))
        img.onerror = () => setLoadingStates(prev => ({ ...prev, image: true }))

        setLoadingStates(prev => ({ ...prev, likes: true, comments: true }))

    }, [post.image, post.likes, post.comments, modalData])


    function navigateToProfile(id) {
        navigate(`/profile/${id}`)
        setSelectedPost(null)
    }

    function handleSelectPost(post) {
       

        setSelectedPost(post)
    }

    useEffect(() => {
        if (selectedPost) {
            document.body.classList.add('body-no-scroll')
        } else {
            document.body.classList.remove('body-no-scroll')
        }

    
        return () => {
            document.body.classList.remove('body-no-scroll')
        }
    }, [selectedPost])

    function handleLoginAttempt(event) {
        event.stopPropagation()
        setNavBarSection('login')
    }


    return (
        <section className="post-preview">
            {!isDataLoaded ? (
                <PostPreviewPlaceholder />
            ) : (
                <>
                    <div className="flex post-title">
                        <div className="flex align-center">
                            <div onClick={() => navigateToProfile(post.by)} className='cursor-pointer'>
                                <ProfileImg imgUrl={post.authorProfileImg} diameter={"32px"} />
                            </div>

                            <div>
                                <div className="flex post-by">
                                    <h2 onClick={() => navigateToProfile(post.by)}>{post.authorUsername}</h2>
                                    <div>
                                        <span className="time">&nbsp;• {utilService.timeDifferenceUpToWeeks(post.createdAt, "short")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <span className="flex justify-center">
                            {/* <svg aria-label="More Options" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More Options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg> */}
                        </span>
                    </div>
                    <img
                        className='post-img'
                        src={post.image}
                        alt="Post"
                    />
                    <nav className="flex icon-container">
                        <div className="flex main-container">
                            <span className="flex justify-center svg-container">


                                <img src={imgSrc} alt="" onClick={() => user ? togglePostLike(post._id) : handleLoginAttempt(event)} />

                            </span>
                            <span className="flex justify-center svg-container">
                                <img src={cloudinaryLinks.comment} onClick={() => user ? setSelectedPost(post) : handleLoginAttempt(event)} alt="" />
                                </span>
                            <span className="flex justify-center svg-container">
                                {/* <svg aria-label="Share Post" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg> */}
                            </span>
                        </div>
                        <span className="flex justify-center svg-container save-container"><svg aria-label="Save" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg></span>
                    </nav>
                    {post.likes.length > 0 && <h2 className="likes cursor-pointer" onClick={() => setModalData({ data: post.likes, dataType: 'likes' })}>
                        <span>{post.likes.length}</span> likes
                    </h2>}
                    <div className="title">
                        <h2 onClick={() => navigateToProfile(post.by.id)} className='cursor-pointer'>{post.authorFullname}</h2>
                        <div>{post.txt}</div>
                    </div>
                    <div className="view-all" onClick={() => handleSelectPost(post)}>{post.commentsCount ? 'view all comments' : 'view post'} </div>
                    <div className="latest-comment">
                        {/* Latest comment code */}
                    </div>


                    {selectedPost && <PostDetail setModalData={setModalData} selectedPost={selectedPost} setSelectedPost={setSelectedPost} navigateToProfile={navigateToProfile} />}
                    {modalData && <ListModal content={modalData} setModalData={setModalData} />}
                </>
            )}
        </section>
    )
}
