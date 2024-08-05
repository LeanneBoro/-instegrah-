import { useEffect, useState, useRef } from 'react';

export function BackDrop({ children, disableAt = 0, zIndex, dataState }) {

    const [isBackdropDisabled, setIsBackdropDisabled] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (disableAt !== 0 && window.innerWidth <= disableAt) {
                setIsBackdropDisabled(true);
            } else {
                setIsBackdropDisabled(false);
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    function handleBackdropClick(event) {
 

        if (event.target === event.currentTarget && !isBackdropDisabled) {
            dataState(null)
        }
    }

    return <section onClick={handleBackdropClick} className="backdrop" style={{ zIndex }}>
        {children}
    </section>
}