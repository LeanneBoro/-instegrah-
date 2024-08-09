import { PostPreview } from "./PostPreview"
import { PostPreviewPlaceholder } from "./PostPreviewPlaceholder"


export function PostList({ posts }) {



    return (
        <section>
          
            <ul className="clean-list post-list">
                {
                    posts.map((post, idx) => {
                        return (
                            <PostPreview post={post} idx={idx} key={idx}/>
                        )
                    })
                }
            </ul>
        </section>
    )
}