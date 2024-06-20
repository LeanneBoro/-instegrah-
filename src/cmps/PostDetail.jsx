export function PostDetail({ selectedPost, setSelectedPost }) {

    console.log(selectedPost);

    return <section className="post-details">

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
                <h2 className="username">{selectedPost.by.fullname}</h2>
                <span >{selectedPost.txt}</span> 

            </div>

            <section className="comment-list">

            </section>


            <section className="likes-and-actions">

                <section className="actions">

                    <div>
                        {/* <img src="src\assets\svgs\Heart.svg" alt="" />
                        <img src="src\assets\svgs\Heart.svg" alt="" /> */}
                    </div>

                </section>

                <section className="likes-and-date">

                    <section className="likes">

                        <div className="liked-by-profile">

                        </div>

                        <div className="likes-amount">

                        </div>


                    </section>

                    <div className="date">

                    </div>

                </section>





            </section>

            <section className="add-comment">

                <input type="text" placeholder="Add a comment" />


            </section>

        </section>


    </section>




}