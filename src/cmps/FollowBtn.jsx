
import { useState } from "react";
import { userService } from "../services/user.service";
import { toggleFollow } from "../store/actions/user.actions";
import { Loader } from "./Loader";

export function FollowBtn({ profile }) {
    const [followingLoading, setFollowingLoading] = useState(false)

    const isFollowing = userService.checkIfFollowing(profile.followers)
        ? 'following'
        : ''

    async function handleFollow(id) {
        setFollowingLoading(true)
        try {
            await toggleFollow(id)
        }

        catch (err) {

        }

        finally {
            setFollowingLoading(false)
        }



    }


    return <section className={`follow-btn ${isFollowing}`} onClick={() => handleFollow(profile._id)}>
        <h2>{isFollowing ? 'following' : 'follow'}</h2>

        {followingLoading && 
        <div className="loader-container"><img className="follow-loader" src="src\imgs\InstagrahLoader.gif" alt="" /></div>
        }


    </section>
}