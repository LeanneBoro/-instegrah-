import { useRef, useState } from 'react'
import { ProfileImg } from './ProfileImg'
import { UploadProfileImg } from './UploadProfileImg'

export function LoginSignUp({ setExpandedSection }) {
    const modalRef = useRef(null)
    const [signUp, setSignUp] = useState(false) // Default to false if not specified
    const [selectionModal, openSelectionModal] = useState(false)
    const [profileImg, setProfileImg] = useState(null)

    const imgSrc = profileImg ? profileImg : "src/assets/svgs/Profile.svg"
    const buttonText = profileImg ? "Change Image" : "Upload Profile Image"

    // Button configuration based on `signUp` state
    const buttonConfig = {
        cyanBtn: {
            class: 'cyan-btn',
            text: signUp ? 'Already Signed up' : 'Log In'
        },
        pinkBtn: {
            class: 'pink-btn',
            text: signUp ? 'Complete Sign Up' : 'Sign Up'
        },

    }

    // Determine button configuration based on `signUp`
    const btn1Config = signUp ? buttonConfig.pinkBtn : buttonConfig.cyanBtn
    const btn2Config = signUp ? buttonConfig.cyanBtn : buttonConfig.pinkBtn

    const handleLayoutClick = () => {
        setExpandedSection('')
    }

    const handleModalClick = (event) => {
        event.stopPropagation()
    }

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
                            <div className={`btn-1 ${btn1Config.class}`}>{btn1Config.text}</div>
                            <div className={`btn-2 ${btn2Config.class}`} onClick={() => setSignUp(!signUp)}>
                                {btn2Config.text}
                            </div>
                        </section>
                    </>
                )}

                {selectionModal && <UploadProfileImg openSelectionModal={openSelectionModal} setProfileImg={setProfileImg} />}
            </section>
        </section>
    )
}
