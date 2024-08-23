import { postService } from "../services/post.local.service"
import { utilService } from "../services/util.service";
import { CommentPreviewPlaceholder } from "./CommentPreviewPlaceholder"
import { ProfileImg } from "./ProfileImg"

export function CommentPreview({ setModalData, comment, navigateToProfile,isCommentLoading }) {

    if (isCommentLoading) return <CommentPreviewPlaceholder />
    console.log(comment);
    

    return (
        <section className="comment-preview flex">
            <div onClick={() => navigateToProfile(comment.by.id)} className='cursor-pointer'>
                <ProfileImg imgUrl={comment.by.profileImg} diameter={'35px'} />
            </div>

            <section className="comment">
                <section className="content">
                    <div className="text">
                        <h2 onClick={() => navigateToProfile(comment._id)} className="username cursor-pointer">
                            {comment.by.username}
                        </h2>
                        <span>{comment.text}</span>
                    </div>
                </section>
                <section className="details">
                        <div>{utilService.timeDifferenceUpToWeeks(comment.createdAt)}</div>
                    <div onClick={() => setModalData({ data: comment.likedBy, dataType: 'likes' })}>
                        {comment.likedBy.length > 0 &&
                            `${comment.likedBy.length} ${comment.likedBy.length > 1 ? 'likes' : 'like'}`}
                    </div>
                    <div>reply</div>
                </section>
            </section>

            <div className="like">
                <img
                    src={postService.isCommentLiked(comment)
                        ? 'src/imgs/HeartFull.png'
                        : 'src/assets/svgs/Heart.svg'}
                    alt=""
                />
            </div>
        </section>
    )
}
