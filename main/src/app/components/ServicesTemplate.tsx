// app/components/ServicesTemplate.tsx
'use client';

import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import SplineViewer from './SplineViewer';
import './../css/services.css'
import './../css/portfolio.css'


interface ServiceType {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
}

interface Bundle {
  name: string;
  description: string;
  imgSrc: string;
}

interface ServicesTemplateProps {
  title: string;
  description: string;
  imgSrc: string;
  importanceTitle: string;
  importanceText: string;
  importanceImgSrc: string;
  types?: ServiceType[];
  bundles?: Bundle[];
}

const ServicesTemplate = ({
  title,
  description,
  imgSrc,
  importanceTitle,
  importanceText,
  importanceImgSrc,
  types = [],
  bundles = []
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

  const formatTitleToURL = (title: string) => {
    const specialCases: Record<string, string> = {
      'Web Design': 'webdesign',
    };

    return specialCases[title] || title.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div>
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
            <SplineViewer url="https://prod.spline.design/l7zIP1lmkJQWSetc/scene.splinecode"></SplineViewer>
          </div>
        </div>
      </header>

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

      <section data-aos="fade-up" className="importance-section">
        <h2 className="importance-title">
          {t('servicesTemplatePage.importanceTitle', { title: importanceTitle })}
        </h2>
        <div className="importance-content">
          <div className="importance-text">
            <p>{importanceText}</p>
          </div>
          <div className="importance-image">
            <Image 
              src={importanceImgSrc} 
              alt={t('servicesTemplatePage.importanceTitle', { title: importanceTitle })}
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>

      {types.length > 0 && (
        <section data-aos="fade-up" className="container types-section">
          <h2 className="types-title">
            {t('servicesTemplatePage.typesTitle', { title })}
          </h2>
          <Swiper
            spaceBetween={100}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Navigation, EffectCoverflow, Autoplay]}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 1, spaceBetween: 40 },
              1024: { slidesPerView: 1, spaceBetween: 100 },
            }}
          >
            {types.map((type, index) => (
              <SwiperSlide key={index}>
                <div className="types-slide">
                  <Image src={type.imgSrc} alt={type.title} width={400} height={300} />
                  <div>
                    <h4>{type.title}</h4>
                    <p>{type.description}</p>
                    <Link 
                      href={`/portfolio/${formatTitleToURL(title)}`} 
                      className="btn btn-secondary"
                    >
                      {t('servicesTemplatePage.portfolioButton')}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      <div className="bundle-text container">
        <h1>
          {t('servicesTemplatePage.bundlesTitle', { title })} 
          <Image 
            src="/assets/Synaps Logos/Synaps Logo Art copy - DARK.png" 
            alt="Synaps logo"
            width={100}
            height={50}
          />
        </h1>
      </div>

      <section data-aos="fade-up" className="bundle-section">
        <div className="bundle-swiper">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
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
              <SwiperSlide 
                key={index} 
                className="bundle-swiper-slide bundle-swiper-slide-specific" 
                style={{ backgroundImage: `url(${bundle.imgSrc})` }}
              >
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
    </div>
  );
};

export default ServicesTemplate;