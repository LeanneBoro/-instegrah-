import { useEffect, useState, useRef } from 'react';
import { ProfileImg } from "./ProfileImg";
import { utilService } from '../services/util.service';
import { ListModal } from "./ListModal";

export function CommentPreview({ selectedPost, comment, navigateToProfile }) {
    
    const [modalData, setModalData] = useState(null)
    console.log(modalData);



    return <section className="comment-preview flex">

        <div onClick={() => navigateToProfile(comment.by.id)} className='cursor-pointer'>
            <ProfileImg imgUrl={comment.by.imgUrl} diameter={'35px'} />
        </div>


        <section className="comment">

            <section className="content">
                <h2 onClick={() => navigateToProfile(comment.by.id)} className="username cursor-pointer">{comment.by.fullname}</h2>

                <span >{comment.txt}</span>

            </section>
            <section className="details">

                <div>{utilService.timeDifferenceUpToWeeks(comment.timeStamp)}</div>

                <div onClick={() => setModalData({data: comment.likedBy, dataType: 'likes' })}>
                    {comment.likedBy.length > 0 &&
                        `${comment.likedBy.length} ${comment.likedBy.length > 1 ? 'likes' : 'like'}`}
                </div>

                <div>reply</div>

            </section>


        </section>

        {modalData && <ListModal content={modalData} setModalData={setModalData}/>}

    </section>
}