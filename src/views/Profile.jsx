import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '../services/user.service';
import { ProfileImg } from '../cmps/ProfileImg';





export function Profile() {
    const { userId } = useParams()

    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)


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


    }, [])

    if (isLoading) {
        return <div>Loading...</div>; // Replace this with your loading indicator if needed
    }


    return <section className="profile-page-layout profile">

        <section className="information profile-info-layout ">

            <div className="profile-container">

            <ProfileImg imgUrl={user.profileImg} diameter={"160px"}/>




            </div>

            <section className="actions-and-details">

                <section className="actions">

                    <div className="username">here be username</div>

                    <button> Edit Profile</button>

                </section>

                <section className="metrics">

                    <h2> X span</h2>

                    <h2> X followers</h2>

                    <h2> X following</h2>
                </section>

                <h2 className="owner-name"> here be owner name</h2>

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
                        <div key={idx} className="post-img-container">
                            <img src={post.postImg} alt="" />
                        </div>
                    )
                })
            }
        </section>


    </section>

}