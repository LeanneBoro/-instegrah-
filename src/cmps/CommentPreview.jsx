export function CommentPreview({ comment }) {

    console.log('hi');

    return <section className="comment-preview">
        <div className="profile-picture"></div>

        <h2 className="username">{comment.by.fullname}</h2>
        <span >{comment.txt}</span>
    </section>
}