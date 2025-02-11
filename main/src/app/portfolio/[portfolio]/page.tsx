'use client';

import { useTranslation } from 'react-i18next';
import PortfolioTemplate from '@/app/components/PortfolioTemplate';
import { use } from 'react';

interface PortfolioData {
  title: string;
  description: string;
  galleryItems: Array<{ imgSrc: string; alt: string; title: string; description: string; link: string }>;
}

const PortfolioPage = ({ params }: { params: Promise<{ portfolio: string }> }) => {
  // Unwrap the params Promise
  const unwrappedParams = use(params);
  const { t } = useTranslation();

  // Map URL slugs to proper translation keys for portfolio pages
  const PORTFOLIO_TRANSLATION_KEYS: Record<string, string> = {
    'webdesign': 'webDesign',
    'socialmedia': 'socialMedia',
    'branding': 'branding',
    'video': 'video',
    'advertisement': 'advertisement',
    'appdesign': 'appDesign'
  };

  const translationKey = PORTFOLIO_TRANSLATION_KEYS[unwrappedParams.portfolio] || unwrappedParams.portfolio;

  // Retrieve the portfolio data from translations
  // Casting to PortfolioData fixes the TypeScript error about missing properties.
  const portfolioData = t(`portfolioPages.${translationKey}Portfolio`, { returnObjects: true }) as PortfolioData;

  return (
    <PortfolioTemplate
      title={portfolioData.title}
      description={portfolioData.description}
      imgSrc={`/assets/Art for Synaps/Portfolio - ${translationKey}.png`}
      galleryItems={portfolioData.galleryItems}
    />
  );
};

export default PortfolioPage;
