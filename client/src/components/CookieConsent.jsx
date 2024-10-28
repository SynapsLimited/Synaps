import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../css/cookieconsent.css';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('synapsCookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('synapsCookieConsent', 'true');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('synapsCookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="cookie-consent">
      <div className="cookie-consent__content">
        <p>
          We use cookies to enhance your experience on our website. By continuing to browse this site, you agree to our use of cookies.
          <Link to="/privacy-policy" className="cookie-consent__link">Learn more</Link>
        </p>
        <div className="cookie-consent__buttons">
          <button className="btn btn-primary accept" onClick={acceptCookies}>
            Accept
          </button>
          <button className="btn btn-secondary decline" onClick={declineCookies}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
