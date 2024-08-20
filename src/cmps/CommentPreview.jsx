
import { ProfileImg } from "./ProfileImg";


export function CommentPreview({ setModalData, comment, navigateToProfile }) {


    return <section className="comment-preview flex">

        <div onClick={() => navigateToProfile(comment.by.id)} className='cursor-pointer'>
            <ProfileImg imgUrl={comment.commenter.profileImg} diameter={'35px'} />
        </div>


        <section className="comment">

            <section className="content">
                <h2 onClick={() => navigateToProfile(comment.by)} className="username cursor-pointer">{comment.commenter.username}</h2>

                <span >{comment.text}</span>

            </section>
            <section className="details">

                {/* <div>{utilService.timeDifferenceUpToWeeks(comment.timeStamp)}</div> */}

                <div onClick={() => setModalData({ data: comment.commentLikedBy, dataType: 'likes' })}>
                    {comment.commentLikedBy.length > 0 &&
                        `${comment.commentLikedBy.length} ${comment.commentLikedBy.length > 1 ? 'likes' : 'like'}`}
                </div>

                <div>reply</div>

            </section>


        </section>


    </section>
}