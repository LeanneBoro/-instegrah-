import { useEffect, useState, useRef } from 'react';
import { CommentPreview } from './CommentPreview';

export function PostDetail({ selectedPost, setSelectedPost }) {

    const [isBackdropDisabled, setIsBackdropDisabled] = useState(false)
    const inputRef = useRef(null)

    console.log(selectedPost.likedBy.fullname);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 780) {
                setIsBackdropDisabled(true);
            } else {
                setIsBackdropDisabled(false);
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])


    function handleBackdropClick(event) {

        if (event.target === event.currentTarget && !isBackdropDisabled) {
            setSelectedPost(null)
        }
    }

    function handleCommentBtnClick() {
        inputRef.current.focus()
    }

    return <div onClick={handleBackdropClick} className="backdrop">

        <img className="close-btn" onClick={handleBackdropClick} src="src\assets\svgs\close.svg" alt="" />

        <section className="post-details">

            <section className="details-nav">

                <img className="back-btn" src="src\assets\svgs\Close-Arrow.svg" alt="" onClick={() => setSelectedPost(null)} />

                <div>Post</div>

            </section>

            <section className="img-container">
                <img src={`https://picsum.photos/id/1/400/500`}></img>
            </section>

            <section className="media">

                <section className="header">

                    <div className="profile-picture">

                    </div>

                    <section className="profile-details">

                        <h2 className="username">{selectedPost.by.fullname}</h2>


                    </section>

                    <section className="options">
                        ...
                    </section>

                </section>

                <div className="post-title">

                    <div className="profile-picture"></div>

                    <h2 className="username">{selectedPost.by.fullname}</h2>
                    <span >{selectedPost.txt}</span>

                </div>

                <section className="comment-list">

                    {selectedPost.comments.map(comment => {

                        return <CommentPreview comment={comment} />

                    })}

                </section>


                <section className="likes-and-actions">

                    <section className="actions">


                        <img className='comment' src="src\assets\svgs\Heart.svg" alt="" />
                        <img onClick={handleCommentBtnClick}  className='like' src="src\assets\svgs\Comment.svg" alt="" />

                    </section>

                    <section className="likes-and-date">

                        <section className="likes">

                            <div className="liked-by-profile">
                                {selectedPost.likedBy.slice(0, 3).map((like, index) => (
                                    <div key={index} className='profile'></div>
                                ))}
                            </div>

                            <div className="amount">
                                liked by <h2>{selectedPost.likedBy[0].fullname} </h2>
                                {selectedPost.likedBy.length >= 2 ? (
                                    <>
                                        and <h2>{selectedPost.likedBy[1].fullname}</h2>
                                    </>
                                ) : (
                                    <>
                                        and <h2>{selectedPost.likedBy.length - 1} more</h2>
                                    </>
                                )}
                            </div>


                        </section>

                        <div className="date">

                        </div>

                    </section>





                </section>

                <section className="add-comment">

                    <input ref={inputRef} type="text" placeholder="Add a comment" />


                </section>

            </section>


        </section>

    </div>


}