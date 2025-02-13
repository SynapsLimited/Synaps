import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts - Blog',
  description: 'Explore through all of our posts and filter based on your interests!',
};

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
