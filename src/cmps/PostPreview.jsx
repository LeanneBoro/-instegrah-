import { useState, useEffect } from 'react'
import { PostDetail } from './PostDetail';
import { userService } from '../services/user.service';
import { ProfileImg } from './ProfileImg';
import { utilService } from '../services/util.service';
import { useNavigate } from 'react-router-dom';
import { ListModal } from './ListModal';

export function PostPreview({ post, idx }) {

    const [selectedPostId, setSelectedPostId] = useState(null)
    const [modalData,setModalData] = useState(null)
    const navigate = useNavigate();

    function navigateToProfile(id) {
        navigate(`/profile/${id}`)
        setSelectedPostId(null)
    }


    return (
        <section className="post-preview">
            <div className="flex post-title">
                <div className="flex align-center">

                    <div onClick={() => navigateToProfile(post.by.id)} className='cursor-pointer'>
                        <ProfileImg imgUrl={post.by.profileImg} diameter={"32px"} />
                    </div>

                    <div>
                        <div className="flex post-by">
                            <h2 onClick={() => navigateToProfile(post.by.id)}>{post.by.fullname}</h2>
                            <div>
                                <span className="time">&nbsp;• {utilService.timeDifferenceUpToWeeks(post.timeStamp, "short")}</span>
                            </div>
                        </div>
                        {/* <h3>{post.loc.name}</h3> */}
                    </div>
                </div>

                <span className="flex justify-center">
                    <svg aria-label="More Options" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More Options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                </span>

            </div>
            <img className='post-img' src={post.postImg}></img>
            <nav className="flex icon-container">
                <div className="flex main-container">
                    <span className="flex justify-center svg-container">
                        <svg aria-label="Like" className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                    </span>
                    <span className="flex justify-center svg-container">
                        <svg aria-label="Comment" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                    </span>
                    <span className="flex justify-center svg-container">
                        <svg aria-label="Share Post" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                    </span>
                </div>
                <span className="flex justify-center svg-container save-container"><svg aria-label="Save" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg></span>
            </nav>
            <h2 className="likes cursor-pointer" onClick={() => setModalData({data: post.likedBy, dataType: 'likes' })}>
                <span >{post.likedBy.length}</span> likes
            </h2>

            <div className="title">
                <h2 onClick={() => navigateToProfile(post.by.id)} className='cursor-pointer'>{post.by.fullname}</h2>
                <div>{post.txt}</div>
            </div>


            <div className="view-all" onClick={() => setSelectedPostId(post._id)}>view all {post.comments.length} comments </div>



            <div className="latest-comment">
                {/* <h2> {postService.getLatestComment(post.comments).user}</h2>
                <div >{postService.getLatestComment(post.comments).comment}</div> */}
            </div>



            {selectedPostId && <PostDetail selectedPostId={selectedPostId} setSelectedPostId={setSelectedPostId} navigateToProfile={navigateToProfile} />}
            {modalData && <ListModal content={modalData} setModalData={setModalData}/>}
        </section>


    )
}