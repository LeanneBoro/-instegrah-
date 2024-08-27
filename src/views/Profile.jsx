import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { clearProfileData, loadPostsByUser } from '../store/actions/post.actions'
import { ProfileImg } from '../cmps/ProfileImg'
import { PostDetail } from '../cmps/PostDetail'
import { Loader } from '../cmps/Loader'
import { ListModal } from '../cmps/ListModal'

export function Profile() {
    const { userId } = useParams()

    const user = useSelector(storeState => storeState.postModule.profilePostOwner)
    const posts = useSelector(storeState => storeState.postModule.profilePagePosts)
    const isLoading = useSelector(storeState => storeState.utilityModule.isLoading)
    const [selectedPost, setSelectedPost] = useState(null)
    const [modalData, setModalData] = useState(null)




    const navigate = useNavigate()

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    function navigateToProfile(id) {
        setSelectedPost(null)
        navigate(`/profile/${id}`)
    }

    useEffect(() => {
        loadPostsByUser(userId)

        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            clearProfileData()
        }
    }, [userId])


    if (isLoading || !user || !user.following || !user.followers) {
        return (
            <div className='loader-container-index'><Loader /></div>
        )
    }

    return (
        <section className="profile-page-layout profile">
            <section className="information profile-info-layout">
                <div className="profile-container">
                    <ProfileImg imgUrl={user.profileImg} diameter={screenWidth > 780 ? "160px" : "90px"} />
                </div>

                <section className="actions-and-details">
                    <section className="actions">
                        <div className="username">{user.username}</div>
                        <button>Edit Profile</button>
                    </section>

                    <section className="metrics">
                        <h2>{posts.length} posts</h2>
                        <h2 onClick={() => setModalData({ data: user.following, dataType: 'following' })}>{user.following.length} following</h2>
                        <h2 onClick={() => setModalData({ data: user.followers, dataType: 'followers' })}>{user.followers.length} followers</h2>
                    </section>

                    <h2 className="owner-name">{user.fullname}</h2>
                </section>
            </section>

            <section className="compact-metrics">
                <section>
                    <h2>{posts.length}</h2>
                    <div>posts</div>
                </section>
                <section onClick={() => setModalData({ data: user.following, dataType: 'following' })}>
                    <h2>{user.followers.length}</h2>
                    <div>followers</div>
                </section>
                <section onClick={() => setModalData({ data: user.followers, dataType: 'followers' })}> 
                    <h2>{user.following.length}</h2>
                    <div>following</div>
                </section>
            </section>

            <section className="profile-post-layout posts">
                {posts.map((post, idx) => (
                    <div onClick={() => setSelectedPost(post)} key={idx} className="post-img-container">
                        <img className='post-img' src={post.image} alt="" />
                        <div className='back-drop'></div>
                        <div className='details'>
                            <img src="src/assets/svgs/HeartBold.svg" alt="Heart Icon" />
                            <h1>{post.likes.length}</h1>
                            <img src="src/imgs/Comment-Bold.png" alt="" />
                            <h1>{post.comments.length}</h1>
                        </div>
                    </div>
                ))}
            </section>

            {selectedPost && <PostDetail
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
                navigateToProfile={navigateToProfile}
                setModalData={setModalData} />}

            {modalData && <ListModal content={modalData} setModalData={setModalData} />}
        </section>
    )
}
