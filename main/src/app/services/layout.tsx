import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Dive into our services and explore the potential solutions and bundles Synaps provides!',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
