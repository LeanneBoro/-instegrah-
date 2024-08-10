import { useRef,useState } from 'react';

export function LoginSignUp({ setExpandedSection }) {
    const modalRef = useRef(null)
    const [signUp,ShowSignUp] = useState()


    const handleLayoutClick = () => {
        setExpandedSection('')
    }

    console.log(signUp);
    

    const handleModalClick = (event) => {
        event.stopPropagation()
    };

    return (
        <section
            onClick={handleLayoutClick}
            className="login-signup-layout"
        >
            <section
                ref={modalRef}
                className="login-signup"
                onClick={handleModalClick}
            >
                <div className="logo"></div>
                <img src="src/assets/svgs/IntagramLogo.svg" alt="Instagram Logo" />

                <section className="login-input-container">
                    <input placeholder="Enter username" type="text" />
                    <input placeholder="Enter password" type="text" />
                    {signUp && <input placeholder='Enter Full Name' type="text" name="" id="" />}
                </section>

                <section className="login-btn-container">
                    <div>Login</div>
                    <div onClick={() => ShowSignUp(!signUp)} >Sign-Up</div>
                </section>
            </section>
        </section>
    );
}
