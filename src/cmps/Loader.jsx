import { cloudinaryLinks } from "../services/cloudinary.service";

export function Loader() {

    return  <img className="loader" src={cloudinaryLinks.loadingGif} alt="" />
   
}