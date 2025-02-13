'use client';

import React from 'react'; // Add this import
import { useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import './../css/portfolio.css';
import SplineViewer from './SplineViewer';

interface GalleryItem {
  imgSrc: string;
  alt: string;
  title: string;
  description: string;
  link: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

const Gallery = ({ items }: GalleryProps) => {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
    event.preventDefault();
    setOpenItem(itemId);
    const galleryUl = document.querySelector('.gallery ul');
    if (galleryUl) {
      galleryUl.classList.add('item_open');
    }
    const itemElement = document.querySelector(`#${itemId}`);
    if (itemElement) {
      itemElement.classList.add('item_open');
    }
  };

  const handleCloseClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpenItem(null);
    document.querySelectorAll('.port').forEach((port) => port.classList.remove('item_open'));
    const galleryUl = document.querySelector('.gallery ul');
    if (galleryUl) {
      galleryUl.classList.remove('item_open');
    }
  };

  // Safeguard: if items is undefined, use an empty array
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section className="container gallery">
      <div className="row">
        <ul>
          <a href="#" className="close" onClick={handleCloseClick}></a>
          {safeItems.map((item, index) => (
            <li key={index}>
              <a href={`#item${index + 1}`} onClick={(event) => handleItemClick(event, `item${index + 1}`)}>
                <img src={item.imgSrc} alt={item.alt} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {safeItems.map((item, index) => (
        <div
          id={`item${index + 1}`}
          key={index}
          className={`port ${openItem === `item${index + 1}` ? 'item_open' : ''}`}
        >
          <div className="row">
            <div className="description">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <a href={item.link} className="btn btn-secondary btn-view-project">
                {t('portfolioTemplatePage.gallery.viewProjectButton')}
              </a>
            </div>
            <img src={item.imgSrc} alt={item.alt} />
          </div>
        </div>
      ))}
    </section>
  );
};

interface PortfolioTemplateProps {
  title: string;
  description: string;
  imgSrc: string;
  galleryItems: GalleryItem[];
}

const PortfolioTemplate = ({ title, description, imgSrc, galleryItems }: PortfolioTemplateProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    // Dynamically load the Spline Viewer script
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
      <Head>
        <title>{t('portfolioTemplatePage.titlePrefix')}{title}</title>
      </Head>
      <header>
        <div className="container header__container">
          <div className="header__left header-about">
            <h1>{t('portfolioTemplatePage.header.heading')}</h1>
            <h2 style={{ color: 'var(--color-primary)', marginTop: '10px' }}>{title}</h2>
            <p>{description}</p>
            <Link href="/portfolio" className="btn btn-secondary">
              {t('portfolioTemplatePage.header.portfolioButton')}
            </Link>
          </div>
          <div className="header__right" id="spline-container">
            <SplineViewer url="https://prod.spline.design/TUJchywqt3sObPx0/scene.splinecode" />
          </div>
        </div>
      </header>

      <section className="container portfolio-categories-section">
        <ul className="portfolio-categories">
          <li className="btn btn-secondary">
            <Link href="/portfolio/webdesign">{t('portfolioTemplatePage.categories.webDesign')}</Link>
          </li>
          <li className="btn btn-secondary">
            <Link href="/portfolio/appdesign">{t('portfolioTemplatePage.categories.appDesign')}</Link>
          </li>
          <li className="btn btn-secondary">
            <Link href="/portfolio/socialmedia">{t('portfolioTemplatePage.categories.socialMedia')}</Link>
          </li>
          <li className="btn btn-secondary">
            <Link href="/portfolio/branding">{t('portfolioTemplatePage.categories.branding')}</Link>
          </li>
          <li className="btn btn-secondary">
            <Link href="/portfolio/video">{t('portfolioTemplatePage.categories.video')}</Link>
          </li>
          <li className="btn btn-secondary">
            <Link href="/portfolio/advertisement">{t('portfolioTemplatePage.categories.advertisement')}</Link>
          </li>
        </ul>
      </section>

      <Gallery items={galleryItems} />
    </div>
  );
};

export default PortfolioTemplate;
