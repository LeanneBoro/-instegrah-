import { ProfileImg } from "./ProfileImg";
import { utilService } from '../services/util.service';

export function CommentPreview({ selectedPost, comment }) {



    return <section className="comment-preview flex">


        <ProfileImg imgUrl={comment.by.imgUrl} diameter={'35px'} />


        <section className="comment">

            <section className="content">
                <h2 className="username">{comment.by.fullname}</h2>

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