import { useEffect, useState, useRef } from 'react';
import { userService } from "../services/user.service"
import { ProfilePreview } from './ProfilePreview';
import { BackDrop } from './BackDrop';
import { Loader } from './Loader';
import { FollowBtn } from './FollowBtn';
import { loadUsers } from '../store/actions/user.actions';
import { useSelector } from 'react-redux';

export function ListModal({ content, setModalData }) {
    const [loading, setIsLoading] = useState(false)
    const usersData = useSelector(storeState => storeState.userModule.usersData);


console.log(usersData);

    useEffect(() => {
        loadUsers(content.data)

    }, [content.data])




    return (
        <BackDrop zIndex={5000000000000000} dataState={setModalData}>
            <section className="list-modal">
                <h2 className="data-type">{content.dataType}</h2>
                    {loading && <Loader/>}

                <section className="data-list">
                    {usersData && usersData.map((profile,index) => {
                        
                        return  (
                            <section className='item'>
                            <ProfilePreview key={index} profile={profile}/>
                            <FollowBtn profile={profile}/>
                            </section>
                        )
                        
                        
                       
               
                       
                
                    })}

                </section>




            </section>
        </BackDrop>)

}