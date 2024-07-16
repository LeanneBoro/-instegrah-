import { ProfileImg } from "./ProfileImg";

export function CommentPreview({ selectedPost, comment }) {



    return <section className="comment-preview">

    
        <ProfileImg imgUrl={comment.by.imgUrl} diameter={'35px'}/>
        

        <h2 className="username">{comment.by.fullname}</h2>
        <span >{comment.txt}</span>
    </section>
}