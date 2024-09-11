import React from 'react';
import { useTranslation } from 'react-i18next';
import PortfolioTemplate from '../templates/PortfolioTemplate';

const BrandingPortfolio = () => {
  const { t } = useTranslation();
  const portfolioData = t('portfolioPages.brandingPortfolio', { returnObjects: true });

  return (
    <PortfolioTemplate
      title={portfolioData.title}
      description={portfolioData.description}
      imgSrc="/assets/Art for Synaps/Portfolio - Branding.png"
      galleryItems={portfolioData.galleryItems}
    />
  );
};

export default BrandingPortfolio;
