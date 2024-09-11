import React from 'react';
import { useTranslation } from 'react-i18next';
import ServicesTemplate from '../templates/ServicesTemplate';

const WebDesignServices = () => {
  const { t } = useTranslation();

  const types = [
    {
      imgSrc: '/assets/Art for Synaps/Services/3D Websites.png',
      title: t('webDesignServices.types.threeDWebsites.title'),
      description: t('webDesignServices.types.threeDWebsites.description'),
      link: '/portfolio/3d-websites',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Customized Website.png',
      title: t('webDesignServices.types.customizedWebsites.title'),
      description: t('webDesignServices.types.customizedWebsites.description'),
      link: '/portfolio/customized-websites',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/One-Pager Website.png',
      title: t('webDesignServices.types.onePagerWebsites.title'),
      description: t('webDesignServices.types.onePagerWebsites.description'),
      link: '/portfolio/one-pager-websites',
    },
  ];

  const bundles = [
    {
      name: t('webDesignServices.bundles.simpleBundle.name'),
      description: t('webDesignServices.bundles.simpleBundle.description'),
      imgSrc: '/assets/Bundles/Slide1.png',
    },
    {
      name: t('webDesignServices.bundles.bloggerBundle.name'),
      description: t('webDesignServices.bundles.bloggerBundle.description'),
      imgSrc: '/assets/Bundles/Slide2.png',
    },
    {
      name: t('webDesignServices.bundles.shopperBundle.name'),
      description: t('webDesignServices.bundles.shopperBundle.description'),
      imgSrc: '/assets/Bundles/Slide2.png',
    },
    {
      name: t('webDesignServices.bundles.originalBundle.name'),
      description: t('webDesignServices.bundles.originalBundle.description'),
      imgSrc: '/assets/Bundles/Slide3.png',
    },
    {
      name: t('webDesignServices.bundles.authenticBundle.name'),
      description: t('webDesignServices.bundles.authenticBundle.description'),
      imgSrc: '/assets/Bundles/Slide4.png',
    },
    {
      name: t('webDesignServices.bundles.proPerformanceBundle.name'),
      description: t('webDesignServices.bundles.proPerformanceBundle.description'),
      imgSrc: '/assets/Bundles/Slide5.png',
    },
    {
      name: t('webDesignServices.bundles.proMaxPerformanceBundle.name'),
      description: t('webDesignServices.bundles.proMaxPerformanceBundle.description'),
      imgSrc: '/assets/Bundles/Slide6.png',
    },
  ];

  return (
    <ServicesTemplate 
      title={t('webDesignServices.title')}
      description={t('webDesignServices.description')}
      imgSrc="/assets/Art for Synaps/Portfolio - Web Design.png"
      importanceTitle={t('webDesignServices.importanceTitle')}
      importanceText={t('webDesignServices.importanceText')}
      importanceImgSrc="/assets/Art for Synaps/Services - Web Design.png"
      types={types}
      bundles={bundles}
    />
  );
};

export default WebDesignServices;
