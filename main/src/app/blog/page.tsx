'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import './../css/blog.css'; // Adjust the path as per your project structure
import { useTranslation } from 'react-i18next';
import Posts from './../components/Posts';
import Authors from './../components/Authors';
import SplineViewer from './../components/SplineViewer';

const Blog: React.FC = () => {
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
        <title>{t('blogPage.title')} - Synaps</title>
      </Head>

      <header>
        <div className="container header__container">
          <div className="header__left header-blog">
            <h1>{t('blogPage.header.heading')}</h1>
            <p>{t('blogPage.header.description')}</p>
            <Link href="/contact" className="btn btn-secondary">{t('blogPage.header.contactButton')}</Link>
          </div>
          <div className="header__right" id="spline-container">
            <SplineViewer url="https://prod.spline.design/A0hNRHhFOAhaezpC/scene.splinecode"></SplineViewer>
          </div>
        </div>
      </header>

      <div className="blog-title">
        <h1>{t('blogPage.intro.heading')}</h1>
        <p>{t('blogPage.intro.description')}</p>
      </div>

      <section data-aos="fade-up" className="container blog-categories-section">
        <div className="blog-title">
          <h1>{t('blogPage.categories.heading')}</h1>
        </div>
        <ul className="blog-categories">
          {Object.entries(t('blogPage.categories.items', { returnObjects: true }) as Record<string, string>).map(([key, value]) => (
            <li key={key} className="btn btn-secondary">
              <Link href={`/blog/categories/${key}`}>{value}</Link>
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
