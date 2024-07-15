import { useEffect, useState } from "react"
import { demoDataService } from "../services/demoData.service"
import { PostList } from "../cmps/PostList"
// import { userService } from "../services/demoData.service"

export function PostIndex() {

    const [posts, setPosts] = useState(null)


    useEffect(() => {
        loadPosts()
    }, [])

    async function loadPosts() {
        try {
            const posts = await demoDataService.query()
            // const posts = await postService.query()
            setPosts(posts)
        } catch (error) {
            console.error('Failed to fetch posts:', error)
        }
    }

    if (!posts) return <h1>Loading....</h1>
    return (
        <section className="main-layout post-index">
            <PostList posts={posts} />
        </section>
    )
}