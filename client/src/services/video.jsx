import React from 'react';
import { useTranslation } from 'react-i18next';
import ServicesTemplate from '../templates/ServicesTemplate';

const VideoServices = () => {
  const { t } = useTranslation();

  const types = [
    {
      imgSrc: '/assets/Art for Synaps/Services/Reels.png',
      title: t('videoServices.types.reels.title'),
      description: t('videoServices.types.reels.description'),
      link: '/portfolio/reels',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/YouTube.png',
      title: t('videoServices.types.youtube.title'),
      description: t('videoServices.types.youtube.description'),
      link: '/portfolio/youtube',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Ads.png',
      title: t('videoServices.types.ads.title'),
      description: t('videoServices.types.ads.description'),
      link: '/portfolio/ads',
    },
  ];

  const bundles = [
    {
      name: t('videoServices.bundles.editorBundle.name'),
      description: t('videoServices.bundles.editorBundle.description'),
      imgSrc: '/assets/Bundles/Slide1.png',
    },
    {
      name: t('videoServices.bundles.internetBundle.name'),
      description: t('videoServices.bundles.internetBundle.description'),
      imgSrc: '/assets/Bundles/Slide2.png',
    },
    {
      name: t('videoServices.bundles.youtubeBundle.name'),
      description: t('videoServices.bundles.youtubeBundle.description'),
      imgSrc: '/assets/Bundles/Slide3.png',
    },
  ];

  return (
    <ServicesTemplate 
      title={t('videoServices.title')}
      description={t('videoServices.description')}
      imgSrc="/assets/Art for Synaps/Portfolio - Video.png"
      importanceTitle={t('videoServices.importanceTitle')}
      importanceText={t('videoServices.importanceText')}
      importanceImgSrc="/assets/Art for Synaps/Services - Video.png"
      types={types}
      bundles={bundles}
    />
  );
};

export default VideoServices;
