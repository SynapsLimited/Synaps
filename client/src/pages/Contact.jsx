import React, { useEffect } from 'react';
import './../css/contact.css'; 
import { Helmet } from 'react-helmet';
import ContactForm from '../components/ContactForm';

const Contact = () => {
    useEffect(() => {
        // Dynamically load the Spline Viewer script
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.7.2/build/spline-viewer.js';
        document.body.appendChild(script);

        // Clean up the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <Helmet>
                <title>Synaps - Contact</title>
            </Helmet>
            <header>
                <div className="container header__container">
                    <div className="header__left header-about">
                        <h1>Contact</h1>
                        <p>Ready to start working with us? Scroll down!</p>
                        <a href="contact" className="btn btn-secondary">Contact</a>
                    </div>
                    <div className="header__right" id="spline-container">
                        <spline-viewer url="https://prod.spline.design/1VQSYrmiNFt3i0cz/scene.splinecode"></spline-viewer>
                    </div>
                </div>
            </header>

            <div className="contact-overview-title">
                <h1>Contact Details</h1>
            </div>

            <section className="container contact-section">
                <div className="blob location-blob">
                    <h2>Location</h2>
                    <img className="location-img"src="/assets/Icons For Synaps/Main Icons/Europe Map.png" alt="Location" />
                    <h5>AND BEYOND!</h5>
                </div>
                <div className="blob phone-mail-blob">
                    <h2>Contact</h2>
                    <img src="/assets/Icons For Synaps/Main Icons/phone-call.png" alt="Phone" />
                    <a href="tel:+3210202020"><h4>+3210202020</h4></a>
                    <img src="/assets/Icons For Synaps/Main Icons/email.png" alt="Email" />
                    <a href="mailto:info@synaps.eu"><h4>info@synaps.eu</h4></a>
                </div>
                <div className="blob socials-blob">
                    <h2>Socials</h2>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/facebook.png" alt="Facebook" /></a>
                        <a href="https://www.instagram.com" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/instagram.png" alt="Instagram" /></a>
                        <a href="https://www.linkedin.com" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/linkedin.png" alt="LinkedIn" /></a>
                        <a href="https://www.youtube.com" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/youtube.png" alt="YouTube" /></a>
                    </div>
                </div>
            </section>

            <div className="contact-overview-title">
                <h1>Consult Now!</h1>
                <p>If you are ready then give it a try! The consult is free and so is conversating with us for a better future and greater success. Submit this form and we will be back at you as soon as possible! </p>
            </div>

            <ContactForm />


        </div>
    );
};

export default Contact;
