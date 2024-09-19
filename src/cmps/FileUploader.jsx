import { useRef } from 'react';
import Image from '../models/image';

export function FileUploader({ handleFile, existingImage }) {
    const hiddenFileInput = useRef(null)

    const handleClick = () => {
        hiddenFileInput.current.click()
    }

    const handleChange = (event) => {
        const fileUploaded = event.target.files[0]
        if (fileUploaded) {
            const imageInstance = new Image(fileUploaded)
            const validationErrors = imageInstance.validate()
            if (Object.keys(validationErrors).length > 0) {

                console.log(validationErrors.file)
                return
            }

            handleFile(fileUploaded)
        }
    }
    return (
        <>
            <button className="button-upload" onClick={handleClick}>
                <h2>{existingImage ? "Select a different image" : "Select from this Device"}</h2>
            </button>
            <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleChange}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
            />
        </>
    )
}
