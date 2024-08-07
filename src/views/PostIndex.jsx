import { useEffect, useState } from "react"

import { loadPosts } from '../store/actions/post.actions'
import { useSelector } from 'react-redux'

import { PostList } from "../cmps/PostList"
import { postService } from "../services/post.local.service"
import { Loader } from "../cmps/Loader"
// import { userService } from "../services/demoData.service"

export function PostIndex() {
    const { posts } = useSelector(storeState => storeState.postModule)
    const isLoading = useSelector(storeState => storeState.utilityModule.isLoading);

    useEffect(() => {
        loadPosts()
    }, [])



    return (

        <section className="main-layout post-index">
            {/* <div className="loader-layout"> */}
                {isLoading && <Loader />}
            {/* </div> */}

            <PostList posts={posts} />
        </section>
    )
}