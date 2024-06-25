import React, { useEffect } from 'react';
import './../css/services.css';
import { Helmet } from 'react-helmet';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './../css/home.css';
import { Link } from 'react-router-dom';

const ServicesTemplate = ({ title, description, imgSrc, importanceTitle, importanceText, importanceImgSrc, types = [], bundles = [] }) => {
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
        <title>Synaps - Services - {title}</title>
      </Helmet>
      <header>
        <div className="container header__container">
          <div className="header__left header-about">
            <h1>Services</h1>
            <h2 style={{ color: 'var(--color-secondary)' }}>{title}</h2>
            <p>{description}</p>
            <a href="contact" className="btn btn-primary">Contact</a>
          </div>
          <div className="header__right" id="spline-container">
            <spline-viewer url="https://prod.spline.design/l7zIP1lmkJQWSetc/scene.splinecode"></spline-viewer>
          </div>
        </div>
      </header>

      <section className="container portfolio-categories-section">
        <ul className="portfolio-categories">
          <li className="btn btn-primary"><Link to="/services/webdesign">Web Design</Link></li>
          <li className="btn btn-primary"><Link to="/services/socialmedia">Social Media</Link></li>
          <li className="btn btn-primary"><Link to="/services/branding">Branding</Link></li>
          <li className="btn btn-primary"><Link to="/services/video">Video</Link></li>
          <li className="btn btn-primary"><Link to="/services/advertisement">Advertisement</Link></li>
        </ul>
      </section>
      
      <section className="importance-section">
        <h2 className="importance-title">Importance of {importanceTitle}</h2>
        <div className="importance-content">
          <div className="importance-text">
            <p>{importanceText}</p>
          </div>
          <div className="importance-image">
            <img src={importanceImgSrc} alt={`Importance of ${importanceTitle}`} />
          </div>
        </div>
      </section>

      {types.length > 0 && (
        <section className="container types-section">
          <h2 className="types-title">Types of {title}</h2>
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
                <div className="types-slide">
                  <img src={type.imgSrc} alt={type.title} />
                  <div>
                    <h4>{type.title}</h4>
                    <p>{type.description}</p>
                    <a href={`/portfolio/${formatTitleToURL(title)}`} className="btn btn-secondary">Portfolio</a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

<div className="bundle-text container">
          <h1>{title} <img src="/assets/Synaps Logos/Synaps Logo Art copy - DARK.png" alt="Synaps logo" /> Bundles</h1>
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
              el: ".swiper-pagination",
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
