// src/app/layout.tsx
import './globals.css'; // Import global CSS
import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LogoShowcase from './components/LogoShowcase';
import FixedMenu from './components/FixedMenu';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import { UserProvider } from '../context/userContext';
import ClientLoading from './components/ClientLoading';
import ClientWrapper from './components/ClientWrapper';

export const metadata = {
  title: 'Synaps Limited - We are the missing link!',
  description: 'Synaps Limited - The solution to your business problems!',
  icons: {
    icon: '/assets/Synaps Logos/Synaps Logo Icon.ico',
    shortcut: '/favicon.ico',
    apple: '/assets/Synaps Logos/Synaps Logo Icon.ico',
  },
  openGraph: {
    title: 'Synaps Limited',
    description: 'The solution to your business problems!',
    url: 'https://www.synapslimited.eu',
    type: 'website',
    images: [
      {
        url: 'https://www.synapslimited.eu/assets/Synaps-Meta.png',
        width: 1200,
        height: 630,
        alt: 'Synaps Limited',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synaps Limited',
    description: 'The solution to your business problems!',
    images: ['https://www.synapslimited.eu/assets/Synaps-Meta.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Ensure metadata and viewport are correctly applied */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <UserProvider>
          <Analytics />
          <ScrollToTop />
          <ClientLoading>
            <ClientWrapper>
              <Navbar />
              {children}
              <FixedMenu />
              <LogoShowcase />
              <Footer />
            </ClientWrapper>
          </ClientLoading>
          <CookieConsent />
        </UserProvider>
      </body>
    </html>
  );
}
