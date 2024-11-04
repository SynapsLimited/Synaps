import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import './../css/footer.css'; // Ensure this path is correct

function Footer() {
  const { t } = useTranslation(); // Initialize translation

  return (
    <Fragment>
      <div  className="container footer-img">
        <div  className="footer-top">
          <div  className="footer-logo">
            <img src="/assets/Synaps Logos/Synaps Text copy.png" alt="Synaps Text" />
          </div>
          <div  className="footer-logo">
            <img src="/assets/Synaps Logos/Synaps Logo -.png" alt="Synaps Logo" />
          </div>
        </div>
        <div  className="footer-bottom">
          <div  className="footer-column footer-location">
            <h4>{t('footer.locationTitle')}</h4> {/* Translated location title */}
            <a href='https://maps.app.goo.gl/bumqeQ7GmkcZK42F9'>
            <img src="/assets/Icons For Synaps/Main Icons/Europe Map.png"  className="location-img" alt="Europe Map" />
            </a>
            <h5>{t('footer.locationSubtitle')}</h5> {/* Translated subtitle */}
            <div  className="footer-slogan">
              <h4>{t('footer.slogan')}</h4> {/* Translated slogan */}
            </div>
          </div>
          <div  className="footer-column footer-socials">
            <h4>{t('footer.contactTitle')}</h4> {/* Translated contact title */}
            <div  className="socials-container">
                
              <div  className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/email.png" alt="Email" />
                <a href="mailto:info@synapslimited.eu"  className="footer-link">info@synapslimited.eu</a> {/* Email stays the same */}
              </div>
              <div  className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/phone-call.png" alt="Phone Number" />
                <a href="tel:+32456071631"  className="footer-link">+32 45 607 1631</a> {/* Phone number stays the same */}
              </div>
            </div>
          </div>
          <div  className="footer-column footer-socials">
            <h4>{t('footer.socialsTitle')}</h4> {/* Translated socials title */}
            <div  className="socials-container">
            <div  className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/whatsapp.png" alt="WhatsApp" />
                <a href="https://wa.me/message/SU2TIHKYORJHH1"  className="footer-link">WhatsApp</a> {/* WhatsApp stays the same */}
              </div>
              <div  className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/facebook.png" alt="Facebook" />
                <a href="https://www.facebook.com"  className="footer-link">Facebook</a> {/* Facebook stays the same */}
              </div>
              <div  className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/instagram.png" alt="Instagram" />
                <a href="https://www.instagram.com"  className="footer-link">Instagram</a> {/* Instagram stays the same */}
              </div>
              <div  className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/linkedin.png" alt="LinkedIn" />
                <a href="https://www.linkedin.com/company/synaps-marketing"  className="footer-link">LinkedIn</a> {/* LinkedIn stays the same */}
              </div>
              <div  className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/youtube.png" alt="YouTube" />
                <a href="https://www.youtube.com/@synaps-limited"  className="footer-link">YouTube</a> {/* YouTube stays the same */}
              </div>
              <div  className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/TikTok.png" alt="TikTok" />
                <a href="https://www.tiktok.com"  className="footer-link">TikTok</a> {/* TikTok stays the same */}
              </div>
              <div  className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/TwitterX.png" alt="X" />
                <a href="https://www.x.com"  className="footer-link">X</a> {/* YouTube stays the same */}
              </div>
            </div>
          </div>
        </div>
        <div  className="footer-copy">
          <p  className="footer-copy">{t('footer.copyright')}</p> {/* Translated copyright text */}
          <a  className="blog-log-in-btn" href="/privacy-policy">Privacy Policy</a> {/* Translated login button */}
        </div>
      </div>
    </Fragment>
  );
}

export default Footer;
