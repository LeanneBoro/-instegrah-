import React, { useState, useRef, useEffect } from "react";
import Croppie from "croppie";
import "croppie/croppie.css";
import { FileUploader } from "./FileUploader";

export function CroppieComponent() {
    const croppieRef = useRef(null);
    const croppieInstance = useRef(null);
    const [imageUploaded,setImageUploaded] = useState(false)
    const [imageCropped,setImageCropped] = useState()

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
            }).then( () => {
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

        }
    }

    return (

    );
}
