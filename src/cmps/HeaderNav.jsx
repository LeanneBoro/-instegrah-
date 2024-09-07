import { cloudinaryLinks } from "../services/cloudinary.service";
import { SearchInput } from "./SearchInput";

export function HeaderNav() {
    return <section className="header-nav">

        <img className="logo" src={cloudinaryLinks.logo} alt="" />

        <div>

            <SearchInput />



            <div>
                <img className="notifications" src={cloudinaryLinks.heart} alt="" />
            </div>

        </div>




    </section>
}