import Croppie from 'croppie'
import 'croppie/croppie.css'
import { useState, useRef, useEffect } from 'react'
import { FileUploader } from './FileUploader'

export function UploadProfileImg({openSelectionModal,SetProfileImg}) {
    const croppieRef = useRef(null)
    const croppieInstance = useRef(null)
    const [imageUploaded, setImageUploaded] = useState(false)


    useEffect(() => {
        if (croppieRef.current) {
            croppieInstance.current = new Croppie(croppieRef.current, {
                // showZoomer: true,
                enableOrientation: true,
                mouseWheelZoom: true,
                viewport: {
                    width: 300,
                    height: 300,
                    type: 'circle',
                },
                boundary: {
                    width: "100%",
                    height: "80%",
                },
            })
        }

        return () => {
            if (croppieInstance.current) {
                croppieInstance.current.destroy()
            }
        }
    }, [])

    const handleImageUpload = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            if (croppieInstance.current) {
                croppieInstance.current.bind({
                    url: e.target.result,
                }).then(() => {
                    setImageUploaded(true)
                }).catch(error => {
                    console.error('Croppie bind error:', error)
                })
            }
        }
        reader.readAsDataURL(file)
    }

    const handleCrop = async () => {
        if (croppieInstance.current) {
            try {
                const result = await croppieInstance.current.result({
                    type: 'base64',
                    size: 'viewport',
                })
                SetProfileImg(result)
                openSelectionModal(false)
            } catch (error) {
                console.error('Croppie result error:', error)
            }
        }
    }

    return (
        <section className="upload-profile-img">
            <section className="croppie-cmp">
                <section className='header'>
                    <h2 onClick={handleCrop} className='select'>Set as Profile</h2>
                </section>

                <section className="options">
                    <FileUploader existingImage={imageUploaded} handleFile={handleImageUpload} />
                </section>
                <div ref={croppieRef} id="croppie"></div>

            </section>
        </section>
    )
}
