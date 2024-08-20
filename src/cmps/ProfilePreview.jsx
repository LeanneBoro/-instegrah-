import { ProfileImg } from "./ProfileImg"

export function ProfilePreview({ profile }) {
    return <section className="profile-preview" key={profile.fullname}>

        <ProfileImg imgUrl={profile.profileImg} diameter={"45px"} />

        <div className='names'>
        <h2>{profile.username}</h2>
        {profile.fullname}
    </div>


    </section>
}

