import { useEffect, useState } from "react"

import { loadPosts } from '../store/actions/post.actions'
import { useSelector } from 'react-redux'

import { PostList } from "../cmps/post cmps/PostList"
import { postService } from "../services/post.local.service"
import { Loader } from "../cmps/Loader"
import { userService } from "../services/user.service"
import { cloudinaryLinks } from "../services/cloudinary.service"
import { setNavBarSection } from "../store/actions/utility.actions"

export function PostIndex() {
    const { postsByFollowing, suggestedPosts } = useSelector(storeState => storeState.postModule)
    const isLoading = useSelector(storeState => storeState.utilityModule.isLoading);
    const [pagination, setPagination] = useState({ skip: 0, limit: 3 })
    const [loader, displayLoader] = useState(false)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser);



    const dividerText = userService.getLoggedInUser()
        ? postsByFollowing > 0
            ? "You're all caught up!\nFollow more users to see more posts"
            : 'Follow users to see their posts in the Home page'
        : (
            <>

                <h1 onClick={handleLoginAttempt} className="log-in-link">
                    Log In {' '}
                </h1>
                to catch up with the users you are following!
            </>
        )

    useEffect(() => {
        const user = userService.getLoggedInUser()
        user ? loadPosts(pagination, user._id) : loadPosts(pagination)


    }, [pagination,loggedInUser])


function handleLoginAttempt(event){
    event.stopPropagation()
    setNavBarSection('login')
}

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
        } else {
            displayLoader(false)
        }


    }


    return (
        <>
        <section className="main-layout post-index">

            {isLoading && <div className='loader-container-index'><Loader /></div>}

            {/* <section className="reloader third-section-layout">
                <img className="open-img" src="src\imgs\openSlideIcon.webp" alt="" />
                <img className="reload-img" src="src\imgs\Refresh.png" alt="" />
               <h2>refresh posts</h2>
            </section> */}


            {postsByFollowing.length > 0 && <PostList posts={postsByFollowing} />}

            {suggestedPosts.length > 0 && <section className="divider">
                {postsByFollowing.length > 0 && <img src={cloudinaryLinks.checkMark} alt="" />}
                <h1>{dividerText}</h1>
                <div> meanwhile, here are suggested posts by other users</div>
            </section>}

            {suggestedPosts && <PostList posts={suggestedPosts} />}
            <div className="loader-container">
                {loader && <img className="loader" src={cloudinaryLinks.loadingGif} alt="" />}
            </div>
          
        </section>


        </>
    )
    
}