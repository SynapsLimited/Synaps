'use client'

import React, { useEffect } from 'react';
import Head from 'next/head'; // Using Next.js Head
import Link from 'next/link'; // Using Next.js Link
import './../css/portfolio.css';
import { useTranslation } from 'react-i18next';
import SplineViewer from '../components/SplineViewer';

// Define TypeScript interface for PortfolioItem props
interface PortfolioItemProps {
  imgSrc: string;
  title: string;
  link: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ imgSrc, title, link }) => {
  return (
    <div className="portfolio-page-item flex flex-col items-center">
      <img src={imgSrc} alt={title} className="portfolio-page-img mb-4" />
      <Link href={link} className="btn btn-primary">
        {title}
      </Link>
    </div>
  );
};

const Portfolio: React.FC = () => {
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
      <Head>
        <title>{t('portfolioPage.title')} - Synaps</title>
      </Head>
      <header>
        <div className="container header__container text-center flex flex-col md:flex-row items-center justify-between">
          <div className="header__left header-portfolio text-center md:text-left mb-8 md:mb-0">
            <h1>{t('portfolioPage.header.heading')}</h1>
            <p>{t('portfolioPage.header.description')}</p>
            {/* Use Next.js Link for client-side navigation */}
            <Link href="/contact" className="btn btn-primary">
              {t('portfolioPage.header.contactButton')}
            </Link>
          </div>
          <div className="header__right" id="spline-container">
            <SplineViewer url="https://prod.spline.design/TUJchywqt3sObPx0/scene.splinecode" />
          </div>
        </div>
      </header>

      <div className="services-overview-title text-center my-12">
        <h1 className="text-4xl font-semibold">{t('portfolioPage.categoriesTitle')}</h1>
      </div>

      <section data-aos="fade-up" className="portfolio-page-section container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PortfolioItem
            imgSrc="/assets/Art for Synaps/Portfolio - Web Design.png"
            title={t('portfolioPage.items.webDesign')}
            link="/portfolio/webdesign"
          />
                      <PortfolioItem
            imgSrc="/assets/Art for Synaps/Portfolio - App Design.png"
            title={t('portfolioPage.items.appDesign')}
            link="/portfolio/appDesign"
          />

        </div>
      </section>
      <section data-aos="fade-up" className="portfolio-page-section container mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PortfolioItem
            imgSrc="/assets/Art for Synaps/Portfolio - Social Media.png"
            title={t('portfolioPage.items.socialMedia')}
            link="/portfolio/socialmedia"
          />
          <PortfolioItem
            imgSrc="/assets/Art for Synaps/Portfolio - Branding.png"
            title={t('portfolioPage.items.branding')}
            link="/portfolio/branding"
          />

        </div>
      </section>
      <section data-aos="fade-up" className="portfolio-page-section container mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PortfolioItem
            imgSrc="/assets/Art for Synaps/Portfolio - Video.png"
            title={t('portfolioPage.items.video')}
            link="/portfolio/video"
          />
          <PortfolioItem
            imgSrc="/assets/Art for Synaps/Portfolio - Advertisement.png"
            title={t('portfolioPage.items.advertisement')}
            link="/portfolio/advertisement"
          />

        </div>
      </section>
    </div>
  );
};

export default Portfolio;
