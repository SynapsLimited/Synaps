import React from 'react';
import { useTranslation } from 'react-i18next';
import PortfolioTemplate from '../templates/PortfolioTemplate';

const SocialMediaPortfolio = () => {
  const { t } = useTranslation();
  const portfolioData = t('portfolioPages.socialMediaPortfolio', { returnObjects: true });

  return (
    <PortfolioTemplate
      title={portfolioData.title}
      description={portfolioData.description}
      imgSrc="/assets/Art for Synaps/Portfolio - Social Media.png"
      galleryItems={portfolioData.galleryItems}
    />
  );
};

export default SocialMediaPortfolio;
