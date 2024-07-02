import { SearchInput } from "./SearchInput";

export function HeaderNav() {
    return <section className="header-nav">

        <img className="logo" src="src\assets\svgs\IntagramLogo.svg" alt="" />

        <div>

            <SearchInput />



            <div>
                <img className="notifications" src="src\assets\svgs\heart.svg" alt="" />
            </div>

        </div>




    </section>
}