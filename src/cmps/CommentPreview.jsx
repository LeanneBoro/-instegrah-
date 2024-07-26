import { ProfileImg } from "./ProfileImg";
import { utilService } from '../services/util.service';

export function CommentPreview({ selectedPost, comment, navigateToProfile }) {



    return <section className="comment-preview flex">

<div onClick={() => navigateToProfile(comment.by.id)} className='cursor-pointer'>
        <ProfileImg imgUrl={comment.by.imgUrl} diameter={'35px'} />
</div>


        <section className="comment">

            <section className="content">
                <h2 onClick={() => navigateToProfile(comment.by.id)} className="username cursor-pointer">{comment.by.fullname}</h2>

                <span >{comment.txt}</span>

            </section>
            <section className="details">

                <div>{utilService.timeDifferenceUpToWeeks(comment.timeStamp)}</div>

                <div>
                    {comment.likedBy.length > 0 &&
                        `${comment.likedBy.length} ${comment.likedBy.length > 1 ? 'likes' : 'like'}`}
                </div>

                <div>reply</div>

            </section>


        </section>



    </section>
}