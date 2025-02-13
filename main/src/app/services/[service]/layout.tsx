import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const SERVICE_TRANSLATION_DISPLAY: Record<string, string> = {
  webdesign: 'Web Design',
  appdesign: 'App Design',
  socialmedia: 'Social Media',
  branding: 'Branding',
  video: 'Video',
  advertisement: 'Advertisement',
};

export async function generateStaticParams() {
  // Pre-render only allowed service keys
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Object.keys(SERVICE_TRANSLATION_DISPLAY).map((key) => ({ service: key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const normalizedService = service.toLowerCase();

  // If not an allowed service, trigger 404
  if (!SERVICE_TRANSLATION_DISPLAY[normalizedService]) {
    notFound();
  }
  
  const displayName = SERVICE_TRANSLATION_DISPLAY[normalizedService];
  const title = `${displayName} Services - Synaps`;
  const description = `Discover our comprehensive ${displayName} services, offering innovative solutions and creative strategies to elevate your brand.`;
  const imageUrl = `/assets/Art for Synaps/ServicesImporttance${normalizedService}.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${displayName} Services`,
        },
      ],
    },
  };
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ service: string }>;
}

export default async function ServicesLayout({ children, params }: LayoutProps) {
  // Simulate delay before rendering children
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await params;
  return <>{children}</>;
}
