import { useEffect, useState, useRef } from 'react';
import { userService } from "../services/user.service"
import { ProfilePreview } from './ProfilePreview';
import { BackDrop } from './BackDrop';
import { Loader } from './Loader';

export function ListModal({ content, setModalData}) {
    const [loading, setIsLoading] = useState(false)





    return (
        <BackDrop  zIndex={5000000000000000} dataState={setModalData}>

            <section className="list-modal">
                <h2 className="data-type">{content.dataType}</h2>
                    {loading && <Loader/>}

                <section className="data-list">
                    {content && content.data.map((profile,index) => {
                        
                        return <ProfilePreview key={index} profile={profile}/>
               
                       
                
                    })}

                </section>




            </section>
        </BackDrop>)

}