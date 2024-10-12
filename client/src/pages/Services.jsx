import React, { useEffect } from 'react';
import './../css/services.css';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ServicesForm from '../components/ServicesForm';

const Services = () => {
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
        <title>{t('servicesPage.title')} - Synaps</title>
      </Helmet>
      <header>
        <div data-aos="fade-up" className="container header__container">
          <div data-aos="fade-up" className="header__left header-services">
            <h1>{t('servicesPage.header.heading')}</h1>
            <p>
              {t('servicesPage.header.description')}
            </p>
            <a href="contact" className="btn btn-primary">{t('servicesPage.header.contactButton')}</a>
          </div>
          <div data-aos="fade-up" className="header__right" id="spline-container">
            <spline-viewer url="https://prod.spline.design/l7zIP1lmkJQWSetc/scene.splinecode"></spline-viewer>
          </div>
        </div>
      </header>
      
      <section data-aos="fade-up" className="container services-overview-section">
        <div data-aos="fade-up" className="services-overview-title">
          <h1>{t('servicesPage.overview.title')}</h1>
          <p>{t('servicesPage.overview.description')}</p>
        </div>

        <div data-aos="fade-up" className="services-overview-blobs">
          <a href="services/webdesign" data-aos="fade-up" className="service-overview-blob-art">
            <img src="/assets/Art for Synaps/Services - Web Design.png" alt={t('servicesPage.items.webDesign.title')} />
            <span>{t('servicesPage.items.webDesign.title')}</span>
          </a>
          <a href="services/socialmedia" data-aos="fade-up" className="service-overview-blob-art">
            <img src="/assets/Art for Synaps/Services - Social Media.png" alt={t('servicesPage.items.socialMedia.title')} />
            <span>{t('servicesPage.items.socialMedia.title')}</span>
          </a>
          <a href="services/branding" data-aos="fade-up" className="service-overview-blob-art">
            <img src="/assets/Art for Synaps/Services - Branding.png" alt={t('servicesPage.items.branding.title')} />
            <span>{t('servicesPage.items.branding.title')}</span>
          </a>
          <a href="services/video" data-aos="fade-up" className="service-overview-blob-art">
            <img src="/assets/Art for Synaps/Services - Video.png" alt={t('servicesPage.items.video.title')} />
            <span>{t('servicesPage.items.video.title')}</span>
          </a>
          <a href="services/advertisement" data-aos="fade-up" className="service-overview-blob-art">
            <img src="/assets/Art for Synaps/Services - Advertisement.png" alt={t('servicesPage.items.advertisement.title')} />
            <span>{t('servicesPage.items.advertisement.title')}</span>
          </a>
        </div>
      </section>

      {/* Web Design Section */}
      <section data-aos="fade-up" className="web-design container specific-service-section">
        <div data-aos="fade-up" className="specific-service-container">
          <div data-aos="fade-up" className="specific-service-left">
            <h1>{t('servicesPage.items.webDesign.title')}</h1>
            <h5>{t('servicesPage.items.webDesign.description')}</h5>
            <img src="/assets/Art for Synaps/Services - Web Design.png" alt={t('servicesPage.items.webDesign.title')} />
          </div>
          <div data-aos="fade-up" className="specific-service-right">
            <div data-aos="fade-up" className="specific-service-text-group">
              {t('servicesPage.items.webDesign.subItems', { returnObjects: true }).map((subItem, index) => (
                <h1 key={index}>{subItem}</h1>
              ))}
            </div>
            <a href="services/webdesign" className="btn btn-primary">{t('servicesPage.servicesButton')}</a>
            <a href="portfolio/webdesign" className="btn btn-secondary">{t('servicesPage.portfolioButton')}</a>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section data-aos="fade-up" className="social-media container specific-service-section">
        <div data-aos="fade-up" className="specific-service-container">
          <div data-aos="fade-up" className="specific-service-left">
            <h1>{t('servicesPage.items.socialMedia.title')}</h1>
            <h5>{t('servicesPage.items.socialMedia.description')}</h5>
            <img src="/assets/Art for Synaps/Services - Social Media.png" alt={t('servicesPage.items.socialMedia.title')} />
          </div>
          <div data-aos="fade-up" className="specific-service-right">
            <div data-aos="fade-up" className="specific-service-text-group">
              {t('servicesPage.items.socialMedia.subItems', { returnObjects: true }).map((subItem, index) => (
                <h1 key={index}>{subItem}</h1>
              ))}
            </div>
            <a href="services/socialmedia" className="btn btn-primary">{t('servicesPage.servicesButton')}</a>
            <a href="portfolio/socialmedia" className="btn btn-secondary">{t('servicesPage.portfolioButton')}</a>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section data-aos="fade-up" className="branding container specific-service-section">
        <div data-aos="fade-up" className="specific-service-container">
          <div data-aos="fade-up" className="specific-service-left">
            <h1>{t('servicesPage.items.branding.title')}</h1>
            <h5>{t('servicesPage.items.branding.description')}</h5>
            <img src="/assets/Art for Synaps/Services - Branding.png" alt={t('servicesPage.items.branding.title')} />
          </div>
          <div data-aos="fade-up" className="specific-service-right">
            <div data-aos="fade-up" className="specific-service-text-group">
              {t('servicesPage.items.branding.subItems', { returnObjects: true }).map((subItem, index) => (
                <h1 key={index}>{subItem}</h1>
              ))}
            </div>
            <a href="services/branding" className="btn btn-primary">{t('servicesPage.servicesButton')}</a>
            <a href="portfolio/branding" className="btn btn-secondary">{t('servicesPage.portfolioButton')}</a>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section data-aos="fade-up" className="video container specific-service-section">
        <div data-aos="fade-up" className="specific-service-container">
          <div data-aos="fade-up" className="specific-service-left">
            <h1>{t('servicesPage.items.video.title')}</h1>
            <h5>{t('servicesPage.items.video.description')}</h5>
            <img src="/assets/Art for Synaps/Services - Video.png" alt={t('servicesPage.items.video.title')} />
          </div>
          <div data-aos="fade-up" className="specific-service-right">
            <div data-aos="fade-up" className="specific-service-text-group">
              {t('servicesPage.items.video.subItems', { returnObjects: true }).map((subItem, index) => (
                <h1 key={index}>{subItem}</h1>
              ))}
            </div>
            <a href="services/video" className="btn btn-primary">{t('servicesPage.servicesButton')}</a>
            <a href="portfolio/video" className="btn btn-secondary">{t('servicesPage.portfolioButton')}</a>
          </div>
        </div>
      </section>

      {/* Advertisement Section */}
      <section data-aos="fade-up" className="advertisement container specific-service-section">
        <div data-aos="fade-up" className="specific-service-container">
          <div data-aos="fade-up" className="specific-service-left">
            <h1>{t('servicesPage.items.advertisement.title')}</h1>
            <h5>{t('servicesPage.items.advertisement.description')}</h5>
            <img src="/assets/Art for Synaps/Services - Advertisement.png" alt={t('servicesPage.items.advertisement.title')} />
          </div>
          <div data-aos="fade-up" className="specific-service-right">
            <div data-aos="fade-up" className="specific-service-text-group">
              {t('servicesPage.items.advertisement.subItems', { returnObjects: true }).map((subItem, index) => (
                <h1 key={index}>{subItem}</h1>
              ))}
            </div>
            <a href="services/advertisement" className="btn btn-primary">{t('servicesPage.servicesButton')}</a>
            <a href="portfolio/advertisement" className="btn btn-secondary">{t('servicesPage.portfolioButton')}</a>
          </div>
        </div>
      </section>

      <ServicesForm />
    </div>
  );
};

export default Services;
