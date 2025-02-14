// app/layout.tsx (or wherever your RootLayout is defined)
import './globals.css';
import { ReactNode } from 'react';
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
import ConditionalAnalytics from './components/ConditionalAnalytics';

export const metadata = {
  title: {
    default: 'Synaps Limited - We are the missing link!',
    template: "%s - Synaps Limited"
  },
  description: 'Explore Synaps and lets work together to solve your business problems!',
  keywords: [
    'Synaps', 'Marketing', 'Marketing Outsource', 'Outsource', 'Web Design',
    'Web Development', 'App Design', 'App Development', 'Social Media',
    'Social Media Management','Branding', 'Video Editing', 'Marketing Strategy',
    'Advertiement', 'Physical Advertising', 'Europe', 'EU', 'European Union',
    'Saudi Arabia', 'UAE', 'United Arab Emirates', 'Qatar', 'USA',
    'United States of America', 'Canada'
  ],
  icons: {
    icon: '/assets/Synaps Logos/Synaps Logo Icon.ico',
    shortcut: '/favicon.ico',
    apple: '/assets/Synaps Logos/Synaps Logo Icon.ico',
  },
  openGraph: {
    title: 'Synaps Limited - We are the missing link',
    description: 'Reach new goals, more audience, and bigger success with Synaps. We can find and solve your company problems. Still waiting? Contact Now!',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <UserProvider>
          <ConditionalAnalytics />
          <ScrollToTop />
          <ClientLoading>
            <ClientWrapper>
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
