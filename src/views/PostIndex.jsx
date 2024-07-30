import { useEffect, useState } from "react"

import {loadPosts} from '../store/actions/post.actions'
import { useSelector } from 'react-redux'

import { PostList } from "../cmps/PostList"
import { postService } from "../services/post.local.service"
// import { userService } from "../services/demoData.service"

export function PostIndex() {
    const {posts} =useSelector(storeState => storeState.postModule)


    useEffect(() => {
        loadPosts()
    }, [])


    if (!posts) return <h1>Loading....</h1>
    return (
        <section className="main-layout post-index">
            <PostList posts={posts} />
        </section>
    )
}