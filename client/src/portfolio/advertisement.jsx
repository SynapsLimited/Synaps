import React from 'react';
import { useTranslation } from 'react-i18next';
import PortfolioTemplate from '../templates/PortfolioTemplate';

const AdvertisementPortfolio = () => {
  const { t } = useTranslation();
  const portfolioData = t('portfolioPages.advertisementPortfolio', { returnObjects: true });

  return (
    <PortfolioTemplate
      title={portfolioData.title}
      description={portfolioData.description}
      imgSrc="/assets/Art for Synaps/Portfolio - Advertisement.png"
      galleryItems={portfolioData.galleryItems}
    />
  );
};

export default AdvertisementPortfolio;
