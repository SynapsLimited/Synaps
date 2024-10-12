import React, { useEffect } from 'react';
import './../css/services.css';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './../css/home.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ServicesTemplate = ({ title, description, imgSrc, importanceTitle, importanceText, importanceImgSrc, types = [], bundles = [] }) => {
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

  // Function to format title to URL-friendly string
  const formatTitleToURL = (title) => {
    const specialCases = {
      'Web Design': 'webdesign', // Add more special cases as needed
    };

    return specialCases[title] || title.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div>
      <Helmet>
        <title>{t('servicesTemplatePage.titlePrefix')}{title}</title>
        <link rel="icon" href="/assets/Synaps Logos/Synaps Logo Icon.ico" />
      </Helmet>
      <header>
        <div data-aos="fade-up" className="container header__container">
          <div data-aos="fade-up" className="header__left header-about">
            <h1>{t('servicesTemplatePage.header.servicesHeading')}</h1>
            <h2 style={{ color: 'var(--color-secondary)' }}>{title}</h2>
            <p>{description}</p>
            <a href="contact" className="btn btn-primary">{t('servicesTemplatePage.header.contactButton')}</a>
          </div>
          <div data-aos="fade-up" className="header__right" id="spline-container">
            <spline-viewer url="https://prod.spline.design/l7zIP1lmkJQWSetc/scene.splinecode"></spline-viewer>
          </div>
        </div>
      </header>

      <section data-aos="fade-up" className="container portfolio-categories-section">
        <ul data-aos="fade-up" className="portfolio-categories">
          <li className="btn btn-primary"><Link to="/services/webdesign">{t('servicesTemplatePage.categories.webDesign')}</Link></li>
          <li className="btn btn-primary"><Link to="/services/socialmedia">{t('servicesTemplatePage.categories.socialMedia')}</Link></li>
          <li className="btn btn-primary"><Link to="/services/branding">{t('servicesTemplatePage.categories.branding')}</Link></li>
          <li className="btn btn-primary"><Link to="/services/video">{t('servicesTemplatePage.categories.video')}</Link></li>
          <li className="btn btn-primary"><Link to="/services/advertisement">{t('servicesTemplatePage.categories.advertisement')}</Link></li>
        </ul>
      </section>
      
      <section data-aos="fade-up" className="importance-section">
        <h2 data-aos="fade-up" className="importance-title">{t('servicesTemplatePage.importanceTitle', { title: importanceTitle })}</h2>
        <div data-aos="fade-up" className="importance-content">
          <div data-aos="fade-up" className="importance-text">
            <p>{importanceText}</p>
          </div>
          <div data-aos="fade-up" className="importance-image">
            <img src={importanceImgSrc} alt={t('servicesTemplatePage.importanceTitle', { title: importanceTitle })} />
          </div>
        </div>
      </section>

      {types.length > 0 && (
        <section data-aos="fade-up" className="container types-section">
          <h2 data-aos="fade-up" className="types-title">{t('servicesTemplatePage.typesTitle', { title })}</h2>
          <Swiper
            spaceBetween={100}
            slidesPerView={1}
            autoplay={{
              delay: 3000, // Slide every 3 seconds
              disableOnInteraction: false, // Disable autoplay when user interacts
              pauseOnMouseEnter: true, // Pause autoplay on hover
            }}
            modules={[Pagination, Navigation, EffectCoverflow, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 100,
              },
            }}
          >
            {types.map((type, index) => (
              <SwiperSlide key={index}>
                <div data-aos="fade-up" className="types-slide">
                  <img src={type.imgSrc} alt={type.title} />
                  <div>
                    <h4>{type.title}</h4>
                    <p>{type.description}</p>
                    <a href={`/portfolio/${formatTitleToURL(title)}`} className="btn btn-secondary">{t('servicesTemplatePage.portfolioButton')}</a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      <div className="bundle-text container">
        <h1>{t('servicesTemplatePage.bundlesTitle', { title })} <img src="/assets/Synaps Logos/Synaps Logo Art copy - DARK.png" alt="Synaps logo" /></h1>
      </div>

      {/* Bundle Section */}
      <section className="bundle-section">
        <div className="bundle-swiper">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            autoplay={{
              delay: 3000, // Slide every 3 seconds
              disableOnInteraction: false, // Disable autoplay when user interacts
              pauseOnMouseEnter: true, // Pause autoplay on hover
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: true
            }}
            keyboard={{ enabled: true }}
            mousewheel={{ thresholdDelta: 70 }}
            spaceBetween={60}
            loop={true}
            pagination={{
              el: `.${t('servicesTemplatePage.bundles.swiperPagination')}`,
              clickable: true
            }}
          >
            {bundles.map((bundle, index) => (
              <SwiperSlide key={index} className="bundle-swiper-slide bundle-swiper-slide-specific" style={{ backgroundImage: `url(${bundle.imgSrc})` }}>
                <span>{title}</span>
                <div>
                  <h2>{bundle.name}</h2>
                  <p>{bundle.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination"></div>
        </div>
      </section>
      {/* End of Bundle Section */}
    </div>
  );
};

export default ServicesTemplate;
