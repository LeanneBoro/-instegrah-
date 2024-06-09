export function HeaderNav() {
    return <section className="header-nav">

        <img className="logo" src="src\assets\svgs\IntagramLogo.svg" alt="" />

        <div>

            <div className="imput-container">
                <img className="search-icon" src="src\assets\svgs\Search.svg" alt="" />

                <input type="text" placeholder="Search" />
                <div className="clear-search">X</div>
            </div>



            <div>
                <img className="notifications" src="src\assets\svgs\heart.svg" alt="" />
            </div>

        </div>




    </section>
}