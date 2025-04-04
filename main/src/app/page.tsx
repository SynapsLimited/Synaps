// app/page.tsx
'use client'; // Ensure this is a client component

import React, { useEffect } from 'react';
import Head from 'next/head'; // Use next/head instead of Helmet
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import SplineViewer from './components/SplineViewer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './css/home.css';
import ThumbnailMarketing from "./../assets/images/ThumbnailMarketing.webp";
import ThumbnailBusiness from "./../assets/images/ThumbnailBusiness.webp";
import ThumbnailAI from "./../assets/images/ThumbnailAI.webp";
import ThumbnailTechnology from "./../assets/images/ThumbnailTechnology.webp";
import ThumbnailGaming from "./../assets/images/ThumbnailGaming.webp";
import ThumbnailProduct from "./../assets/images/ThumbnailProduct.webp";
import ThumbnailEntertainment from "./../assets/images/ThumbnailEntertainment.webp";
import { register } from 'swiper/element/bundle';

const Home = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const supportedLocales = ['en', 'fr', 'nl', 'it', 'de', 'es'];
  const domain = 'https://www.synapslimited.eu'; // Replace with your actual domain

  // Function to remove existing locale from pathname
  const removeLocaleFromPath = (path: string): string => {
    const regex = /^\/[a-z]{2}/i;
    return path.replace(regex, '') || '/';
  };

  useEffect(() => {
    // Register Swiper web components
    register();
    
    // Dynamically load the Spline Viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.27/build/spline-viewer.js';
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>{t('indexPage.title')}</title>
        <meta name="description" content={t('indexPage.description')} />
        {/* hreflang links */}
        {supportedLocales.map((lng) => (
          <link
            key={lng}
            rel="alternate"
            hrefLang={lng}
            href={`${domain}/${lng}${removeLocaleFromPath(pathname)}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${domain}${removeLocaleFromPath(pathname)}`} />
      </Head>
      <div className="Index">
        <header>
          <div className="container header__container">
            <div className="header__left">
              <h1>{t('indexPage.header.heading')}</h1>
              <p>{t('indexPage.header.description')}</p>
              <a href="/contact" className="btn btn-primary">{t('indexPage.header.contactButton')}</a>
            </div>
            <div className="header__right" id="spline-container">
              <SplineViewer url="https://prod.spline.design/1VQSYrmiNFt3i0cz/scene.splinecode" />
            </div>
          </div> 
        </header>

        <div className="title-container about-title">
          <h2 className="title-about">{t('indexPage.about.heading')}</h2>
          <p>{t('indexPage.about.description')}</p>
        </div>
        <section className="container about-section">
          <div className="about-image">
            <img src="/assets/Art for Synaps/Laptop - Hompage.png" alt="Computer" />
          </div>
          <div className="social-links">
            <a href="https://wa.me/message/SU2TIHKYORJHH1" className="social-link"></a> {/* WhatsApp stays the same */}
            <a href="https://www.facebook.com/people/Synaps/61568060890785/" className="social-link">
              <img src="/assets/Icons For Synaps/Main Icons/facebook.png" alt="Facebook" />
            </a> {/* Facebook stays the same */}
            <a href="https://www.instagram.com/synapslimited/" className="social-link">
              <img src="/assets/Icons For Synaps/Main Icons/instagram.png" alt="Instagram" />
            </a> {/* Instagram stays the same */}
            <a href="https://www.linkedin.com/company/synaps-marketing" className="social-link">
              <img src="/assets/Icons For Synaps/Main Icons/linkedin.png" alt="LinkedIn" />
            </a> {/* LinkedIn stays the same */}
            <a href="https://www.youtube.com/@synaps-limited" className="social-link">
              <img src="/assets/Icons For Synaps/Main Icons/youtube.png" alt="YouTube" />
            </a> {/* YouTube stays the same */}
            <a href="https://www.tiktok.com/@synapslimited.eu?_t=8rAFYTtXYBz&_r=1" className="social-link">
              <img src="/assets/Icons For Synaps/Main Icons/TikTok.png" alt="TikTok" />
            </a> {/* TikTok stays the same */}
            <a href="https://x.com/SynapsLimited" className="social-link">
              <img src="/assets/Icons For Synaps/Main Icons/TwitterX.png" alt="X" />
            </a> 
            <a href="https://www.threads.net/@synapslimited?invite=0" className="social-link">
              <img src="/assets/Icons For Synaps/Main Icons/threads.png" alt="Threads" />
            </a> 

            <a href="/about" className="btn btn-primary btn-about">{t('indexPage.about.aboutButton')}</a>
          </div>
        </section>

        <div className="title-container">
          <h2 className="title">{t('indexPage.services.heading')}</h2>
        </div>
        <section className="container services-section">
          <div className="services-blobs">
            <a href="/services/webdesign" className="service-blob">
              <img src="/assets/Art for Synaps/Services - Web Design.png" alt={t('indexPage.services.items.webDesign')} />
              <span>{t('indexPage.services.items.webDesign')}</span>
            </a>
            <a href="/services/appdesign" className="service-blob">
              <img src="/assets/Art for Synaps/Phone - Homepage.png" alt={t('indexPage.services.items.appDesign')} />
              <span>{t('indexPage.services.items.appDesign')}</span>
            </a>
            <a href="/services/socialmedia" className="service-blob">
              <img src="/assets/Art for Synaps/Services - Social Media.png" alt={t('indexPage.services.items.socialMedia')} />
              <span>{t('indexPage.services.items.socialMedia')}</span>
            </a>
            <a href="/services/branding" className="service-blob">
              <img src="/assets/Art for Synaps/Services - Branding.png" alt={t('indexPage.services.items.branding')} />
              <span>{t('indexPage.services.items.branding')}</span>
            </a>
            <a href="/services/video" className="service-blob">
              <img src="/assets/Art for Synaps/Services - Video.png" alt={t('indexPage.services.items.video')} />
              <span>{t('indexPage.services.items.video')}</span>
            </a>
            <a href="/services/advertisement" className="service-blob">
              <img src="/assets/Art for Synaps/Services - Advertisement.png" alt={t('indexPage.services.items.advertisement')} />
              <span>{t('indexPage.services.items.advertisement')}</span>
            </a>

          </div>
          <div className="services-image">
            <img src="/assets/Art for Synaps/Phone - Homepage.png" alt="Phone" className="service-phone" />
            <a href="/services" className="btn btn-primary service-btn">{t('indexPage.services.servicesButton')}</a>
          </div>
        </section>

        <section className="container portfolio-section">
          <div className="portfolio-image">
            <img src="/assets/Art for Synaps/Portfolio - Hompage.png" alt="VR Headset" className="vr-headset" />
          </div>
          <div className="btn-location">
            <a href="/portfolio" className="btn btn-secondary btn-portfolio">{t('indexPage.portfolio.portfolioButton')}</a>
          </div>
          <div className="portfolio-content">
            <div className="portfolio-text-circle">
              <span>{t('indexPage.portfolio.heading')}</span>
            </div>
            <div className="portfolio-text-line">
              <span>
                {t('indexPage.portfolio.textLine1')} <br />
                {t('indexPage.portfolio.textLine2')} <br />
                {t('indexPage.portfolio.textLine3')}
              </span>
            </div>
          </div>
        </section>

        <section className="container blog-section less-margin-bottom less-margin-top">
          <div className="article-container">
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 1,
                stretch: 0,
                depth: 125,
                modifier: 3,
                slideShadows: true
              }}
              loop={true}
              mousewheel={false}
              spaceBetween={10}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40
                }
              }}
              pagination={{
                clickable: true,
                enabled: true
              }}
              navigation={{
                enabled: true
              }}
            >
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailMarketing.src} alt={t('indexPage.blog.categories.marketing.title')} />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">{t('indexPage.blog.categories.marketing.title')}</h3>
                    <p className="card-excerpt">{t('indexPage.blog.categories.marketing.description')}</p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailBusiness.src} alt={t('indexPage.blog.categories.business.title')} />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">{t('indexPage.blog.categories.business.title')}</h3>
                    <p className="card-excerpt">{t('indexPage.blog.categories.business.description')}</p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailTechnology.src} alt={t('indexPage.blog.categories.technology.title')} />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">{t('indexPage.blog.categories.technology.title')}</h3>
                    <p className="card-excerpt">
                      {t('indexPage.blog.categories.technology.description')}
                    </p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailAI.src} alt={t('indexPage.blog.categories.ai.title')} />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">{t('indexPage.blog.categories.ai.title')}</h3>
                    <p className="card-excerpt">
                      {t('indexPage.blog.categories.ai.description')}
                    </p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailGaming.src} alt={t('indexPage.blog.categories.gaming.title')} />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">{t('indexPage.blog.categories.gaming.title')}</h3>
                    <p className="card-excerpt">{t('indexPage.blog.categories.gaming.description')}</p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailProduct.src} alt={t('indexPage.blog.categories.product.title')} />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">{t('indexPage.blog.categories.product.title')}</h3>
                    <p className="card-excerpt">
                      {t('indexPage.blog.categories.product.description')}
                    </p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailEntertainment.src} alt={t('indexPage.blog.categories.entertainment.title')} />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">{t('indexPage.blog.categories.entertainment.title')}</h3>
                    <p className="card-excerpt">
                      {t('indexPage.blog.categories.entertainment.description')}
                    </p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;
