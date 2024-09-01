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
    const [pagination, setPagination] = useState({ skip: 0, limit: 3 })
    const [loader, displayLoader] = useState(false)

    useEffect(() => {
        loadPosts(pagination)


    }, [pagination])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            displayLoader(true)
            setPagination(prevPagination => {
                return { ...prevPagination, skip: prevPagination.skip + prevPagination.limit }

            })
        } else{
            displayLoader(false)
        }


    }



    return (

        <section className="main-layout post-index">

            {isLoading && <div className='loader-container-index'><Loader /></div>}


            <PostList posts={posts} />
            <div className="loader-container">
               {loader && <img className="loader" src="src\imgs\InstagrahLoader.gif" alt="" />}
            </div>
        </section>
    )
}