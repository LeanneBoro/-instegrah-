
import { toggleFollow } from "../store/actions/post.actions";

export function FollowBtn({ profile }) {


    return <section className="follow-btn" onClick={() => toggleFollow(profile._id)}>
        <h2>follow</h2>
    </section>
}