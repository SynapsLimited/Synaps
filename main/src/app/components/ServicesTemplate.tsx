'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import SplineViewer from './SplineViewer';
import ServiceCards from '@/components/ui/service-cards'; // Adjust the import path as needed
import { Service } from '@/types/service';

// Import styles
import './../css/services.css';
import './../css/portfolio.css';

interface ServicesTemplateProps {
  title: string;
  description: string;
  imgSrc: string;
  services: Service[];
}

const ServicesTemplate = ({
  title,
  description,
  imgSrc,
  services,
}: ServicesTemplateProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.27/build/spline-viewer.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <header>
        <div className="container header__container">
          <div className="header__left header-about">
            <h1>{t('servicesTemplatePage.header.servicesHeading')}</h1>
            <h2 style={{ color: 'var(--color-secondary)' }}>{title}</h2>
            <p>{description}</p>
            <Link href="/contact" className="btn btn-primary">
              {t('servicesTemplatePage.header.contactButton')}
            </Link>
          </div>
          <div className="header__right" id="spline-container">
            <SplineViewer url="https://prod.spline.design/l7zIP1lmkJQWSetc/scene.splinecode" />
          </div>
        </div>
      </header>

      {/* Navigation Buttons */}
      <section data-aos="fade-up" className="container portfolio-categories-section">
        <ul className="portfolio-categories">
          <li className="btn btn-primary">
            <Link href="/services/webdesign">{t('servicesTemplatePage.categories.webDesign')}</Link>
          </li>
          <li className="btn btn-primary">
            <Link href="/services/appdesign">{t('servicesTemplatePage.categories.appDesign')}</Link>
          </li>
          <li className="btn btn-primary">
            <Link href="/services/socialmedia">{t('servicesTemplatePage.categories.socialMedia')}</Link>
          </li>
          <li className="btn btn-primary">
            <Link href="/services/branding">{t('servicesTemplatePage.categories.branding')}</Link>
          </li>
          <li className="btn btn-primary">
            <Link href="/services/video">{t('servicesTemplatePage.categories.video')}</Link>
          </li>
          <li className="btn btn-primary">
            <Link href="/services/advertisement">{t('servicesTemplatePage.categories.advertisement')}</Link>
          </li>
        </ul>
      </section>

      {/* Service Cards Section */}
      <section data-aos="fade-up" className="container service-cards-section">
        <h2 className=" py-12 text-4xl font-bold text-secondary mb-8 text-center">
          {t('servicesTemplatePage.servicesTitle', { title })}
        </h2>
        <ServiceCards services={services} />
      </section>
    </div>
  );
};

export default ServicesTemplate;