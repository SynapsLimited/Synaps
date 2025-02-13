import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'If you are ready then give it a try! The consult is free and so is conversating with us for a better future and greater success.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
