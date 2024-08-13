import { useCallback, useRef, useState } from 'react'
import { ProfileImg } from './ProfileImg'
import { UploadProfileImg } from './UploadProfileImg'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'

export function LoginSignUp({ setExpandedSection }) {
    const modalRef = useRef(null)
    const [signUp, setSignUp] = useState(false)
    const [selectionModal, openSelectionModal] = useState(false)
    const [profileImg, setProfileImg] = useState(null)

    const [newUser, editNewUser] = useState({
        username: '',
        password: '',
        fullname: '',
        profileImg: ''
    })

    const [feedback, setFeedback] = useState({
        usernameFeedback: { type: '', text: '' },
        passwordFeedback: { type: '', text: '' },
        fullnameFeedback: { type: '', text: '' }
    })

    const imgSrc = profileImg ? profileImg : "src/assets/svgs/Profile.svg"
    const buttonText = profileImg ? "Change Image" : "Upload Profile Image"

    const buttonConfig = {
        btn1: {
            class: 'pink-btn',
            text: signUp ? 'Complete Sign Up' : 'Sign Up'
        },
        btn2: {
            class: 'cyan-btn',
            text: signUp ? 'Already Signed up' : 'Log In'
        }
    }

    const btn1Config = signUp ? buttonConfig.btn1 : buttonConfig.btn2
    const btn2Config = signUp ? buttonConfig.btn2 : buttonConfig.btn1

    const feedbackConfig = {
        username: {
            className: `username-input ${feedback.usernameFeedback.type === 'denied' ? 'denied' : (feedback.usernameFeedback.type === 'approved' ? 'approved' : '')}`,
            text: feedback.usernameFeedback.text
        },
        password: {
            className: `password-input ${feedback.passwordFeedback.type === 'denied' ? 'denied' : (feedback.passwordFeedback.type === 'approved' ? 'approved' : '')}`,
            text: feedback.passwordFeedback.text
        },
        fullname: {
            className: `fullname-input ${feedback.fullnameFeedback.type === 'denied' ? 'denied' : (feedback.fullnameFeedback.type === 'approved' ? 'approved' : '')}`,
            text: feedback.fullnameFeedback.text
        }
    }

    const handleLayoutClick = () => {
        setExpandedSection('')
    }

    const handleModalClick = (event) => {
        event.stopPropagation()
    }

    function handleBtn2() {
        setSignUp(!signUp)
        editNewUser({
            username: '',
            password: '',
            fullname: '',
            profileImg: ''
        })
        setFeedback({
            usernameFeedback: { type: '', text: '' },
            passwordFeedback: { type: '', text: '' },
            fullnameFeedback: { type: '', text: '' }
        })
    }

    const debouncedCheckUsername = useCallback(
        utilService.debounce(async (username) => {
            if (username.trim() === '') {
                setFeedback(prevFeedback => ({
                    ...prevFeedback,
                    usernameFeedback: {
                        type: '',
                        text: ''
                    }
                }))
                return
            }
            try {
                const exists = await userService.checkUsernameExists(username)
                setFeedback(prevFeedback => ({
                    ...prevFeedback,
                    usernameFeedback: {
                        type: exists ? 'denied' : 'approved',
                        text: exists ? '* username already exists' : '* username available'
                    }
                }))
            } catch (err) {
                console.error('Error checking username:', err)
                setFeedback(prevFeedback => ({
                    ...prevFeedback,
                    usernameFeedback: {
                        type: 'denied',
                        text: 'Error checking username'
                    }
                }))
            }
        }),
        []
    )

    function handleSignUp() {
        setFeedback(prevFeedback => {
            const newFeedback = { ...prevFeedback }
            switch (true) {
                case newUser.username.trim() === '':
                    newFeedback.usernameFeedback = {
                        type: 'denied',
                        text: '* username must be between 3 and 12 characters'
                    }
                    break
                case newUser.username.length < 3 || newUser.username.length > 12:
                    newFeedback.usernameFeedback = {
                        type: 'denied',
                        text: '* username must be between 3 and 12 characters'
                    }
                    break
                default:
                    newFeedback.usernameFeedback = {
                        type: '',
                        text: ''
                    }
                    break
            }
            switch (true) {
                case newUser.fullname.trim() === '':
                    newFeedback.fullnameFeedback = {
                        type: 'denied',
                        text: '* full name must be at least 1 character'
                    }
                    break
                default:
                    newFeedback.fullnameFeedback = {
                        type: '',
                        text: ''
                    }
                    break
            }
            switch (true) {
                case newUser.password.trim() === '':
                    newFeedback.passwordFeedback = {
                        type: 'denied',
                        text: '* password must be between 5 and 12 characters'
                    }
                    break
                case newUser.password.length < 5 || newUser.password.length > 12:
                    newFeedback.passwordFeedback = {
                        type: 'denied',
                        text: '* password must be between 5 and 12 characters'
                    }
                    break
                default:
                    newFeedback.passwordFeedback = {
                        type: '',
                        text: ''
                    }
                    break
            }
            return newFeedback
        })
        const isValid = [
            feedback.usernameFeedback.type,
            feedback.fullnameFeedback.type,
            feedback.passwordFeedback.type
        ].every(type => type === 'approved')
        if (isValid) {
            console.log('Signing up:', newUser)
        }
    }
    

    function handleLogin() {
        console.log('login!')
    }

    function handleChange(event) {
        const { name, value } = event.target
        editNewUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (name === 'username') {
            setFeedback(prevFeedback => ({
                ...prevFeedback,
                usernameFeedback: {
                    type: '',
                    text: ''
                }
            }))
            debouncedCheckUsername(value)
        }
    }
    console.log(feedback.usernameFeedback)

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
                            <input
                                className={`input-field ${feedbackConfig.username.className}`}
                                name="username"
                                placeholder="Enter username"
                                type="text"
                                value={newUser.username}
                                onChange={handleChange}
                                required
                            />
                            {signUp && <span className='feedback'>{feedbackConfig.username.text}</span>}
                            
                            <input
                                className={`input-field ${feedbackConfig.password.className}`}
                                name="password"
                                placeholder="Enter password"
                                type="password"
                                value={newUser.password}
                                onChange={handleChange}
                                required
                            />
                            <span className='feedback'>{feedbackConfig.password.text}</span>
                            {signUp && (
                                <>
                                    <input
                                        className={`input-field ${feedbackConfig.fullname.className}`}
                                        name="fullname"
                                        placeholder="Enter Full Name"
                                        type="text"
                                        value={newUser.fullname}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className='feedback'>{feedbackConfig.fullname.text}</span>
                                </>
                            )}
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
                            <div onClick={signUp ? handleSignUp : handleLogin}
                                className={`btn-1 ${btn1Config.class}`}>{btn1Config.text}
                            </div>
                            {!signUp && <div className={`btn-2 ${btn2Config.class}`}
                                onClick={handleBtn2}>
                                Don't have an Account?
                                <h1> Sign up!</h1></div>}
                            {signUp && <div className={`btn-2 ${btn2Config.class}`}
                                onClick={handleBtn2}>
                                Already have an Account?
                                <h1> Log in!</h1></div>}
                        </section>
                    </>
                )}
                {selectionModal && <UploadProfileImg openSelectionModal={openSelectionModal} setProfileImg={setProfileImg} />}
            </section>
        </section>
    )
}
