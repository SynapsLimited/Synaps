// src/app/components/ClientWrapper.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import I18nProvider from './i18nProvider'; // Ensure this component exists
import SEO from './SEO'; // Ensure this component exists

interface ClientWrapperProps {
  children: ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // Define supported locales, excluding 'en' as it's the default
  const supportedLocales = ['fr', 'nl', 'it', 'de', 'es'];

  // Extract the first path segment to determine if it's a locale
  const pathSegments = pathname.split('/');
  const potentialLocale = pathSegments[1];
  const isLocaleSupported = supportedLocales.includes(potentialLocale);

  useEffect(() => {
    // Function to handle redirection based on detected language
    const handleRedirection = () => {
      const detectedLng = navigator.language.split('-')[0];
      const fallbackLng = 'en';
      const newLocale = supportedLocales.includes(detectedLng) ? detectedLng : fallbackLng;

      if (newLocale !== 'en') {
        // Redirect to the path with the new locale prefix
        router.replace(`/${newLocale}${pathname}`);
      }
      // If 'en', do not add a locale prefix; assume default locale
      // No action needed since 'en' does not require a URL prefix
    };

    // Only perform redirection if:
    // 1. The user is accessing the root path '/'
    // 2. There is no locale prefix present
    if (pathname === '/') {
      const detectedLng = navigator.language.split('-')[0];
      const fallbackLng = 'en';
      const newLocale = supportedLocales.includes(detectedLng) ? detectedLng : fallbackLng;

      if (newLocale !== 'en') {
        router.replace(`/${newLocale}`);
        return; // Exit early to prevent further execution
      }
      // If 'en', stay on the root path '/'
    }

    // If the first path segment is a supported locale, proceed without redirection
    // If it's not a supported locale and not the root path, assume 'en' and proceed
  }, [isLocaleSupported, pathname, router]);

  // Function to determine background class based on pathname
  const getBackgroundClass = (currentPath: string) => {
    let pathWithoutLocale = currentPath;

    if (isLocaleSupported) {
      // Remove locale prefix from pathname if present
      pathWithoutLocale = currentPath.replace(`/${potentialLocale}`, '') || '/';
    }

    switch (pathWithoutLocale) {
      case '/':
        return 'homepage-background';
      case '/about':
        return 'about-background';
      case '/services':
        return 'services-background';
      case '/portfolio':
      case '/services/webdesign':
      case '/services/appdesign':
      case '/services/socialmedia':
      case '/services/branding':
      case '/services/video':
      case '/services/advertisement':
        return 'other-background';
      case '/blog':
        return 'blog-background';
      case '/contact':
      case '/portfolio/webdesign':
      case '/portfolio/appdesign':
      case '/portfolio/socialmedia':
      case '/portfolio/branding':
      case '/portfolio/video':
      case '/portfolio/advertisement':
        return 'contact-background';
      default:
        return 'other-background';
    }
  };

  return (
    <I18nProvider>
      <SEO /> {/* Include the SEO component here */}
      <div className={getBackgroundClass(pathname)}>
        {children}
      </div>
    </I18nProvider>
  );
};

export default ClientWrapper;
