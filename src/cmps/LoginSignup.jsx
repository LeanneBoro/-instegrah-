import { useRef, useState } from 'react';
import { ProfileImg } from './ProfileImg';
import { UploadProfileImg } from './UploadProfileImg';

export function LoginSignUp({ setExpandedSection }) {
    const modalRef = useRef(null)
    const [signUp, ShowSignUp] = useState()
    const [selectionModal, openSelectionModal] = useState(false)
    const [profileImg, SetProfileImg] = useState(null)


    const imgSrc = profileImg
        ? profileImg
        : "src/assets/svgs/Profile.svg"

    const buttonText = profileImg
        ? "Change Image"
        : "Upload Profile Image"





    const handleLayoutClick = () => {
        setExpandedSection('')
    }



    const handleModalClick = (event) => {
        event.stopPropagation()
    };

    return (
        <section
            onClick={handleLayoutClick}
            className="login-signup-layout"
        >
            <section
                ref={modalRef}
                className={`login-signup ${selectionModal ? 'extended' : ''}`}
                onClick={handleModalClick}
            >
                {!selectionModal && (
                    <>
                        <div className="logo"></div>
                        <img src="src/assets/svgs/IntagramLogo.svg" alt="Instagram Logo" />
                        <section className="login-input-container">
                            <input placeholder="Enter username" type="text" />
                            <input placeholder="Enter password" type="text" />
                            {signUp && <input placeholder='Enter Full Name' type="text" />}
                            {signUp && (
                                <section className='upload-profile'>
                                    <div className='image-container'>
                                        <ProfileImg imgUrl={imgSrc} diameter={"100px"} />
                                    </div>
                                    <div onClick={() => openSelectionModal(true)} className='text'>
                                       {buttonText}
                                    </div>
                                </section>
                            )}
                        </section>
                        <section className="login-btn-container">
                            <div>Login</div>
                            <div onClick={() => ShowSignUp(!signUp)}>Sign-Up</div>
                        </section>
                    </>
                )}


                {selectionModal && <UploadProfileImg openSelectionModal={openSelectionModal} SetProfileImg={SetProfileImg} />}
            </section>

        </section>
    );
}
