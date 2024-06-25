import React, { useEffect } from 'react';
import './../css/about.css'; // Import only in About.jsx
import { Helmet } from 'react-helmet';



const About = () => {
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
        <title>Synaps - About</title>
      </Helmet>
      <header>
        <div className="container header__container">
          <div className="header__left header-about">
            <h1>About</h1>
            <p>
              Are you ready to get to know us? That is exciting! Let’s scroll down!
            </p>
            <a href="contact" className="btn btn-secondary">Contact</a>
          </div>
          <div className="header__right" id="spline-container">
          <spline-viewer url="https://prod.spline.design/e7fMPi34Xpt4idpF/scene.splinecode"></spline-viewer>          </div>
        </div>
      </header>

      <section className="container presentation-section">
        <div className="presentation-text">
          <h1>What is <img src="assets/Synaps Logos/Synaps Logo Art navbar.png" alt="Synaps logo" />?</h1>
          <p>
            <strong>Synaps.</strong> is a branding and marketing outsourcing company that aims to
            improve companies in the new digital era. Our goal is to provide the highest
            quality services to help brands reach and go beyond their goals. We focus on
            brand awareness, brand loyalty, digital marketing, traditional marketing, and
            full branding. Synaps. is what your company needs to grow, challenge, and
            conquer starting now. We are the missing link.
          </p>
        </div>
        <div className="presentation-image">
          <img src="assets/Art for Synaps/Jellyfish - About us.png" alt="Visual representation" />
        </div>
      </section>

      <section className="card-section">
        <div className="card">
          <h1>Mission</h1>
          <div className="card-content">
            <img src="assets/Icons For Synaps/Main Icons/rocket.png" alt="Mission Icon" />
            <p><b>To be a trusted partner in the success of our clients</b> by delivering innovative and effective branding and marketing solutions.</p>
          </div>
        </div>
        <div className="card">
          <h1>Vision</h1>
          <div className="card-content">
            <img src="assets/Icons For Synaps/Main Icons/binoculars.png" alt="Vision Icon" />
            <p>To become a driving force for positive change and <b>revolutionize branding and the marketing industry</b>, inspiring and empowering businesses to reach their full potential.</p>
          </div>
        </div>
        <div className="card">
          <h1>Values</h1>
          <div className="card-content">
            <img src="assets/Icons For Synaps/Main Icons/values.png" alt="Values Icon" />
            <p>Synaps is guided by a set core of values: <b>Innovation, Collaboration, Creativity, Excellence, Adaptability, Integrity.</b></p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="team-title-container">
          <h2>Meet Our Team</h2>
        </div>
        <div className="team-wrapper">
          <div className="team-container">
            <input type="radio" name="slide" id="c1" defaultChecked />
            <label htmlFor="c1" className="team-card">
              <div className="row">
                <div className="icon">1</div>
                <div className="description">
                  <h4>Muhamed Brojka</h4>
                  <p>All-round Marketer</p>
                </div>
              </div>
            </label>
            <input type="radio" name="slide" id="c2" />
            <label htmlFor="c2" className="team-card">
              <div className="row">
                <div className="icon">2</div>
                <div className="description">
                  <h4>Bujar Shehaj</h4>
                  <p>All-round Marketer</p>
                </div>
              </div>
            </label>
            <input type="radio" name="slide" id="c3" />
            <label htmlFor="c3" className="team-card">
              <div className="row">
                <div className="icon">3</div>
                <div className="description">
                  <h4>Enriko Shkurti</h4>
                  <p>Sales Manager</p>
                </div>
              </div>
            </label>
            <input type="radio" name="slide" id="c4" />
            <label htmlFor="c4" className="team-card">
              <div className="row">
                <div className="icon">4</div>
                <div className="description">
                  <h4>Yann Lazarev</h4>
                  <p>Copywriter</p>
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
