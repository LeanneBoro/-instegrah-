import { useRef } from 'react';

export function FileUploader({ handleFile, existingImage }) {
    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    const handleChange = (event) => {
        const fileUploaded = event.target.files[0]
        if (fileUploaded) {
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
                onChange={handleChange}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
            />
        </>
    )
}
