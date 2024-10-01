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
                <div className="container header__container">
                    <div className="header__left header-about">
                        <h1>{t('contactPage.header.heading')}</h1>
                        <p>{t('contactPage.header.description')}</p>
                        <a href="contact" className="btn btn-secondary">{t('contactPage.header.contactButton')}</a>
                    </div>
                    <div className="header__right" id="spline-container">
                        <spline-viewer url="https://prod.spline.design/Aieg3XjNVXVy2DyI/scene.splinecode"></spline-viewer>
                    </div>
                </div>
            </header>

            <div className="contact-overview-title">
                <h1>{t('contactPage.overview.contactDetailsTitle')}</h1>
            </div>

            <section className="container contact-section">
                <div className="blob location-blob">
                    <h2>{t('contactPage.sections.location.title')}</h2>
                    <a href='https://maps.app.goo.gl/bumqeQ7GmkcZK42F9'>
                    <img className="location-img" src="/assets/Icons For Synaps/Main Icons/Europe Map.png" alt={t('contactPage.sections.location.imageAlt')} />
                    </a>
                    <h5>{t('contactPage.sections.location.description')}</h5>
                </div>
                <div className="blob phone-mail-blob">
                    <h2>{t('contactPage.sections.contact.title')}</h2>
                    <img src="/assets/Icons For Synaps/Main Icons/phone-call.png" alt={t('contactPage.sections.contact.phone.alt')} />
                    <a href="tel:+32456071631"><h4>{t('contactPage.sections.contact.phone.number')}</h4></a>
                    <img src="/assets/Icons For Synaps/Main Icons/email.png" alt={t('contactPage.sections.contact.email.alt')} />
                    <a href={`mailto:${t('contactPage.sections.contact.email.address')}`}><h4>{t('contactPage.sections.contact.email.address')}</h4></a>
                </div>
                <div className="blob socials-blob">
                    <h2>{t('contactPage.sections.socials.title')}</h2>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/facebook.png" alt={t('contactPage.sections.socials.facebookAlt')} /></a>
                        <a href="https://www.instagram.com" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/instagram.png" alt={t('contactPage.sections.socials.instagramAlt')} /></a>
                        <a href="https://www.linkedin.com" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/linkedin.png" alt={t('contactPage.sections.socials.linkedinAlt')} /></a>
                        <a href="https://www.youtube.com" className="contact-link"><img src="/assets/Icons For Synaps/Main Icons/youtube.png" alt={t('contactPage.sections.socials.youtubeAlt')} /></a>
                    </div>
                </div>
            </section>

            <div className="contact-overview-title">
                <h1>{t('contactPage.overview.consultNowTitle')}</h1>
                <p>{t('contactPage.overview.consultNowDescription')}</p>
            </div>

            <ContactForm />
        </div>
    );
};

export default Contact;
