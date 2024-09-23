import React, { useEffect } from 'react';
import './../css/about.css'; // Import only in About.jsx
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import SplineViewer from '../components/SplineViewer';

const About = () => {
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
        <title>{t('aboutPage.title')} - Synaps</title>
      </Helmet>
      <header>
        <div className="container header__container">
          <div className="header__left header-about">
            <h1>{t('aboutPage.title')}</h1>
            <p>{t('aboutPage.intro')}</p>
            <a href="contact" className="btn btn-secondary">{t('aboutPage.contactButton')}</a>
          </div>
          <div className="header__right" id="spline-container">
            <spline-viewer url="https://prod.spline.design/e7fMPi34Xpt4idpF/scene.splinecode"></spline-viewer>
          </div>
        </div>
      </header>

      <section className="container presentation-section">
        <div className="presentation-text">
          <h1>{t('aboutPage.whatIsSynaps')} <img src="assets/Synaps Logos/Synaps Logo Art navbar.png" alt="Synaps logo" />?</h1>
          <p>{t('aboutPage.description')}</p>
        </div>
        <div className="presentation-image">
          <img src="assets/Art for Synaps/Jellyfish - About us.png" alt="Visual representation" />
        </div>
      </section>

      <section className="card-section">
        <div className="card">
          <h1>{t('aboutPage.mission.title')}</h1>
          <div className="card-content">
            <img src="assets/Icons For Synaps/Main Icons/rocket.png" alt="Mission Icon" />
            <p>{t('aboutPage.mission.content')}</p>
          </div>
        </div>
        <div className="card">
          <h1>{t('aboutPage.vision.title')}</h1>
          <div className="card-content">
            <img src="assets/Icons For Synaps/Main Icons/binoculars.png" alt="Vision Icon" />
            <p>{t('aboutPage.vision.content')}</p>
          </div>
        </div>
        <div className="card">
          <h1>{t('aboutPage.values.title')}</h1>
          <div className="card-content">
            <img src="assets/Icons For Synaps/Main Icons/values.png" alt="Values Icon" />
            <p>{t('aboutPage.values.content')}</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="team-title-container">
          <h2>{t('aboutPage.team.title')}</h2>
        </div>
        <div className="team-wrapper">
          <div className="team-container">
            <input type="radio" name="slide" id="c1" defaultChecked />
            <label htmlFor="c1" className="team-card">
              <div className="row">
                <div className="icon">1</div>
                <div className="description">
                  <h4>{t('aboutPage.team.members.1.name')}</h4>
                  <p>{t('aboutPage.team.members.1.role')}</p>
                </div>
              </div>
            </label>
            <input type="radio" name="slide" id="c2" />
            <label htmlFor="c2" className="team-card">
              <div className="row">
                <div className="icon">2</div>
                <div className="description">
                  <h4>{t('aboutPage.team.members.2.name')}</h4>
                  <p>{t('aboutPage.team.members.2.role')}</p>
                </div>
              </div>
            </label>
            <input type="radio" name="slide" id="c3" />
            <label htmlFor="c3" className="team-card">
              <div className="row">
                <div className="icon">3</div>
                <div className="description">
                  <h4>{t('aboutPage.team.members.3.name')}</h4>
                  <p>{t('aboutPage.team.members.3.role')}</p>
                </div>
              </div>
            </label>
            <input type="radio" name="slide" id="c4" />
            <label htmlFor="c4" className="team-card">
              <div className="row">
                <div className="icon">4</div>
                <div className="description">
                  <h4>{t('aboutPage.team.members.4.name')}</h4>
                  <p>{t('aboutPage.team.members.4.role')}</p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
