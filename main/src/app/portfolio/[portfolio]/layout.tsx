import type { Metadata } from 'next';

// Map portfolio slugs to proper translation keys (or display keys)
const PORTFOLIO_TRANSLATION_KEYS: Record<string, string> = {
  webdesign: 'Web Design',
  socialmedia: 'Social Media',
  branding: 'Branding',
  video: 'Video',
  advertisement: 'Advertisement',
  appdesign: 'App Design',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ portfolio: string }>;
}): Promise<Metadata> {
  const { portfolio } = await params;
  // Use the translation key if available; otherwise, use the raw portfolio slug
  const translationKey =
    PORTFOLIO_TRANSLATION_KEYS[portfolio.toLowerCase()] || portfolio;

  const title = `${translationKey} Portfolio - Synaps`;
  const description = `Explore our ${translationKey} portfolio, showcasing creative projects and designs. Yours could be next on our website ;)!`;

  // Use the image path with the translationKey
  const imageUrl = `/assets/Art for Synaps/Portfolio - ${translationKey}.png`;

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
          alt: `${translationKey} Portfolio`,
        },
      ],
    },
  };
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ portfolio: string }>;
}

export default async function PortfolioLayout({
  children,
  params,
}: LayoutProps) {
  await params;
  return <>{children}</>;
}
