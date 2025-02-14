// components/ConditionalAnalytics.tsx
'use client'
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Cookies from 'js-cookie';

const ConditionalAnalytics = () => {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get('synapsCookieConsent');
    if (cookieConsent === 'true') {
      setConsent(true);
    }
  }, []);

  return consent ? <Analytics /> : null;
};

export default ConditionalAnalytics;
