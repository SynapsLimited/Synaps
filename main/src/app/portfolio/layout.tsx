import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore and Discover some of our best creative works regarding web & app designing, social media, branding & video solutions, and advertisement reachs.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
