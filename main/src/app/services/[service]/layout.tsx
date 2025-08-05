import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Define service translations for display
const SERVICE_TRANSLATION_DISPLAY: Record<string, string> = {
  webdesign: 'Web Design',
  appdesign: 'App Design',
  socialmedia: 'Social Media',
  branding: 'Branding',
  video: 'Video',
  advertisement: 'Advertisement',
};

/** Generate static parameters for pre-rendering */
export async function generateStaticParams() {
  // Pre-render only allowed service keys with a simulated delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Object.keys(SERVICE_TRANSLATION_DISPLAY).map((key) => ({ service: key }));
}

/** Generate metadata dynamically based on the service parameter */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const normalizedService = service.toLowerCase();

  // Trigger 404 if the service is not recognized
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

/** Define the props interface for the layout component */
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ service: string }>;
}

/** Default layout component for services */
export default async function ServicesLayout({ children, params }: LayoutProps) {
  // Simulate a delay before rendering children
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await params; // Resolve params if needed
  return <>{children}</>;
}