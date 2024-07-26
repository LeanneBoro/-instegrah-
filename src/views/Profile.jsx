import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '../services/user.service';
import { ProfileImg } from '../cmps/ProfileImg';
import { PostDetail } from '../cmps/PostDetail';
import { useNavigate } from 'react-router-dom';

// import { PostDetail } from '../PostDetail';





export function Profile() {
    const { userId } = useParams()

    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    function navigateToProfile(id) {
        setSelectedPost(null)
        navigate(`/profile/${id}`)
    }

    useEffect(() => {
        loadUser()

        async function loadUser() {
            try {
                const user = await userService.getUserById(userId)
                const userPosts = await userService.getUserPosts(userId)

                setUser(user)
                setPosts(userPosts)

            } catch (error) {
                console.error('Failed to fetch posts:', error)
            }

            finally {
                setIsLoading(false);
            }


        }

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }


    }, [user])

    if (isLoading) {
        return <div>Loading...</div>; // Replace this with your loading indicator if needed
    }


    return <section className="profile-page-layout profile">

        <section className="information profile-info-layout ">

            <div className="profile-container">

                <ProfileImg imgUrl={user.profileImg} diameter={screenWidth > 780 ? "160px" : "90px"} />




            </div>

            <section className="actions-and-details">

                <section className="actions">

                    <div className="username">{user.username}</div>

                    <button> Edit Profile</button>

                </section>

                <section className="metrics">

                    <h2> X span</h2>

                    <h2> X followers</h2>

                    <h2> X following</h2>
                </section>

                <h2 className="owner-name"> {user.fullname}</h2>

            </section>




        </section>
        <section className="compact-metrics">

            <section >
                <h2>X</h2>
                <div>posts</div>
            </section>

            <section >
                <h2>X</h2>
                <div>followers</div>
            </section>

            <section >
                <h2>X</h2>
                <div>following</div>
            </section>

        </section>



        <section className="profile-post-layout posts">
            {
                posts.map((post, idx) => {
                    return (
                        <div onClick={() => setSelectedPost(post)} key={idx} className="post-img-container">
                            <img className='post-img' src={post.postImg} alt="" />
                            <div className='back-drop'></div>
                            <div className='details'>
                                <img src="src\assets\svgs\HeartBold.svg" alt="Heart Icon" />
                                <h1>{post.likedBy.length}</h1>
                                <img src="src\imgs\Comment-Bold.png" alt="" />
                                <h1>{post.comments.length}</h1>
                                
                            </div>
                        </div>
                    )
                })
            }
        </section>

        {selectedPost && <PostDetail selectedPost={selectedPost} setSelectedPost={setSelectedPost} navigateToProfile={navigateToProfile} />}


    </section>

}