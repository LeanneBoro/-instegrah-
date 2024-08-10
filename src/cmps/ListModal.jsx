import { useEffect, useState, useRef } from 'react';
import { userService } from "../services/user.service"
import { ProfilePreview } from './ProfilePreview';
import { BackDrop } from './BackDrop';
import { Loader } from './Loader';

export function ListModal({ content, setModalData}) {
    const [profiles, setProfiles] = useState()
    const [loading, setIsLoading] = useState(false)



    useEffect(() => {
        fetchProfiles()

        async function fetchProfiles() {
            try {
                setIsLoading(true)
                const userProfiles = await userService.getUsersById(content.data)
                setProfiles(userProfiles)
            } catch (err) {
                console.error('Failed to fetch user profiles:', err)
            }
            finally{
                setIsLoading(false)
            }
        }

    }, [])

    return (
        <BackDrop  zIndex={1100} dataState={setModalData}>

            <section className="list-modal">
                <h2 className="data-type">{content.dataType}</h2>
                    {loading && <Loader/>}

                <section className="data-list">
                    {profiles && profiles.map(profile => {
                        
                        return <ProfilePreview profile={profile}/>
                       
                
                    })}

                </section>




            </section>
        </BackDrop>)

}