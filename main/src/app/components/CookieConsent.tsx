// components/CookieConsent.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import './../css/cookieconsent.css';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('synapsCookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('synapsCookieConsent', 'true', { expires: 365 });
    setShowConsent(false);
    // Optional: reload to trigger any consent‑dependent logic
    // window.location.reload();
  };

  const declineCookies = () => {
    Cookies.set('synapsCookieConsent', 'false', { expires: 365 });
    setShowConsent(false);
    // Add any additional logic to disable services if needed
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="cookie-consent">
      <div className="cookie-consent__content">
        <p>
          We use cookies to enhance your experience on our website. By continuing to browse this site, you agree to our use of cookies.
          <Link href="/privacypolicy" className="cookie-consent__link">Learn more</Link>
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
