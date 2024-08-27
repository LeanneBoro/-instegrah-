
import { useEffect } from "react";
import { userService } from "../services/user.service";
import { toggleFollow } from "../store/actions/user.actions";

export function FollowBtn({ profile }) {

    const isFollowing = userService.checkIfFollowing(profile.followers)
    ? 'following'
    : ''


    return <section className={`follow-btn ${isFollowing}`} onClick={() => toggleFollow(profile._id)}>
        <h2>{isFollowing ? 'following' : 'follow' }</h2>
    </section>
}