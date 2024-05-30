import { useEffect, useState } from "react"
import { postService } from "../services/post.local.service"
import { PostList } from "../cmps/PostList"

export function PostIndex() {

    const [posts, setPosts] = useState(null)


    useEffect(() => {
        loadPosts()
    }, [])

    async function loadPosts() {
        try {
            const posts = await postService.query()
            setPosts(posts)
        } catch (error) {
            console.error('Failed to fetch posts:', error)
        }
    }

    if (!posts) return <h1>Loading....</h1>
    return (
        <section className="main-layout">
            <h1>I am a post index</h1>
            <PostList posts={posts} />
        </section>
    )
}