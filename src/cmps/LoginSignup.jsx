import { useCallback, useRef, useState } from 'react'
import { ProfileImg } from './ProfileImg'
import { UploadProfileImg } from './UploadProfileImg'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'
import { cloudinaryLinks } from '../services/cloudinary.service'
import { login, signUp } from '../store/actions/user.actions'

export function LoginSignUp({ setNavBarSection }) {
    const modalRef = useRef(null)
    const debounceRef = useRef(null)

    const [signUpState, setSignUpState] = useState(false)
    const [selectionModal, openSelectionModal] = useState(false)
    const [profileImg, setProfileImg] = useState(null)
    const [isGuest, setIsGuest] = useState(false)

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
        type: '',
        text: ''
    })

    const buttonText = profileImg ? "Change Image" : "Upload Profile Image"

    const buttonConfig = {
        btn1: {
            class: 'pink-btn',
            text: signUpState ? 'Complete Sign Up' : 'Sign Up'
        },
        btn2: {
            class: 'cyan-btn',
            text: signUpState ? 'Already Signed up' : 'Log In'
        }
    }

    const btn1Config = signUpState ? buttonConfig.btn1 : buttonConfig.btn2
    const btn2Config = signUpState ? buttonConfig.btn2 : buttonConfig.btn1

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
        className: `${loginFeedback.type === 'denied' ? 'denied' : ''}`,
        text: loginFeedback.text
    }

    const handleLayoutClick = () => {
        setNavBarSection('')
    }

    const handleModalClick = (event) => {
        event.stopPropagation()
    }

    function handleBtn2() {
        setSignUpState(!signUpState)
        editNewUser({
            username: '',
            password: '',
            fullname: '',
            profileImg: null
        })
        setSignUpFeedback({
            usernameFeedback: { type: '', text: '' },
            passwordFeedback: { type: '', text: '' },
            fullnameFeedback: { type: '', text: '' }
        })
        setLoginFeedback({
            type: '',
            text: ''
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
        }),
        []
    )

    async function onSignUp() {
        try {
            const result = await utilService.validateUserData(newUser, signUpFeedback)
            console.log("🚀 ~ onSignUp ~ result:", result)
            setSignUpFeedback(result.feedback)

            if (result.isValid) {
                signUp(newUser)
                setNavBarSection(null)
            }
        } catch (err) {
            setSignUpFeedback(result.feedback)
            console.error('Error signing up:', err)
        }
    }

    async function onLogin() {
        try {
            isGuest ? await login(userService.getGuestUser()) : await login(newUser)

            setNavBarSection(null)
        } catch (err) {
            console.error('Login failed:', err.message)
            setLoginFeedback({
                type: 'denied',
                text: 'Invalid username or password'
            })
        }
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
                    {/* <img className="back-btn" src={cloudinaryLinks.closeArrow} alt="" /> */}
                        <div className="logo"></div>
                        <img src={cloudinaryLinks.logo} alt="Instagram Logo" />
                        <section className="login-input-container">
                            <input
                                className={`login-input ${signUpState ? feedbackConfig.username.className : loginFeedbackConfig.className}`}
                                name="username"
                                placeholder="Enter username"
                                type="text"
                                value={newUser.username}
                                onChange={handleChange}
                                required
                            />

                            <span className='feedback'>
                                {signUpState ? feedbackConfig.username.text : loginFeedbackConfig.text}
                            </span>

                            <input
                                className={` login-input ${signUpState ? feedbackConfig.password.className : loginFeedbackConfig.className}`}
                                name="password"
                                placeholder="Enter password"
                                type="password"
                                value={newUser.password}
                                onChange={handleChange}
                                required
                            />
                            <span className='feedback'>
                                {signUpState ? feedbackConfig.password.text : loginFeedbackConfig.text}
                            </span>
                            {signUpState && (
                                <>
                                    <input
                                        className={`login-input ${feedbackConfig.fullname.className}`}
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

                            {signUpState && (
                                <section className='upload-profile'>
                                    <div className='image-container'>
                                        <ProfileImg imgUrl={profileImg ? profileImg : cloudinaryLinks.profile} diameter={"100px"} />
                                    </div>
                                    <div onClick={() => openSelectionModal(true)} className='text'>
                                        {buttonText}
                                    </div>
                                </section>
                            )}
                        </section>
                        <section className="login-btn-container">
                            {!signUpState && (
                                <section className='guest'>
                                    <h2>Log in as guest</h2>
                                    <input type="checkbox"
                                        onChange={() => setIsGuest(state => !state)}
                                    />
                                </section>
                            )}

                            <div onClick={signUpState ? onSignUp : onLogin}
                                className={`btn-1 ${btn1Config.class}`}>{btn1Config.text}
                            </div>
                            {!signUpState && (
                                <div className={`btn-2 ${btn2Config.class}`}
                                    onClick={handleBtn2}>
                                    Don't have an Account?
                                    <h1> Sign up!</h1>
                                </div>
                            )}
                            {signUpState && (
                                <div className={`btn-2 ${btn2Config.class}`}
                                    onClick={handleBtn2}>
                                    Already have an Account?
                                    <h1> Log in!</h1>
                                </div>
                            )}
                        </section>
                    </>
                )}
                {selectionModal && (
                    <UploadProfileImg
                        onSetProfileImg={onSetProfileImg}
                        openSelectionModal={openSelectionModal}
                        onClose={() => openSelectionModal(false)}
                    />
                )}
            </section>
        </section>
    )
}
