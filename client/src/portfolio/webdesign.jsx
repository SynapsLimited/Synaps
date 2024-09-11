import React from 'react';
import { useTranslation } from 'react-i18next';
import PortfolioTemplate from '../templates/PortfolioTemplate';

const WebDesignPortfolio = () => {
  const { t } = useTranslation();
  const portfolioData = t('portfolioPages.webDesignPortfolio', { returnObjects: true });

  return (
    <PortfolioTemplate
      title={portfolioData.title}
      description={portfolioData.description}
      imgSrc="/assets/Art for Synaps/Portfolio - Web Design.png"
      galleryItems={portfolioData.galleryItems}
    />
  );
};

export default WebDesignPortfolio;
