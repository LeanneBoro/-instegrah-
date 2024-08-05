import { BackDrop } from "../cmps/BackDrop";
import React, { useState, useRef, useEffect } from "react";
import Croppie from "croppie";
import "croppie/croppie.css";
import { FileUploader } from "../cmps/FileUploader";
import { ProfileImg } from "../cmps/ProfileImg";

export function PostEdit() {
    const croppieRef = useRef(null);
    const croppieInstance = useRef(null);
    const [imageUploaded, setImageUploaded] = useState(false)
    const [imageCropped, setImageCropped] = useState(null)

    console.log(imageCropped);


    useEffect(() => {
        if (croppieRef.current) {
            croppieInstance.current = new Croppie(croppieRef.current, {
                showZoomer: true,
                enableOrientation: true,
                mouseWheelZoom: true,
                viewport: {
                    width: 300,
                    height: 300,
                    type: "square",
                },
                boundary: {
                    width: "100%",
                    height: "80%",
                },
            });
        }

        return () => {
            if (croppieInstance.current) {
                croppieInstance.current.destroy();
            }
        };
    }, []);

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            croppieInstance.current.bind({
                url: e.target.result,
            }).then(() => {
                setImageUploaded(true)
            })
        };
        reader.readAsDataURL(file);
    };

    const handleCrop = async () => {
        if (croppieInstance.current) {
            const result = await croppieInstance.current.result({
                type: "base64",
                size: "viewport",
            });
            setImageCropped(result)
        }
    }

    return <section className={`post-edit ${imageCropped ? "expanded" : ""}`}>

        <section className="header">

            <img className="back-btn" src="src/assets/svgs/Close-Arrow.svg" alt="" />
            <h2>Create a new Post</h2>

            <h2 title={`${imageUploaded ? "Crop Image" : "Please Choose an Image from the Device"}`}
                className={`next-btn ${imageUploaded ? "" : "disabled"}`}
                onClick={() => imageUploaded && handleCrop()}>Next</h2>

        </section>



        {imageCropped ? (
            <React.Fragment>
                <section className="add-details">

                    <section className="image-container">
                        <img src={imageCropped} alt="" />
                    </section>

                    <section className="details">

                        <div className="username">
                            <ProfileImg
                                diameter={"40px"}
                                imgUrl={"https://randomuser.me/api/portraits/women/96.jpg"} />

                            <h2>username</h2>
                        </div>

                       <textarea placeholder="Write a caption" name="" id=""></textarea>

                    </section>
                </section>
            </React.Fragment>
        ) : (
            <section className="croppie-cmp">
                <section className="options">
                    <FileUploader existingImage={imageUploaded} handleFile={handleImageUpload} />
                </section>

                <div ref={croppieRef} id="croppie"></div>
            </section>
        )}


    </section>
}