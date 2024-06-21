import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SplineViewer from '../components/SplineViewer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './../css/home.css'
import ThumbnailMarketing from "../images/marketing-blog.webp"
import ThumbnailBusiness from "../images/productshowcases-blog.webp"
import ThumbnailAI from "../images/artificialintelligence-blog.webp"
import ThumbnailTechnology from "../images/technology-blog.webp"
import ThumbnailGaming from "../images/gaming-blog.webp"
import ThumbnailProduct from "../images/productshowcases-blog.webp"
import ThumbnailEntertainment from "../images/gaming-blog.webp"

const Index = () => {
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
        <title>Synaps</title>
      </Helmet>
      <div className="Index">

        <header>
          <div className="container header__container">
            <div className="header__left">
              <h1>The missing LINK to success!</h1>
              <p>
                Synaps is the new way to reach new goals, more audience, and bigger success. Synaps cannot only solve your company’s problems, but also find them. Synaps is the missing link to your puzzle of success. Still waiting? Contact Now!
              </p>
              <a href="contact" className="btn btn-primary">Contact</a>
            </div>
            <div className="header__right" id="spline-container">
            <spline-viewer url="https://prod.spline.design/jrLjXj-6Cyo185OQ/scene.splinecode" />
            </div>
          </div>
        </header>

        <div className="title-container about-title">
          <h2 className="title-about">About Us</h2>
          <p>Synaps is a company that improves the identity of your brand and finds solutions to your problems through the latest marketing techniques. Synaps is determined to become your marketing team. Outsource all your problems and goals to us and Synaps will provide the best results.</p>
        </div>
        <section className="container about-section">
          <div className="about-image">
            <img src="/assets/Art for Synaps/Laptop - Hompage.png" alt="Computer" />
          </div>
          <div className="social-links">
            <a href="#" className="social-link"><img src="/assets/Icons For Synaps/Main Icons/facebook.png" alt="Facebook" /></a>
            <a href="#" className="social-link"><img src="/assets/Icons For Synaps/Main Icons/instagram.png" alt="Instagram" /></a>
            <a href="#" className="social-link"><img src="/assets/Icons For Synaps/Main Icons/linkedin.png" alt="LinkedIn" /></a>
            <a href="#" className="social-link"><img src="/assets/Icons For Synaps/Main Icons/youtube.png" alt="YouTube" /></a>
            <a href="about" className="btn btn-primary btn-about">About Us</a>
          </div>

        </section>

        <div className="title-container">
          <h2 className="title">Services</h2>
        </div>
        <section className="container services-section">
          <div className="services-blobs">
            <a href="services/webdesign" className="service-blob">
              <img src="/assets/Art for Synaps/Services - Web Design.png" alt="Web Design" />
              <span>Web Design</span>
            </a>
            <a href="services/socialmedia" className="service-blob">
              <img src="/assets/Art for Synaps/Services - Social Media.png" alt="Social Media" />
              <span>Social Media</span>
            </a>
            <a href="services/branding" className="service-blob">
              <img src="/assets/Art for Synaps/Services - Branding.png" alt="Branding" />
              <span>Branding</span>
            </a>
            <a href="services/video" className="service-blob">
              <img src="/assets/Art for Synaps/Services - Video.png" alt="Video" />
              <span>Video</span>
            </a>
            <a href="services/advertisement" className="service-blob">
              <img src="assets/Art for Synaps/Services - Advertisement.png" alt="Advertisement" />
              <span>Advertisement</span>
            </a>
          </div>
          <div className="services-image">
            <img src="/assets/Art for Synaps/Phone - Homepage.png" alt="Phone" className="service-phone" />
            <a href="services" className="btn btn-primary service-btn">Services</a>
          </div>
        </section>

        <section className="container portfolio-section">
      <div className="portfolio-image">
        <img src="assets/Art for Synaps/Portfolio - Hompage.png" alt="VR Headset" className="vr-headset" />
      </div>
      <div className="btn-location">
        <a href="portfolio" className="btn btn-secondary btn-portfolio">Portfolio</a>
      </div>
      <div className="portfolio-content">
        <div className="portfolio-text-circle">
          <span>Portfolio</span>
        </div>
        <div className="portfolio-text-line">
          <span>
            Explore our portfolio section to witness some of <br />
            our previous works for different clients <br />
            throughout the years.
          </span>
        </div>
      </div>
    </section>

        <section className="container blog-section">
          <div className="article-container">
          <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
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
              pagination={{ clickable: true }}
              navigation={true}
            >
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailMarketing} alt="Marketing Blog" />
                  </figure>
                  <div className="article-content">
                    <a href="blog" className="card-category">Blog</a>
                    <h3 className="card-title">Marketing</h3>
                    <p className="card-excerpt">Explore our marketing blog section for the latest insights, strategies, and tips to elevate your brand's presence and drive business growth.</p>
                    <a href="blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailBusiness} alt="Business Blog" />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">Business</h3>
                    <p className="card-excerpt">Explore our business blog section for expert advice, industry trends, and actionable strategies to help you achieve your entrepreneurial goals and drive success.</p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailTechnology} alt="Technology Blog" />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">Technology</h3>
                    <p className="card-excerpt">Explore our technology blog section for the latest updates, insights, and innovations in the tech world, designed to keep you informed and ahead of the curve.</p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailAI} alt="AI Blog" />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">AI</h3>
                    <p className="card-excerpt">
                    Explore our AI blog section for cutting-edge insights & breakthroughs of artificial intelligence to keep informed of this rapidly evolving field.</p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailTechnology} alt="Technology Blog" />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">Gaming</h3>
                    <p className="card-excerpt">Explore our gaming blog section for the latest news, reviews, and strategies, keeping you informed and engaged in the dynamic world of video games.</p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailProduct} alt="Product Blog" />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">Product</h3>
                    <p className="card-excerpt">
                    Explore our product showcases blog section for in-depth reviews, features, and highlights of the latest and most innovative products on the market.</p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
              <SwiperSlide>
                <article className="article-card">
                  <figure className="article-image">
                    <img src={ThumbnailEntertainment} alt="Entertainment Blog" />
                  </figure>
                  <div className="article-content">
                    <a href="/blog" className="card-category">Blog</a>
                    <h3 className="card-title">Entertainment</h3>
                    <p className="card-excerpt">
                    Explore our entertainment blog section for the latest news, reviews of movies, TV shows & music keeping you connected to the world of entertainment.</p>
                    <a href="/blog" className="btn btn-secondary btn-blog">Blog</a>
                  </div>
                </article>
              </SwiperSlide>
            
            </Swiper>

          </div>
        </section>

        <section id="logoshowcase-placeholder"></section>

      </div>
      </div>

  );
};

export default Index;
