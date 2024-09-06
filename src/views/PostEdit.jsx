import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { BackDrop } from "../cmps/BackDrop";

import Croppie from "croppie";
import "croppie/croppie.css";

import { FileUploader } from "../cmps/FileUploader";
import { ProfileImg } from "../cmps/ProfileImg";
import { postService } from "../services/post.local.service";
import { savePost } from '../store/actions/post.actions'
import { utilService } from "../services/util.service";
import { cloudinaryLinks } from "../services/cloudinary.service";

export function PostEdit({ dataState }) {
    const croppieRef = useRef(null);
    const croppieInstance = useRef(null);
    const [imageUploaded, setImageUploaded] = useState(false)
    const [imageCropped, setImageCropped] = useState(null)
    const [caption, setCaption] = useState("")
    const navigate = useNavigate();

    function handleCaptionChange(event) {
        setCaption(event.target.value)
    }

    async function handlePublish() {

        const postFormData = new FormData()
        const imageBlob = utilService.base64ToBlob(imageCropped)
        
        postFormData.append('title', caption)
        postFormData.append('postImg', imageBlob, 'postImg.png')


        try {
            savePost(postFormData)
            dataState(null)
            navigate('/')

        } catch (err) {
            console.error('Failed to publish post:', err);
        }
    }

    const nextButtonTitle = imageCropped
        ? "Publish"
        : imageUploaded
            ? "Crop Image"
            : "Please Choose an Image from the Device"

    const nextButtonClass = imageCropped
        ? caption ? "next-btn" : "next-btn disabled"
        : imageUploaded
            ? "next-btn"
            : "next-btn disabled"

    const nextButtonOnClick = () => {
        if (imageCropped) {
            if (caption) {
                handlePublish()
            }
        } else if (imageUploaded) {
            handleCrop()
        }
    }


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



    return (
        <section className={`post-edit ${imageCropped ? "expanded" : ""}`}>
            <section className="header">
                <img className="back-btn" src={cloudinaryLinks.closeArrow} alt="" />
                <h2>Create a new Post</h2>
                <h2
                    title={nextButtonTitle}
                    className={nextButtonClass}
                    onClick={nextButtonOnClick}
                >
                    {imageCropped ? "Publish" : "Next"}
                </h2>
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
                                    imgUrl={"https://randomuser.me/api/portraits/women/96.jpg"}
                                />
                                <h2>username</h2>
                            </div>
                            <textarea
                                placeholder="Write a caption"
                                name=""
                                id=""
                                value={caption}
                                onChange={handleCaptionChange}
                            />
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
    )
}