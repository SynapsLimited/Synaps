import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import './../css/footer.css'; // Ensure this path is correct

function Footer() {
  const { t } = useTranslation(); // Initialize translation

  return (
    <Fragment>
      <div data-aos="fade-up" className="container footer-img">
        <div data-aos="fade-up" className="footer-top">
          <div data-aos="fade-up" className="footer-logo">
            <img src="/assets/Synaps Logos/Synaps Text copy.png" alt="Synaps Text" />
          </div>
          <div data-aos="fade-up" className="footer-logo">
            <img src="/assets/Synaps Logos/Synaps Logo -.png" alt="Synaps Logo" />
          </div>
        </div>
        <div data-aos="fade-up" className="footer-bottom">
          <div data-aos="fade-up" className="footer-column footer-location">
            <h4>{t('footer.locationTitle')}</h4> {/* Translated location title */}
            <a href='https://maps.app.goo.gl/bumqeQ7GmkcZK42F9'>
            <img src="/assets/Icons For Synaps/Main Icons/Europe Map.png" data-aos="fade-up" className="location-img" alt="Europe Map" />
            </a>
            <h5>{t('footer.locationSubtitle')}</h5> {/* Translated subtitle */}
            <div data-aos="fade-up" className="footer-slogan">
              <h4>{t('footer.slogan')}</h4> {/* Translated slogan */}
            </div>
          </div>
          <div data-aos="fade-up" className="footer-column footer-socials">
            <h4>{t('footer.contactTitle')}</h4> {/* Translated contact title */}
            <div data-aos="fade-up" className="socials-container">
              <div data-aos="fade-up" className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/email.png" alt="Email" />
                <a href="mailto:info@synapslimited.eu" data-aos="fade-up" className="footer-link">info@synapslimited.eu</a> {/* Email stays the same */}
              </div>
              <div data-aos="fade-up" className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/phone-call.png" alt="Phone Number" />
                <a href="tel:+32456071631" data-aos="fade-up" className="footer-link">+32 45 607 1631</a> {/* Phone number stays the same */}
              </div>
            </div>
          </div>
          <div data-aos="fade-up" className="footer-column footer-socials">
            <h4>{t('footer.socialsTitle')}</h4> {/* Translated socials title */}
            <div data-aos="fade-up" className="socials-container">
              <div data-aos="fade-up" className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/facebook.png" alt="Facebook" />
                <a href="https://www.facebook.com" data-aos="fade-up" className="footer-link">Facebook</a> {/* Facebook stays the same */}
              </div>
              <div data-aos="fade-up" className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/instagram.png" alt="Instagram" />
                <a href="https://www.instagram.com" data-aos="fade-up" className="footer-link">Instagram</a> {/* Instagram stays the same */}
              </div>
              <div data-aos="fade-up" className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/linkedin.png" alt="LinkedIn" />
                <a href="https://www.linkedin.com" data-aos="fade-up" className="footer-link">LinkedIn</a> {/* LinkedIn stays the same */}
              </div>
              <div data-aos="fade-up" className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/youtube.png" alt="YouTube" />
                <a href="https://www.youtube.com" data-aos="fade-up" className="footer-link">YouTube</a> {/* YouTube stays the same */}
              </div>
              <div data-aos="fade-up" className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/TikTok.png" alt="TikTok" />
                <a href="https://www.tiktok.com" data-aos="fade-up" className="footer-link">TikTok</a> {/* TikTok stays the same */}
              </div>
              <div data-aos="fade-up" className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/TwitterX.png" alt="X" />
                <a href="https://www.x.com" data-aos="fade-up" className="footer-link">X</a> {/* YouTube stays the same */}
              </div>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" className="footer-copy">
          <p data-aos="fade-up" className="footer-copy">{t('footer.copyright')}</p> {/* Translated copyright text */}
          <a data-aos="fade-up" className="blog-log-in-btn" href="/login">{t('footer.logIn')}</a> {/* Translated login button */}
        </div>
      </div>
    </Fragment>
  );
}

export default Footer;
