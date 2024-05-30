

export function PostList({ posts }) {



    return (
        <section>
            <h1>I am a list</h1>
            <ul className="clean-list post-list">
                {
                    posts.map((post,idx)=> {
                        return (
                            <li key={post._id}>
                                <div>
                                    <img src={`https://picsum.photos/id/${idx}/200/300`}></img>
                                    <h1>{post.txt}</h1>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}