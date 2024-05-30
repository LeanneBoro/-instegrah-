export function SideHeader() {
    return <section className="side-header">

        <div className="content">

            <div className="logo">
                <img src="src\imgs\InstagramLogo.PNG" alt="" />
            </div>


            <section className="options">

                <div>
                    <img className="icon" src="src\assets\svgs\Home.svg" alt="" />
                    <div className="title">Home</div>
                </div>

                <div>
                    <img className="icon" src="src\assets\svgs\Search.svg" alt="" />
                    <div className="title">Search</div>
                </div>

                <div>
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
                    <div>More</div>
                </div>

            </section>


        </div>

    </section>
}