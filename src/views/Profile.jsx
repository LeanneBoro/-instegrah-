import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '../services/user.service';
import { ProfileImg } from '../cmps/ProfileImg';
import { PostDetail } from '../cmps/PostDetail';
import { useNavigate } from 'react-router-dom';

import { loadUser, } from '../store/actions/user.actions';
import { loadPostsByUser } from '../store/actions/post.actions';
import { useSelector } from 'react-redux';

// import { PostDetail } from '../PostDetail';





export function Profile() {
    const { userId } = useParams()

    const user = useSelector(storeState => storeState.userModule.user)
    const posts = useSelector(storeState => storeState.postModule.posts)
    const [selectedPostId, setSelectedPostId] = useState(null)


    const navigate = useNavigate();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    function navigateToProfile(id) {
        setSelectedPostId(null)
        navigate(`/profile/${id}`)
    }

    useEffect(() => {
        loadUser(userId)
        loadPostsByUser(userId)


        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }


    }, [userId])





    return user && <section className="profile-page-layout profile">

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
                        <div onClick={() => setSelectedPostId(post._id)} key={idx} className="post-img-container">
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

        {selectedPostId && <PostDetail selectedPostId={selectedPostId} setSelectedPostId={setSelectedPostId} navigateToProfile={navigateToProfile} />}


    </section>

}