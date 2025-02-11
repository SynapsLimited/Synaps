'use client'

import React, { useEffect } from 'react';
import Head from 'next/head'; // Using Next.js Head
import './../css/services.css';
import { useTranslation } from 'react-i18next';
import ServicesForm from '../components/ServicesForm';
import SplineViewer from '../components/SplineViewer';

const Services: React.FC = () => {
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

  // Helper function to ensure subItems are typed as string arrays
  const getSubItems = (key: string): string[] => {
    return t(key, { returnObjects: true }) as string[];
  };

  return (
    <div>
      <Head>
        <title>{t('servicesPage.title')} - Synaps</title>
      </Head>
      
      <header>
        <div className="container header__container">
          <div className="header__left header-services">
            <h1>{t('servicesPage.header.heading')}</h1>
            <p>{t('servicesPage.header.description')}</p>
            {/* Consider using Next.js Link for client-side navigation */}
            <a href="/contact" className="btn btn-primary">{t('servicesPage.header.contactButton')}</a>
          </div>
          <div className="header__right" id="spline-container">
            <SplineViewer url="https://prod.spline.design/l7zIP1lmkJQWSetc/scene.splinecode" />
          </div>
        </div>
      </header>
      
      <section data-aos="fade-up" className="container services-overview-section">
        <div className="services-overview-title">
          <h1>{t('servicesPage.overview.title')}</h1>
          <p>{t('servicesPage.overview.description')}</p>
        </div>

        <div className="services-overview-blobs">
          <a href="/services/webdesign" className="service-overview-blob-art">
            <img src="/assets/Art for Synaps/Services - Web Design.png" alt={t('servicesPage.items.webDesign.title')} />
            <span>{t('servicesPage.items.webDesign.title')}</span>
          </a>
          <a href="/services/appdesign" className="service-overview-blob-art">
            <img src="/assets/Art for Synaps/Phone - Homepage.png" alt={t('servicesPage.items.appDesign.title')} />
            <span>{t('servicesPage.items.appDesign.title')}</span>
          </a>
          <a href="/services/socialmedia" className="service-overview-blob-art">
            <img src="/assets/Art for Synaps/Services - Social Media.png" alt={t('servicesPage.items.socialMedia.title')} />
            <span>{t('servicesPage.items.socialMedia.title')}</span>
          </a>
          <a href="/services/branding" className="service-overview-blob-art">
            <img src="/assets/Art for Synaps/Services - branding.png" alt={t('servicesPage.items.branding.title')} />
            <span>{t('servicesPage.items.branding.title')}</span>
          </a>
          <a href="/services/video" className="service-overview-blob-art">
            <img src="/assets/Art for Synaps/Services - video.png" alt={t('servicesPage.items.video.title')} />
            <span>{t('servicesPage.items.video.title')}</span>
          </a>
          <a href="/services/advertisement" className="service-overview-blob-art">
            <img src="/assets/Art for Synaps/Services - advertisement.png" alt={t('servicesPage.items.advertisement.title')} />
            <span>{t('servicesPage.items.advertisement.title')}</span>
          </a>

        </div>
      </section>

      {/* Web Design Section */}
      <section data-aos="fade-up" className="web-design container specific-service-section">
        <div className="specific-service-container">
          <div className="specific-service-left">
            <h1>{t('servicesPage.items.webDesign.title')}</h1>
            <h5>{t('servicesPage.items.webDesign.description')}</h5>
            <img src="/assets/Art for Synaps/Services - Web Design.png" alt={t('servicesPage.items.webDesign.title')} />
          </div>
          <div className="specific-service-right">
            <div className="specific-service-text-group">
              {getSubItems('servicesPage.items.webDesign.subItems').map((subItem: string, index: number) => (
                <h1 key={index}>{subItem}</h1>
              ))}
            </div>
            <a href="/services/webdesign" className="btn btn-primary">{t('servicesPage.servicesButton')}</a>
            <a href="/portfolio/webdesign" className="btn btn-secondary">{t('servicesPage.portfolioButton')}</a>
          </div>
        </div>
      </section>
                  {/* App Design Section */}
                  <section data-aos="fade-up" className="appdesign container specific-service-section">
        <div className="specific-service-container">
          <div className="specific-service-left">
            <h1>{t('servicesPage.items.appDesign.title')}</h1>
            <h5>{t('servicesPage.items.appDesign.description')}</h5>
            <img src="/assets/Art for Synaps/Phone - Homepage.png" alt={t('servicesPage.items.appDesign.title')} />
          </div>
          <div className="specific-service-right">
            <div className="specific-service-text-group">
              {getSubItems('servicesPage.items.appDesign.subItems').map((subItem: string, index: number) => (
                <h1 key={index}>{subItem}</h1>
              ))}
            </div>
            <a href="/services/appdesign" className="btn btn-primary">{t('servicesPage.servicesButton')}</a>
            <a href="/portfolio/appdesign" className="btn btn-secondary">{t('servicesPage.portfolioButton')}</a>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section data-aos="fade-up" className="social-media container specific-service-section">
        <div className="specific-service-container">
          <div className="specific-service-left">
            <h1>{t('servicesPage.items.socialMedia.title')}</h1>
            <h5>{t('servicesPage.items.socialMedia.description')}</h5>
            <img src="/assets/Art for Synaps/Services - Social Media.png" alt={t('servicesPage.items.socialMedia.title')} />
          </div>
          <div className="specific-service-right">
            <div className="specific-service-text-group">
              {getSubItems('servicesPage.items.socialMedia.subItems').map((subItem: string, index: number) => (
                <h1 key={index}>{subItem}</h1>
              ))}
            </div>
            <a href="/services/socialmedia" className="btn btn-primary">{t('servicesPage.servicesButton')}</a>
            <a href="/portfolio/socialmedia" className="btn btn-secondary">{t('servicesPage.portfolioButton')}</a>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section data-aos="fade-up" className="branding container specific-service-section">
        <div className="specific-service-container">
          <div className="specific-service-left">
            <h1>{t('servicesPage.items.branding.title')}</h1>
            <h5>{t('servicesPage.items.branding.description')}</h5>
            <img src="/assets/Art for Synaps/Services - branding.png" alt={t('servicesPage.items.branding.title')} />
          </div>
          <div className="specific-service-right">
            <div className="specific-service-text-group">
              {getSubItems('servicesPage.items.branding.subItems').map((subItem: string, index: number) => (
                <h1 key={index}>{subItem}</h1>
              ))}
            </div>
            <a href="/services/branding" className="btn btn-primary">{t('servicesPage.servicesButton')}</a>
            <a href="/portfolio/branding" className="btn btn-secondary">{t('servicesPage.portfolioButton')}</a>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section data-aos="fade-up" className="video container specific-service-section">
        <div className="specific-service-container">
          <div className="specific-service-left">
            <h1>{t('servicesPage.items.video.title')}</h1>
            <h5>{t('servicesPage.items.video.description')}</h5>
            <img src="/assets/Art for Synaps/Services - video.png" alt={t('servicesPage.items.video.title')} />
          </div>
          <div className="specific-service-right">
            <div className="specific-service-text-group">
              {getSubItems('servicesPage.items.video.subItems').map((subItem: string, index: number) => (
                <h1 key={index}>{subItem}</h1>
              ))}
            </div>
            <a href="/services/video" className="btn btn-primary">{t('servicesPage.servicesButton')}</a>
            <a href="/portfolio/video" className="btn btn-secondary">{t('servicesPage.portfolioButton')}</a>
          </div>
        </div>
      </section>

      {/* Advertisement Section */}
      <section data-aos="fade-up" className="advertisement container specific-service-section">
        <div className="specific-service-container">
          <div className="specific-service-left">
            <h1>{t('servicesPage.items.advertisement.title')}</h1>
            <h5>{t('servicesPage.items.advertisement.description')}</h5>
            <img src="/assets/Art for Synaps/Services - advertisement.png" alt={t('servicesPage.items.advertisement.title')} />
          </div>
          <div className="specific-service-right">
            <div className="specific-service-text-group">
              {getSubItems('servicesPage.items.advertisement.subItems').map((subItem: string, index: number) => (
                <h1 key={index}>{subItem}</h1>
              ))}
            </div>
            <a href="/services/advertisement" className="btn btn-primary">{t('servicesPage.servicesButton')}</a>
            <a href="/portfolio/advertisement" className="btn btn-secondary">{t('servicesPage.portfolioButton')}</a>
          </div>
        </div>
      </section>



      <ServicesForm />
    </div>
  );
};

export default Services;
