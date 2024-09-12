import { useEffect, useState, useRef } from 'react';
import { userService } from "../services/user.service"
import { ProfilePreview } from './ProfilePreview';
import { BackDrop } from './BackDrop';
import { Loader } from './Loader';
import { FollowBtn } from './FollowBtn';
import { loadUsers } from '../store/actions/user.actions';
import { useSelector } from 'react-redux';
import { CommentPreviewPlaceholder } from './CommentPreviewPlaceholder';

export function ListModal({ content, setModalData }) {

    const usersData = useSelector(storeState => storeState.userModule.usersData);
    const { isListLoading } = useSelector(storeState => storeState.utilityModule)

    console.log("🚀 ~ ListModal ~ usersData:", usersData)


    useEffect(() => {
        loadUsers(content.data)

    }, [content.data])





    return (
        <BackDrop zIndex={5000000000000000} dataState={setModalData}>
            <section className="list-modal">
                <h2 className="data-type">{content.dataType}</h2>
    
                <section className="data-list">
                    {isListLoading ? (
                        Array.from({ length: content.data.length }, (_, index) => (
                            <CommentPreviewPlaceholder key={index} />
                        ))
                    ) : (
                        usersData && usersData.map((profile, index) => (
                        
                            <section className='item' key={index}>
                                <ProfilePreview profile={profile} />
                                <FollowBtn profile={profile} />
                            </section>
                        ))
                    )}
                </section>
            </section>
        </BackDrop>
    )
    

}