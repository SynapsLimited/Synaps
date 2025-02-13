import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'News from us and the world. Technology and marketing trends are our cup of tea. We are ready to keep you updated, tell our opinion, or even our own stories.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
