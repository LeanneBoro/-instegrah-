import React, { useState, useRef, useEffect } from 'react';
import { SearchModal } from './SearchModal'

import { SearchInput } from './SearchInput';
import { useNavigate, useLocation } from 'react-router-dom';
import { NotificationsModal } from './NotificationsModal';
import { PostEdit } from '../views/PostEdit';
import { BackDrop } from './BackDrop';
import { LoginSignUp } from './LoginSignup';
import { userService } from '../services/user.service';
import { cloudinaryLinks } from '../services/cloudinary.service';
import { logout } from '../store/actions/user.actions';
import { useSelector } from 'react-redux';
import { setNavBarSection } from '../store/actions/utility.actions';




export function NavBar() {
    // const [navBarSection, setNavBarSection] = useState('')
    const navBarSection = useSelector(storeState => storeState.utilityModule.navBarSection);
    console.log("🚀 ~ NavBar ~ navBarSection:", navBarSection)
    console.log("🚀 ~ NavBar ~ navBarSection:", navBarSection)
    const navBarRef = useRef(null)
    const navigate = useNavigate();
    const location = useLocation()
    const currentLocation = location.pathname
    const user = userService.getLoggedInUser()




    function handleOutsideClick(event) {
        if (navBarRef.current && !navBarRef.current.contains(event.target)) {
            setNavBarSection('');
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)

        // Clean up the event listener
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    useEffect(() => {
        if (navBarSection === 'login' || navBarSection ===  'upload') {
            document.body.classList.add('body-no-scroll')
        } else {
            document.body.classList.remove('body-no-scroll')
        }

        return () => {
            document.body.classList.remove('body-no-scroll')
        }
    }, [navBarSection])

    function handleProfileNavigate() {
        user
            ? navigate('/profile/' + user._id)
            : setNavBarSection("login")
    }



    return <react-fragment ref={navBarRef}>

        <section className={"nav-bar" + (navBarSection === "search" || navBarSection === "notifications" ? " compact-nav-bar no-border" : "")}>

            <div className="content">

                <div className='logo-container'
                    onClick={() => {
                        navigate('/')
                        setNavBarSection(null)
                    }}>

                    <div className="logo" >
                        <img src={cloudinaryLinks.logo} alt="" />
                    </div>

                    <div className="small-logo">
                        <img src={cloudinaryLinks.smallLogo} alt="" />
                    </div>

                </div>

                <section className="options">


                    {/* <div onClick={() => } className='login-btn'>Log In</div> */}



                    <div title='Log-in' className="login-btn" onClick={() => {
                        if (user) {
                            logout()
                        } else {
                            setNavBarSection("login")
                        }
                    }}>

                        <img className="icon" src={user ? cloudinaryLinks.logout : cloudinaryLinks.login} alt="" />
                        <div className="title">{user ? 'Log out' : "Log in"} </div>
                    </div>




                    <div onClick={() => {
                        navigate('/')
                        setNavBarSection(null)
                    }}>

                        <img className="icon" src={currentLocation === "/" && navBarSection !== 'search' ? cloudinaryLinks.homeBold : cloudinaryLinks.home} alt="" />
                        <div className="title">Home</div>
                    </div>


                    <div className={`search navBarSection === 'search' ? 'open' : ''`}
                        onClick={() => setNavBarSection(navBarSection === 'search' ? null : 'search')}>
                        <img className="icon"
                            src={navBarSection === 'search' ? cloudinaryLinks.searchBold : cloudinaryLinks.search} />
                        <div className="title">Search</div>
                    </div>

                    <div className={`notifications navBarSection === 'notifications' ? 'open' : ''`}
                        onClick={() => setNavBarSection(navBarSection === 'notifications' ? null : 'notifications')}>
                        <img className="icon"
                            src={navBarSection === 'notifications' ? cloudinaryLinks.heartBold : cloudinaryLinks.heart} />
                        <div className="title">Notifications</div>
                    </div>

                    <div onClick={() => setNavBarSection(navBarSection === 'upload' ? null : 'upload')} >
                        <img className="icon" src={cloudinaryLinks.create} alt="" />
                        <div className="title">Create</div>
                    </div>



                    <div onClick={handleProfileNavigate} >
                        <img className="icon " src={user ? user.profileImg : cloudinaryLinks.profile} alt="" />
                        <div className="title">Profile</div>
                    </div>



                    <div>
                        <img className="icon" src={cloudinaryLinks.more} alt="" />
                        <div className="title">More</div>
                    </div>

                </section>




            </div>



        </section>

        <SearchModal navBarSection={navBarSection} />
        <NotificationsModal navBarSection={navBarSection} setNavBarSection={setNavBarSection} />

        {navBarSection === "upload" &&
            <BackDrop zIndex={1100} dataState={setNavBarSection}>
                <PostEdit dataState={setNavBarSection} />
            </BackDrop>
        }

        {navBarSection === "login" &&
            <BackDrop dataState={setNavBarSection}>
                <LoginSignUp setNavBarSection={setNavBarSection} />
            </BackDrop>}

    </react-fragment>
}