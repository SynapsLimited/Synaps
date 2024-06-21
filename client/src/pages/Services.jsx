import React, { useEffect } from 'react';
import './../css/services.css'; // Assuming you have a corresponding CSS file for styling
import { Helmet } from 'react-helmet';
import ServicesForm from '../components/ServicesForm';



const Services = () => {
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
        <title>Synaps - Services</title>
      </Helmet>
      <header>
        <div className="container header__container">
          <div className="header__left header-services">
            <h1>Services</h1>
            <p>
              Not sure about what you need? No problem.
              <br />
              Consult with us for free right now!
            </p>
            <a href="contact" className="btn btn-primary">Contact</a>
          </div>
          <div className="header__right" id="spline-container">
            <spline-viewer url="https://prod.spline.design/1VQSYrmiNFt3i0cz/scene.splinecode"></spline-viewer>
          </div>
        </div>
      </header>
      <section className="container services-overview-section">
        <div className="services-overview-title">
      <h1>Overview</h1>
          <p>
          Select one of the services to take a look and get to know what is the fuss about!
          </p>
      </div>

      <div className="services-overview-blobs">
            <a href="services/webdesign" className="service-overview-blob-art">
              <img src="/assets/Art for Synaps/Services - Web Design.png" alt="Web Design" />
              <span>Web Design</span>
            </a>
            <a href="services/socialmedia" className="service-overview-blob-art">
              <img src="/assets/Art for Synaps/Services - Social Media.png" alt="Social Media" />
              <span>Social Media</span>
            </a>
            <a href="services/branding" className="service-overview-blob-art">
              <img src="/assets/Art for Synaps/Services - Branding.png" alt="Branding" />
              <span>Branding</span>
            </a>
            <a href="services/video" className="service-overview-blob-art">
              <img src="/assets/Art for Synaps/Services - Video.png" alt="Video" />
              <span>Video</span>
            </a>
            <a href="services/advertisement" className="service-overview-blob-art">
              <img src="/assets/Art for Synaps/Services - Advertisement.png" alt="Advertisement" />
              <span>Advertisement</span>
            </a>
          </div>
      </section>

      <section className="web-design container specific-service-section">
      <div className="specific-service-container">
        <div className="specific-service-left">
          <h1>Web Design</h1>
          <h5>
            Our web design services are tailored to elevate your online presence with precision and creativity. Whether you're seeking a sleek and streamlined one-pager website, a fully customized digital experience, or a cutting-edge 3D website that immerses your audience, our team of experts is dedicated to bringing your vision to life.
          </h5>
          <img src="/assets/Art for Synaps/Services - Web Design.png" alt="Web Design" />
        </div>
        <div className="specific-service-right">
          <div className="specific-service-text-group">
          <h1>One-pager Website</h1>
          <h1>Customized Website</h1>
          <h1>3D Website</h1>
          </div>
          <a href="services/webdesign" className="btn btn-primary">Services</a>
          <a href="portfolio/webdesign" className="btn btn-secondary">Portfolio</a>
        </div>
      </div>
    </section>

    <section className="social-media container specific-service-section">
      <div className="specific-service-container">
        <div className="specific-service-left">
          <h1>Social Media</h1>
          <h5>
          Social media services are crafted to amplify your brand's voice and impact in the digital sphere. Captivating content creation, strategic social media management, or nurturing community engagement, are all possible with our expertise to elevate your online presence.          </h5>
          <img src="/assets/Art for Synaps/Services - Social Media.png" alt="Web Design" />
        </div>
        <div className="specific-service-right">
          <div className="specific-service-text-group">
          <h1>Content Creation</h1>
          <h1>Social Media Management</h1>
          <h1>Community Management</h1>
          </div>
          <a href="services/socialmedia" className="btn btn-primary">Services</a>
          <a href="portfolio/socialmedia" className="btn btn-secondary">Portfolio</a>
        </div>
      </div>
    </section>

    <section className="branding container specific-service-section">
      <div className="specific-service-container">
        <div className="specific-service-left">
          <h1>Branding</h1>
          <h5>
          From immersive 3D branding experiences to comprehensive full branding packages, as well as bespoke logo and art design, and captivating company presentations, we offer a suite of solutions to step up the game of your brand identity.         
          </h5>
          <img src="/assets/Art for Synaps/Services - Branding.png" alt="Web Design" />
        </div>
        <div className="specific-service-right">
          <div className="specific-service-text-group">
          <h1>3D Branding</h1>
          <h1>Full Branding</h1>
          <h1>Logo and Art</h1>
          <h1>Company Presentation</h1>
          </div>
          <a href="services/branding" className="btn btn-primary">Services</a>
          <a href="portfolio/branding" className="btn btn-secondary">Portfolio</a>
        </div>
      </div>
    </section>

    <section className="video container specific-service-section">
      <div className="specific-service-container">
        <div className="specific-service-left">
          <h1>Video</h1>
          <h5>
          Storytelling and engaging content creation. Whether you're looking to craft eye-catching reels, produce compelling YouTube videos, or create impactful ads, we can do it. With the ability to handle every aspect from shooting and scripting to editing and final production, we'll ensure your videos stand out from the competition.          </h5>
          <img src="/assets/Art for Synaps/Services - Video.png" alt="Web Design" />
        </div>
        <div className="specific-service-right">
          <div className="specific-service-text-group">
          <h1>Reels </h1>
          <h1>Youtube</h1>
          <h1>Ads</h1>
          </div>
          <a href="services/video" className="btn btn-primary">Services</a>
          <a href="portfolio/video" className="btn btn-secondary">Portfolio</a>
        </div>
      </div>
    </section>

    <section className="advertisement container specific-service-section">
      <div className="specific-service-container">
        <div className="specific-service-left">
          <h1>Advertisement</h1>
          <h5>
          Innovative advertising solutions designed to propel your brand to new heights. Our diverse range of advertising services includes digital advertising for online visibility, strategic email marketing to connect with your audience, and impactful physical advertising to make a tangible impression.          </h5>
          <img src="/assets/Art for Synaps/Services - Advertisement.png" alt="Web Design" />
        </div>
        <div className="specific-service-right">
          <div className="specific-service-text-group">
          <h1>Digital Advertising</h1>
          <h1>Email Marketing</h1>
          <h1>Physical Advertising</h1>
          </div>
          <a href="services/advertisement" className="btn btn-primary">Services</a>
          <a href="portfolio/advertisement" className="btn btn-secondary">Portfolio</a>
        </div>
      </div>
    </section>

      <ServicesForm />


    </div>
  );
};

export default Services;
