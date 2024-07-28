import { useEffect, useState, useRef } from 'react';
import { userService } from "../services/user.service"
import { ProfileImg } from './ProfileImg';
import { BackDrop } from './BackDrop';

export function ListModal({ content, setModalData}) {
    const [profiles, setProfiles] = useState()
    console.log(profiles);


    useEffect(() => {
        fetchProfiles()

        async function fetchProfiles() {
            try {
                const userProfiles = await userService.getUsersById(content.data)
                setProfiles(userProfiles)
            } catch (err) {
                console.error('Failed to fetch user profiles:', err)
            }
        }

    }, [])

    return (
        <BackDrop  zIndex={1100} dataState={setModalData}>

            <section className="list-modal">
                <h2 className="data-type">{content.dataType}</h2>

                <section className="data-list">
                    {profiles && profiles.map(profile => {
                        return (
                            <div className='profile' key={profile._id}>

                                <ProfileImg imgUrl={profile.profileImg} diameter={"45px"} />


                                <div className='names'>
                                    <h2>{profile.username}</h2>
                                    {profile.fullname}
                                </div>

                            </div>
                        );
                    })}

                </section>




            </section>
        </BackDrop>)

}