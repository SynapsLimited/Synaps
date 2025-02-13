import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const PORTFOLIO_TRANSLATION_KEYS: Record<string, string> = {
  webdesign: 'Web Design',
  socialmedia: 'Social Media',
  branding: 'Branding',
  video: 'Video',
  advertisement: 'Advertisement',
  appdesign: 'App Design',
};

export async function generateStaticParams() {
  // Pre-render only allowed portfolio keys
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Object.keys(PORTFOLIO_TRANSLATION_KEYS).map((key) => ({ portfolio: key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ portfolio: string }>;
}): Promise<Metadata> {
  const { portfolio } = await params;
  const normalizedPortfolio = portfolio.toLowerCase();

  // If not an allowed portfolio, trigger 404
  if (!PORTFOLIO_TRANSLATION_KEYS[normalizedPortfolio]) {
    notFound();
  }
  
  const translationKey = PORTFOLIO_TRANSLATION_KEYS[normalizedPortfolio];
  const title = `${translationKey} Portfolio - Synaps`;
  const description = `Explore our ${translationKey} portfolio, showcasing creative projects and designs. Yours could be next on our website ;)!`;
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

export default async function PortfolioLayout({ children, params }: LayoutProps) {
  // Simulate delay before rendering children
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await params;
  return <>{children}</>;
}
