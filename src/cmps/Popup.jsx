import { useState, useEffect } from 'react'
import { eventBusService } from '../services/event-bus.service'
import { ProfileImg } from './ProfileImg'

export function Popup() {
    const [popupContent, setPopupContent] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (content) => {
            setPopupContent(content)
            setIsOpen(true)
            setTimeout(() => {
                setIsOpen(false)
                setPopupContent(null)
            }, 3600)
        })

        return () => unsubscribe()
    }, [])


    return (
        <section className={`popup ${isOpen ? 'open' : ''}`}>
            <section className='content'>
                <h1>{popupContent?.txt}</h1>
                {popupContent?.payload && <ProfileImg imgUrl={popupContent.payload} diameter={'50px'} />}
            </section>

            <section className='bar-container'>
                <div className={`bar ${isOpen ? 'filling' : ''}`}></div>
            </section>
        </section>
    )
}
