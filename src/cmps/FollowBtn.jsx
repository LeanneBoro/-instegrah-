
import { useState } from "react";
import { userService } from "../services/user.service";
import { toggleFollow } from "../store/actions/user.actions";
import { Loader } from "./Loader";
import { useSelector } from "react-redux";

export function FollowBtn({ profile }) {
    const { disableFollowingBtn } = useSelector(storeState => storeState.utilityModule)
    const [followingLoading, setFollowingLoading] = useState(false)
    const isFollowing = userService.checkIfFollowing(profile.followers)
        ? 'following'
        : ''

    async function handleFollow(followId) {
        if (disableFollowingBtn) return
        setFollowingLoading(true)
        try {
            await toggleFollow(followId)
        }

        catch (err) {

        }

        finally {
            setFollowingLoading(false)
        }



    }


    return <section className={`follow-btn ${isFollowing} ${disableFollowingBtn ? 'disabled' : '' } `} onClick={() => handleFollow(profile._id)}>
        <h2>
            {isFollowing ? 'following ' : 'follow '}
           
        </h2>

        {followingLoading &&
            <div className="loader-container"><img className="follow-loader" src="src\imgs\InstagrahLoader.gif" alt="" /></div>
        }


    </section>
}