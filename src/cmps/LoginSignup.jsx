import { useCallback, useRef, useState } from 'react'
import { ProfileImg } from './ProfileImg'
import { UploadProfileImg } from './UploadProfileImg'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'
import { allPosts } from '../../everything-demodata/demoData'


// console.log(allPosts);


export function LoginSignUp({ setExpandedSection }) {



    const modalRef = useRef(null)
    const debounceRef = useRef(null)


    const [signUp, setSignUp] = useState(false)
    const [selectionModal, openSelectionModal] = useState(false)
    const [profileImg, setProfileImg] = useState('src/assets/svgs/Profile.svg')

    const [newUser, editNewUser] = useState({
        username: '',
        password: '',
        fullname: '',
        profileImg: '',
    })

    const [signUpFeedback, setSignUpFeedback] = useState({
        usernameFeedback: { type: '', text: '' },
        passwordFeedback: { type: '', text: '' },
        fullnameFeedback: { type: '', text: '' }
    })

    const [loginFeedback, setLoginFeedback] = useState({
        usernameFeedback: { type: '', text: '' },
        passwordFeedback: { type: '', text: '' }
    })

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
            className: `${signUpFeedback.usernameFeedback.type === 'denied' ? 'denied' : (signUpFeedback.usernameFeedback.type === 'approved' ? 'approved' : '')}`,
            text: signUpFeedback.usernameFeedback.text
        },
        password: {
            className: `${signUpFeedback.passwordFeedback.type === 'denied' ? 'denied' : (signUpFeedback.passwordFeedback.type === 'approved' ? 'approved' : '')}`,
            text: signUpFeedback.passwordFeedback.text
        },
        fullname: {
            className: `${signUpFeedback.fullnameFeedback.type === 'denied' ? 'denied' : (signUpFeedback.fullnameFeedback.type === 'approved' ? 'approved' : '')}`,
            text: signUpFeedback.fullnameFeedback.text
        }
    }

    const loginFeedbackConfig = {
        username: {
            className: `${loginFeedback.usernameFeedback.type === 'denied' ? 'denied' : ''}`,
            text: loginFeedback.usernameFeedback.text
        },
        password: {
            className: `${loginFeedback.passwordFeedback.type === 'denied' ? 'denied' : ''}`,
            text: loginFeedback.passwordFeedback.text
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
            profileImg: 'src/assets/svgs/Profile.svg'
        })
        setSignUpFeedback({
            usernameFeedback: { type: '', text: '' },
            passwordFeedback: { type: '', text: '' },
            fullnameFeedback: { type: '', text: '' }
        })
        setLoginFeedback({
            usernameFeedback: { type: '', text: '' },
            passwordFeedback: { type: '', text: '' }
        })
    }


    const debouncedCheckUsername = useCallback(
        utilService.debounce(async (username) => {
            if (username.trim() === '') {
                setSignUpFeedback(prevFeedback => ({
                    ...prevFeedback,
                    usernameFeedback: {
                        type: '',
                        text: ''
                    }
                }))
                return
            } else if (username.trim().length < 3 || username.trim().length > 25) {
                setSignUpFeedback(prevFeedback => ({
                    ...prevFeedback,
                    usernameFeedback: {
                        type: 'denied',
                        text: '* username must be between 3 and 25 characters'
                    }
                }))
                return
            }

            try {

                const exists = await userService.checkUsernameExists(username)
                setSignUpFeedback(prevFeedback => ({
                    ...prevFeedback,
                    usernameFeedback: {
                        type: exists ? 'denied' : 'approved',
                        text: exists ? '* username already exists' : '* username available'
                    }
                }))
            } catch (err) {
                console.error('Error checking username:', err)
                setSignUpFeedback(prevFeedback => ({
                    ...prevFeedback,
                    usernameFeedback: {
                        type: 'denied',
                        text: 'Error checking username'
                    }
                }))
            }
        },),
        []
    )

    function onSignUp() {

        userService.handleSignUp(newUser, signUpFeedback).then(result => {
            setSignUpFeedback(result.feedback)
        })
    }

    function handleLogin() {
        userService.handleLogin(newUser).then(result => {
            if (result.success) {

                // Optionally redirect or do something on successful login
            } else {
                setLoginFeedback(result.feedback)
            }
        })
    }

    function onSetProfileImg(result) {
        setProfileImg(result)

        editNewUser(newUser => ({
            ...newUser,
            profileImg: result
        }))
    

    }

    function handleChange(event) {
        const { name, value } = event.target
        editNewUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (name === 'username') {
            setSignUpFeedback(prevFeedback => ({
                ...prevFeedback,
                usernameFeedback: {
                    type: '',
                    text: ''
                }
            }))
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
            debounceRef.current = setTimeout(() => debouncedCheckUsername(value), 300)
        }
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
                            <input
                                className={`${signUp ? feedbackConfig.username.className : loginFeedbackConfig.username.className}`}
                                name="username"
                                placeholder="Enter username"
                                type="text"
                                value={newUser.username}
                                onChange={handleChange}
                                required
                            />

                            <span className='feedback'>
                                {signUp ? feedbackConfig.username.text : loginFeedbackConfig.username.text}
                            </span>

                            <input
                                className={`${signUp ? feedbackConfig.password.className : loginFeedbackConfig.password.className}`}
                                name="password"
                                placeholder="Enter password"
                                type="password"
                                value={newUser.password}
                                onChange={handleChange}
                                required
                            />
                            <span className='feedback'>
                                {signUp ? feedbackConfig.password.text : loginFeedbackConfig.password.text}
                            </span>

                            {signUp && (
                                <>
                                    <input
                                        className={`${feedbackConfig.fullname.className}`}
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
                                        <ProfileImg imgUrl={profileImg} diameter={"100px"} />
                                    </div>
                                    <div onClick={() => openSelectionModal(true)} className='text'>
                                        {buttonText}
                                    </div>
                                </section>
                            )}
                        </section>
                        <section className="login-btn-container">
                            <div onClick={signUp ? onSignUp : handleLogin}
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
                {selectionModal && <UploadProfileImg openSelectionModal={openSelectionModal} onSetProfileImg={onSetProfileImg} />}
            </section>
        </section>
    )
}