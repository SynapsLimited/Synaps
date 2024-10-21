import React, { useEffect, useState } from 'react';
import './../css/portfolio.css';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Gallery = ({ items }) => {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState(null);

  const handleItemClick = (event, itemId) => {
    event.preventDefault(); // Prevent default anchor behavior
    setOpenItem(itemId);
    document.querySelector('.gallery ul').classList.add('item_open');
    document.querySelector(`#${itemId}`).classList.add('item_open');
  };

  const handleCloseClick = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    setOpenItem(null);
    document.querySelectorAll('.port').forEach(port => port.classList.remove('item_open'));
    document.querySelector('.gallery ul').classList.remove('item_open');
  };

  return (
    <section  className="container gallery">
      <div className="row">
        <ul>
          <a href="#" className="close" onClick={handleCloseClick}></a>
          {items.map((item, index) => (
            <li key={index}>
              <a href={`#item${index + 1}`} onClick={(event) => handleItemClick(event, `item${index + 1}`)}>
                <img src={item.imgSrc} alt={item.alt} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {items.map((item, index) => (
        <div id={`item${index + 1}`} key={index}  className={`port ${openItem === `item${index + 1}` ? 'item_open' : ''}`}>
          <div  className="row">
            <div className="description">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <a href={item.link} className="btn btn-secondary btn-view-project">{t('portfolioTemplatePage.gallery.viewProjectButton')}</a>
            </div>
            <img src={item.imgSrc} alt={item.alt} />
          </div>
        </div>
      ))}
    </section>
  );
};

const PortfolioTemplate = ({ title, description, imgSrc, galleryItems }) => {
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
        <title>{t('portfolioTemplatePage.titlePrefix')}{title}</title>
      </Helmet>
      <header>
        <div  className="container header__container">
          <div  className="header__left header-about">
            <h1>{t('portfolioTemplatePage.header.heading')}</h1>
            <h2 style={{ color: 'var(--color-primary)', marginTop: '10px' }}>{title}</h2>
            <p>{description}</p>
            <a href="/portfolio" className="btn btn-secondary">{t('portfolioTemplatePage.header.portfolioButton')}</a>
          </div>
          <div  className="header__right" id="spline-container">
            <spline-viewer url="https://prod.spline.design/TUJchywqt3sObPx0/scene.splinecode"></spline-viewer>
          </div>
        </div>
      </header>

      <section  className="container portfolio-categories-section">
        <ul  className="portfolio-categories">
          <li className="btn btn-secondary"><Link to="/portfolio/webdesign">{t('portfolioTemplatePage.categories.webDesign')}</Link></li>
          <li className="btn btn-secondary"><Link to="/portfolio/socialmedia">{t('portfolioTemplatePage.categories.socialMedia')}</Link></li>
          <li className="btn btn-secondary"><Link to="/portfolio/branding">{t('portfolioTemplatePage.categories.branding')}</Link></li>
          <li className="btn btn-secondary"><Link to="/portfolio/video">{t('portfolioTemplatePage.categories.video')}</Link></li>
          <li className="btn btn-secondary"><Link to="/portfolio/advertisement">{t('portfolioTemplatePage.categories.advertisement')}</Link></li>
        </ul>
      </section>

      <Gallery items={galleryItems} />
    </div>
  );
};

export default PortfolioTemplate;
