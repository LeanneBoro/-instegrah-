import React, { useState, useRef, useEffect } from 'react';
import { SearchModal } from './SearchModal'

import { SearchInput } from './SearchInput';
import { useNavigate, useLocation } from 'react-router-dom';
import { NotificationsModal } from './NotificationsModal';
import { PostEdit } from '../views/PostEdit';
import { BackDrop } from './BackDrop';



export function NavBar() {
    const [expandedSection, setExpandedSection] = useState('')
    const navBarRef = useRef(null)
    const navigate = useNavigate();
    const location = useLocation()
    const currentLocation = location.pathname


    console.log(expandedSection);

    function handleOutsideClick(event) {
        if (navBarRef.current && !navBarRef.current.contains(event.target)) {
            setExpandedSection('');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)

        // Clean up the event listener
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])



    return <react-fragment ref={navBarRef}>

        <section className={"nav-bar" + (expandedSection === "search" || expandedSection === "notifications" ? " compact-nav-bar no-border" : "")}>

            <div className="content">

                <div className='logo-container'
                    onClick={() => {
                        navigate('/')
                        setExpandedSection(null)
                    }}>

                    <div className="logo" >
                        <img src="src\assets\svgs\IntagramLogo.svg" alt="" />
                    </div>

                    <div className="small-logo">
                        <img src="src\assets\svgs\instagramsmallLogo.svg" alt="" />
                    </div>

                </div>

                <section className="options">

                    <div onClick={() => {
                        navigate('/')
                        setExpandedSection(null)
                    }}>
                        <img className="icon" src={`src/assets/svgs/Home${currentLocation === "/" && expandedSection !== 'search' ? "Bold" : ""}.svg`} alt="" />
                        <div className="title">Home</div>
                    </div>


                    <div className={`search expandedSection === 'search' ? 'open' : ''`}
                        onClick={() => setExpandedSection(expandedSection === 'search' ? null : 'search')}>
                        <img className="icon"
                            src={`src/assets/svgs/Search${expandedSection === 'search' ? 'Bold' : ''}.svg`} />
                        <div className="title">Search</div>
                    </div>

                    <div className={`notifications expandedSection === 'notifications' ? 'open' : ''`}
                        onClick={() => setExpandedSection(expandedSection === 'notifications' ? null : 'notifications')}>
                        <img className="icon"
                            src={`src/assets/svgs/Heart${expandedSection === 'notifications' ? 'Bold' : ''}.svg`} />
                        <div className="title">Notifications</div>
                    </div>

                    <div onClick={() => setExpandedSection(expandedSection === 'upload' ? null : 'upload')} >
                        <img className="icon" src="src\assets\svgs\Create.svg" alt="" />
                        <div className="title">Create</div>
                    </div>

                    <div onClick={() => navigate('/profile')} >
                        <img className="icon " src="src\assets\svgs\Profile.svg" alt="" />
                        <div className="title">Profile</div>
                    </div>

                    <div>
                        <img className="icon" src="src\assets\svgs\More.svg" alt="" />
                        <div className="title">More</div>
                    </div>

                </section>




            </div>



        </section>

        <SearchModal expandedSection={expandedSection} />
        <NotificationsModal expandedSection={expandedSection} setExpandedSection={setExpandedSection} />

        {expandedSection === "upload" &&
            <BackDrop zIndex={1100} dataState={setExpandedSection}>
                <PostEdit />
            </BackDrop>
        }

    </react-fragment>
}