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




export function NavBar() {
    const [expandedSection, setExpandedSection] = useState('')
    const navBarRef = useRef(null)
    const navigate = useNavigate();
    const location = useLocation()
    const currentLocation = location.pathname
    const user = userService.getLoggedInUser()



    function handleOutsideClick(event) {
        if (navBarRef.current && !navBarRef.current.contains(event.target)) {
            setExpandedSection('');
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)

        // Clean up the event listener
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    function handleProfileNavigate() {
        user
            ? navigate('/profile/' + user._id)
            : setExpandedSection("login")
    }



    return <react-fragment ref={navBarRef}>

        <section className={"nav-bar" + (expandedSection === "search" || expandedSection === "notifications" ? " compact-nav-bar no-border" : "")}>

            <div className="content">

                <div className='logo-container'
                    onClick={() => {
                        navigate('/')
                        setExpandedSection(null)
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
                        setExpandedSection("login")
                    }}>

                        <img className="icon" src={user ? cloudinaryLinks.logout : cloudinaryLinks.login} alt="" />
                        <div className="title">{user ? 'Log out' : "Log in"} </div>
                    </div>




                    <div onClick={() => {
                        navigate('/')
                        setExpandedSection(null)
                    }}>
                    
                        <img className="icon" src={ currentLocation === "/" && expandedSection !== 'search' ?cloudinaryLinks.homeBold : cloudinaryLinks.home} alt="" />
                        <div className="title">Home</div>
                    </div>


                    <div className={`search expandedSection === 'search' ? 'open' : ''`}
                        onClick={() => setExpandedSection(expandedSection === 'search' ? null : 'search')}>
                        <img className="icon"
                            src={expandedSection === 'search' ? cloudinaryLinks.searchBold : cloudinaryLinks.search} />
                        <div className="title">Search</div>
                    </div>

                    <div className={`notifications expandedSection === 'notifications' ? 'open' : ''`}
                        onClick={() => setExpandedSection(expandedSection === 'notifications' ? null : 'notifications')}>
                        <img className="icon"
                            src={expandedSection === 'notifications' ? cloudinaryLinks.heartBold : cloudinaryLinks.heart} />
                        <div className="title">Notifications</div>
                    </div>

                    <div onClick={() => setExpandedSection(expandedSection === 'upload' ? null : 'upload')} >
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

        <SearchModal expandedSection={expandedSection} />
        <NotificationsModal expandedSection={expandedSection} setExpandedSection={setExpandedSection} />

        {expandedSection === "upload" &&
            <BackDrop zIndex={1100} dataState={setExpandedSection}>
                <PostEdit dataState={setExpandedSection} />
            </BackDrop>
        }

        {expandedSection === "login" &&
            <BackDrop dataState={setExpandedSection}>
                <LoginSignUp setExpandedSection={setExpandedSection} />
            </BackDrop>}

    </react-fragment>
}