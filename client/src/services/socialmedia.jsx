import React from 'react';
import { useTranslation } from 'react-i18next';
import ServicesTemplate from '../templates/ServicesTemplate';

const SocialMediaServices = () => {
  const { t } = useTranslation();

  const types = [
    {
      imgSrc: '/assets/Art for Synaps/Services/Content Creation.png',
      title: t('socialMediaServices.types.contentCreation.title'),
      description: t('socialMediaServices.types.contentCreation.description'),
      link: '/portfolio/content-creation',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Social Media Management.png',
      title: t('socialMediaServices.types.socialMediaManagement.title'),
      description: t('socialMediaServices.types.socialMediaManagement.description'),
      link: '/portfolio/social-media-management',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Community Management.png',
      title: t('socialMediaServices.types.communityManagement.title'),
      description: t('socialMediaServices.types.communityManagement.description'),
      link: '/portfolio/community-management',
    },
  ];

  const bundles = [
    {
      name: t('socialMediaServices.bundles.basicBundle.name'),
      description: t('socialMediaServices.bundles.basicBundle.description'),
      imgSrc: '/assets/Bundles/Slide1.png',
    },
    {
      name: t('socialMediaServices.bundles.trendBundle.name'),
      description: t('socialMediaServices.bundles.trendBundle.description'),
      imgSrc: '/assets/Bundles/Slide2.png',
    },
    {
      name: t('socialMediaServices.bundles.influentialBundle.name'),
      description: t('socialMediaServices.bundles.influentialBundle.description'),
      imgSrc: '/assets/Bundles/Slide3.png',
    },
    {
      name: t('socialMediaServices.bundles.professionalBundle.name'),
      description: t('socialMediaServices.bundles.professionalBundle.description'),
      imgSrc: '/assets/Bundles/Slide4.png',
    },
    {
      name: t('socialMediaServices.bundles.communityBundle.name'),
      description: t('socialMediaServices.bundles.communityBundle.description'),
      imgSrc: '/assets/Bundles/Slide5.png',
    },
    {
      name: t('socialMediaServices.bundles.proMaxSocialBundle.name'),
      description: t('socialMediaServices.bundles.proMaxSocialBundle.description'),
      imgSrc: '/assets/Bundles/Slide6.png',
    },
  ];

  return (
    <ServicesTemplate 
      title={t('socialMediaServices.title')}
      description={t('socialMediaServices.description')}
      imgSrc="/assets/Art for Synaps/Portfolio - Social Media.png"
      importanceTitle={t('socialMediaServices.importanceTitle')}
      importanceText={t('socialMediaServices.importanceText')}
      importanceImgSrc="/assets/Art for Synaps/Services - Social Media.png"
      types={types}
      bundles={bundles}
    />
  );
};

export default SocialMediaServices;
