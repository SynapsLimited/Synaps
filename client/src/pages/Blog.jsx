import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../css/blog.css'; // Assuming you have a corresponding CSS file for styling
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Posts from '../components/Posts';
import Authors from '../blog/Authors';

const Blog = () => {
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
        <title>{t('blogPage.title')} - Synaps</title>
      </Helmet>

      <header>
        <div data-aos="fade-up" className="container header__container">
          <div data-aos="fade-up" className="header__left header-blog">
            <h1>{t('blogPage.header.heading')}</h1>
            <p>{t('blogPage.header.description')}</p>
            <a href="contact" data-aos="fade-up" className="btn btn-secondary">{t('blogPage.header.contactButton')}</a>
          </div>
          <div data-aos="fade-up" className="header__right" id="spline-container">
            <spline-viewer url="https://prod.spline.design/A0hNRHhFOAhaezpC/scene.splinecode"></spline-viewer>
          </div>
        </div>
      </header>

      <div data-aos="fade-up" className="blog-title">
        <h1>{t('blogPage.intro.heading')}</h1>
        <p>{t('blogPage.intro.description')}</p>
      </div>

      <section data-aos="fade-up" className="container blog-categories-section">
        <div data-aos="fade-up" className="blog-title">
          <h1>{t('blogPage.categories.heading')}</h1>
        </div>
        <ul data-aos="fade-up" className="blog-categories">
          {Object.entries(t('blogPage.categories.items', { returnObjects: true })).map(([key, value]) => (
            <li key={key} data-aos="fade-up" className="btn btn-secondary">
              <Link to={`/posts/categories/${key}`}>{value}</Link>
            </li>
          ))}
        </ul>
      </section>

      <Posts limit={6} />

      <section data-aos="fade-up" className="blog-authors-section">
        <Authors />
      </section>
    </div>
  );
};

export default Blog;
