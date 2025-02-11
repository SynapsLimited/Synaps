'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
}

const supportedLocales = ['en', 'fr', 'nl', 'it', 'de', 'es'];
const domain = 'https://synapslimited.eu';

// Removes *any* leading /en, /fr, etc. from the path
function removeLocaleFromPath(path: string) {
  const segments = path.split('/');
  if (segments.length > 1 && supportedLocales.includes(segments[1])) {
    // Remove that first segment
    segments.splice(1, 1);
  }
  const newPath = segments.join('/');
  return newPath === '' ? '/' : newPath;
}

export default function SEO({ title, description }: SEOProps) {
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const [clientPath, setClientPath] = useState('');

  // Store path in state so that re-renders happen after route changes
  useEffect(() => {
    if (pathname) {
      setClientPath(pathname);
    }
  }, [pathname]);

  // Generate <link rel="alternate"> for each locale
  const generateHrefLangLinks = () => {
    const basePath = removeLocaleFromPath(clientPath); // remove /en, /fr, etc.

    return supportedLocales.map((locale) => {
      let href;
      if (locale === 'en') {
        // Default locale has NO prefix
        href = `${domain}${basePath}`;
      } else {
        // Other locales: /fr, /de, etc.
        href = `${domain}/${locale}${basePath}`;
      }
      return <link key={locale} rel="alternate" hrefLang={locale} href={href} />;
    });
  };

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {generateHrefLangLinks()}

      {/* x-default can point to the default locale (English) path */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${domain}${removeLocaleFromPath(clientPath)}`}
      />
    </Head>
  );
}
