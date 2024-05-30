

export function PostPreview({ post, idx }) {
    return (
        <div>
            <img src={`https://picsum.photos/id/${idx}/200/300`}></img>
            <h1>{post.txt}</h1>
        </div>
    )
}