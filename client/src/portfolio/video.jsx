import React from 'react';
import { useTranslation } from 'react-i18next';
import PortfolioTemplate from '../templates/PortfolioTemplate';

const VideoPortfolio = () => {
  const { t } = useTranslation();
  const portfolioData = t('portfolioPages.videoPortfolio', { returnObjects: true });

  return (
    <PortfolioTemplate
      title={portfolioData.title}
      description={portfolioData.description}
      imgSrc="/assets/Art for Synaps/Portfolio - Video.png"
      galleryItems={portfolioData.galleryItems}
    />
  );
};

export default VideoPortfolio;
