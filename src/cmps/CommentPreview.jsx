import { postService } from "../services/post.local.service"
import { utilService } from "../services/util.service";
import { CommentPreviewPlaceholder } from "./CommentPreviewPlaceholder"
import { ProfileImg } from "./ProfileImg"
import { toggleCommentLike } from "../store/actions/post.actions";
import { userService } from "../services/user.service";

export function CommentPreview({ setModalData, comment, navigateToProfile,isCommentLoading,postId }) {

    
    if (isCommentLoading) return <CommentPreviewPlaceholder />
    return (
        <section  className="comment-preview flex">
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
                    <div onClick={() => setModalData({ data: comment.likes, dataType: 'likes' })}>
                        {comment.likes.length > 0 &&
                            `${comment.likes.length} ${comment.likes.length > 1 ? 'likes' : 'like'}`}
                    </div>
                    <div>reply</div>
                </section>
            </section>

           {userService.getLoggedInUser() && <div className="like" onClick={() => toggleCommentLike(comment,postId)}>
                <img
                    src={postService.isCommentLiked(comment)
                        ? 'src/imgs/HeartFull.png'
                        : 'src/assets/svgs/Heart.svg'}
                    alt=""
                    
                />
            </div>}
        </section>
    )
}
