import type { Metadata } from 'next';

// This function generates metadata based on the portfolio slug.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ portfolio: string }>;
}): Promise<Metadata> {
  const { portfolio } = await params;

  // Map URL slugs to proper display names for portfolio pages.
  const PORTFOLIO_DISPLAY_NAMES: Record<string, string> = {
    webdesign: 'Web Design',
    socialmedia: 'Social Media',
    branding: 'Branding',
    video: 'Video',
    advertisement: 'Advertisement',
    appdesign: 'App Design',
  };

  // Use the display name if available; otherwise, fall back to the slug.
  const displayName = PORTFOLIO_DISPLAY_NAMES[portfolio] || portfolio;

  const title = `${displayName} Portfolio - Synaps`;
  const description = `Explore our ${displayName} portfolio, showcasing creative projects and designs. Yours could be next on our website ;)!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/assets/Art for Synaps/Portfolio - ${displayName.toLowerCase()}.png`,
          width: 1200,
          height: 630,
          alt: `${displayName} Portfolio`,
        },
      ],
    },
  };
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ portfolio: string }>;
}

// The layout component simply awaits the dynamic parameters and renders its children.
export default async function PortfolioLayout({
  children,
  params,
}: LayoutProps) {
  await params;
  return <>{children}</>;
}
