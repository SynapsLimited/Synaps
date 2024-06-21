import React, { Fragment } from 'react';
import './../css/footer.css'; // Ensure this path is correct

function Footer() {
  return (
    <Fragment>
      <div className="container footer-img">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/assets/Synaps Logos/Synaps Text copy.png" alt="Synaps Text" />
          </div>
          <div className="footer-logo">
            <img src="/assets/Synaps Logos/Synaps Logo -.png" alt="Synaps Logo" />
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-column footer-location">
            <h4>Location</h4>
            <img src="/assets/Icons For Synaps/Main Icons/Europe Map.png" className="location-img" alt="Europe Map" />
            <h5>AND BEYOND!</h5>
            <div className="footer-slogan">
              <h4>We are the missing link</h4>
            </div>
          </div>
          <div className="footer-column footer-socials">
            <h4>Contact</h4>
            <div className="socials-container">
              <div className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/email.png" alt="Email" />
                <a href="mailto:info@synaps.eu" className="footer-link">info@synaps.eu</a>
              </div>
              <div className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/phone-call.png" alt="Phone Number" />
                <a href="tel:+3210202020" className="footer-link">+3210202020</a>
              </div>
            </div>
          </div>
          <div className="footer-column footer-socials">
            <h4>Socials</h4>
            <div className="socials-container">
              <div className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/facebook.png" alt="Facebook" />
                <a href="https://www.facebook.com" className="footer-link">Facebook</a>
              </div>
              <div className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/instagram.png" alt="Instagram" />
                <a href="https://www.instagram.com" className="footer-link">Instagram</a>
              </div>
              <div className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/linkedin.png" alt="LinkedIn" />
                <a href="https://www.linkedin.com" className="footer-link">LinkedIn</a>
              </div>
              <div className="social-row">
                <img src="/assets/Icons For Synaps/Main Icons/youtube.png" alt="YouTube" />
                <a href="https://www.youtube.com" className="footer-link">YouTube</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copy">
          <p className="footer-copy">Copyright &copy; Synaps. All Rights Reserved</p>
          <a className="blog-log-in-btn" href="/login">Log In</a>
        </div>
      </div>
    </Fragment>
  );
}

export default Footer;
