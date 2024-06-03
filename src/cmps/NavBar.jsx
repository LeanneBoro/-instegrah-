import { useState, useEffect } from 'react'

export function NavBar() {
    const [expandedSection, setExpandedSection] = useState('')



    return <section className={"nav-bar" + (expandedSection === "search" || expandedSection === "notification" ? " compact-nav-bar" : "")}>

        <div className="content">

            <div className='logo-container'>

                <div className="logo" >
                    <img src="src\assets\svgs\IntagramLogo.svg" alt="" />
                </div>

                <div className="small-logo">
                    <img src="src\assets\svgs\instagramsmallLogo.svg" alt="" />
                </div>

            </div>

            <section className="options">

                <div onClick={() => setExpandedSection(expandedSection === 'home' ? null : 'home')}>
                    <img className="icon" src="src\assets\svgs\Home.svg" alt="" />
                    <div className="title">Home</div>
                </div>

                <div onClick={() => setExpandedSection(expandedSection === 'search' ? null : 'search')}>
                    <img className="icon" src="src\assets\svgs\Search.svg" alt="" />
                    <div className="title">Search</div>
                </div>

                <div onClick={() => setExpandedSection('notifications')}>
                    <img className="icon" src="src\assets\svgs\Heart.svg" alt="" />
                    <div className="title">Notifications</div>
                </div>

                <div>
                    <img className="icon" src="src\assets\svgs\Create.svg" alt="" />
                    <div className="title">Create</div>
                </div>

                <div>
                    <img className="icon" src="src\assets\svgs\Profile.svg" alt="" />
                    <div className="title">Profile</div>
                </div>

                <div>
                    <img className="icon" src="src\assets\svgs\More.svg" alt="" />
                    <div className="title">More</div>
                </div>

            </section>


        </div>

    </section>
}