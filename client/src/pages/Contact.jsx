import React, { useEffect } from 'react';
import './../css/contact.css'; 
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ContactForm from '../components/ContactForm';

const Contact = () => {
    const { t } = useTranslation();

    useEffect(() => {
        // Dynamically load the Spline Viewer script
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.27/build/spline-viewer.js';
        document.body.appendChild(script);

        // Clean up the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <Helmet>
                <title>{t('contactPage.title')} - Synaps</title>
            </Helmet>
            <header>
                <div  className="container header__container">
                    <div  className="header__left header-about">
                        <h1>{t('contactPage.header.heading')}</h1>
                        <p>{t('contactPage.header.description')}</p>
                        <a href="contact" className="btn btn-secondary">{t('contactPage.header.contactButton')}</a>
                    </div>
                    <div  className="header__right" id="spline-container">
                        <spline-viewer url="https://prod.spline.design/Aieg3XjNVXVy2DyI/scene.splinecode"></spline-viewer>
                    </div>
                </div>
            </header>

            <div  className="contact-overview-title">
                <h1>{t('contactPage.overview.contactDetailsTitle')}</h1>
            </div>

            <section data-aos="fade-up"   className="container contact-section">
                <div className="blob location-blob">
                    <h2>{t('contactPage.sections.location.title')}</h2>
                    <a href='https://maps.app.goo.gl/bumqeQ7GmkcZK42F9' className='contact-link'>
                    <img className="location-img" src="/assets/Icons For Synaps/Main Icons/Europe Map.png" alt={t('contactPage.sections.location.imageAlt')} />
                    </a>
                    <a href="https://maps.app.goo.gl/Vgs2p8wTLbe4XMZf8" className="contact-link"><h5>{t('contactPage.sections.location.description')}</h5></a>
                </div>
                <div className="blob phone-mail-blob">
                    <h2>{t('contactPage.sections.contact.title')}</h2>
                    <a href="https://wa.me/message/SU2TIHKYORJHH1" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/whatsapp.png" alt="Whatsapp" /></a>
                    <a href="https://wa.me/message/SU2TIHKYORJHH1"><h4>WhatsApp</h4></a>
                    <a href="tel:+32456071631" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/phone-call.png" alt="Whatsapp" /></a>
                    <a href="tel:+32456071631"><h4>{t('contactPage.sections.contact.phone.number')}</h4></a>
                    <a href={`mailto:${t('contactPage.sections.contact.email.address')}`} className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/email.png" alt="Whatsapp" /></a>
                    <a href={`mailto:${t('contactPage.sections.contact.email.address')}`}><h4>{t('contactPage.sections.contact.email.address')}</h4></a>
                </div>
                <div className="blob socials-blob">
                    <h2>{t('contactPage.sections.socials.title')}</h2>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/people/Synaps/61568060890785/" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/facebook.png" alt="Facebook" /></a>
                        <a href="https://www.instagram.com/synapslimited/" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/instagram.png" alt="Instagram" /></a>
                        <a href="https://www.linkedin.com/company/synaps-marketing" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/linkedin.png" alt="LinkedIn" /></a>
                        <a href="https://www.youtube.com/@synaps-limited" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/youtube.png" alt="YouTube" /></a>
                        <a href="https://www.tiktok.com/@synapslimited.eu?_t=8rAFYTtXYBz&_r=1" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/TikTok.png" alt="Tiktok" /></a>
                        <a href="https://x.com/SynapsLimited" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/TwitterX.png" alt="X/Twitter" /></a>
                        <a href="https://www.threads.net/@synapslimited?invite=0" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/threads.png" alt="Threads" /></a>

                    </div>
                </div>
            </section>

            <div  className="contact-overview-title">
                <h1>{t('contactPage.overview.consultNowTitle')}</h1>
                <p>{t('contactPage.overview.consultNowDescription')}</p>
            </div>

            <ContactForm />
        </div>
    );
};

export default Contact;
