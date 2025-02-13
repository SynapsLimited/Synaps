import './globals.css';
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
import UserInitializer from './components/userInitializer';

export const metadata = {
  title: {
    
    default: 'Synaps Limited - We are the missing link!',
    template: "%s - Synaps Limited"

  },
  description: 'Explore Synaps and lets work together to solve your business problems!',
  icons: {
    icon: '/assets/Synaps Logos/Synaps Logo Icon.ico',
    shortcut: '/favicon.ico',
    apple: '/assets/Synaps Logos/Synaps Logo Icon.ico',
  },
  openGraph: {
    title: 'Synaps Limited',
    description: 'We are the missing link & the solution to your business problems!',
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
    description: 'The missing link! Synaps is the solution to your business problems!',
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
        {/* Ensure metadata and viewport settings are applied */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <UserProvider>
          <Analytics />
          <ScrollToTop />
          <ClientLoading>
            <ClientWrapper>
              {/* Initialize the user on the client side */}
              <UserInitializer />
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
