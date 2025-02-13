import type { Metadata } from 'next';

// Map service slugs to display names for metadata
const SERVICE_TRANSLATION_DISPLAY: Record<string, string> = {
  webdesign: 'Web Design',
  appdesign: 'App Design',
  socialmedia: 'Social Media',
  branding: 'Branding',
  video: 'Video',
  advertisement: 'Advertisement',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  // Look up a friendly display name (fallback to the raw service)
  const displayName =
    SERVICE_TRANSLATION_DISPLAY[service.toLowerCase()] || service;

  const title = `${displayName} Services - Synaps`;
  const description = `Discover our comprehensive ${displayName} services, offering innovative solutions and creative strategies to elevate your brand.`;

  // Use the importance image from the services page
  const imageUrl = `/assets/Art for Synaps/ServicesImporttance${service.toLowerCase()}.png`;

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

export default async function ServicesLayout({
  children,
  params,
}: LayoutProps) {
  // Await the params to ensure type consistency (or use the resolved value if needed)
  await params;
  return <>{children}</>;
}
