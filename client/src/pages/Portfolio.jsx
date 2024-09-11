import React, { useEffect } from 'react';
import './../css/portfolio.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PortfolioItem = ({ imgSrc, title, link }) => {
  return (
    <div className="portfolio-page-item">
      <img src={imgSrc} alt={title} className="portfolio-page-img" />
      <Link to={link} className="btn btn-primary">{title}</Link>
    </div>
  );
};

const Portfolio = () => {
  const { t } = useTranslation();

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
        <title>{t('portfolioPage.title')} - Synaps</title>
      </Helmet>
      <header>
        <div className="container header__container">
          <div className="header__left header-about">
            <h1>{t('portfolioPage.header.heading')}</h1>
            <p>{t('portfolioPage.header.description')}</p>
            <a href="contact" className="btn btn-primary">{t('portfolioPage.header.contactButton')}</a>
          </div>
          <div className="header__right" id="spline-container">
            <spline-viewer url="https://prod.spline.design/TUJchywqt3sObPx0/scene.splinecode"></spline-viewer>
          </div>
        </div>
      </header>

      <div className="services-overview-title">
        <h1>{t('portfolioPage.categoriesTitle')}</h1>
      </div>

      <section className="portfolio-page-section container">
        <PortfolioItem imgSrc="/assets/Art for Synaps/Portfolio - Web Design.png" title={t('portfolioPage.items.webDesign')} link="/portfolio/webdesign" />
        <PortfolioItem imgSrc="/assets/Art for Synaps/Portfolio - Social Media.png" title={t('portfolioPage.items.socialMedia')} link="/portfolio/socialmedia" />
      </section>
      <section className="portfolio-page-section container">
        <PortfolioItem imgSrc="/assets/Art for Synaps/Portfolio - Branding.png" title={t('portfolioPage.items.branding')} link="/portfolio/branding" />
        <PortfolioItem imgSrc="/assets/Art for Synaps/Portfolio - Video.png" title={t('portfolioPage.items.video')} link="/portfolio/video" />
      </section>
      <section className="portfolio-page-section container">
        <PortfolioItem imgSrc="/assets/Art for Synaps/Portfolio - Advertisement.png" title={t('portfolioPage.items.advertisement')} link="/portfolio/advertisement" />
      </section>
    </div>
  );
};

export default Portfolio;
