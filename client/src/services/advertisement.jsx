import React from 'react';
import { useTranslation } from 'react-i18next';
import ServicesTemplate from '../templates/ServicesTemplate';

const AdvertisementServices = () => {
  const { t } = useTranslation();

  const types = [
    {
      imgSrc: '/assets/Art for Synaps/Services/Digital Advertising.png',
      title: t('advertisementServices.types.digitalAdvertising.title'),
      description: t('advertisementServices.types.digitalAdvertising.description'),
      link: '/portfolio/digital-advertising',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Email Marketing.png',
      title: t('advertisementServices.types.emailMarketing.title'),
      description: t('advertisementServices.types.emailMarketing.description'),
      link: '/portfolio/email-marketing',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Physical Advertising.png',
      title: t('advertisementServices.types.physicalAdvertising.title'),
      description: t('advertisementServices.types.physicalAdvertising.description'),
      link: '/portfolio/physical-advertising',
    },
  ];

  const bundles = [
    {
      name: t('advertisementServices.bundles.conversionBundle.name'),
      description: t('advertisementServices.bundles.conversionBundle.description'),
      imgSrc: '/assets/Bundles/Slide1.png',
    },
    {
      name: t('advertisementServices.bundles.awarenessBundle.name'),
      description: t('advertisementServices.bundles.awarenessBundle.description'),
      imgSrc: '/assets/Bundles/Slide2.png',
    },
    {
      name: t('advertisementServices.bundles.contactBundle.name'),
      description: t('advertisementServices.bundles.contactBundle.description'),
      imgSrc: '/assets/Bundles/Slide3.png',
    },
    {
      name: t('advertisementServices.bundles.announcerBundle.name'),
      description: t('advertisementServices.bundles.announcerBundle.description'),
      imgSrc: '/assets/Bundles/Slide4.png',
    },
    {
      name: t('advertisementServices.bundles.guerrillaBundle.name'),
      description: t('advertisementServices.bundles.guerrillaBundle.description'),
      imgSrc: '/assets/Bundles/Slide5.png',
    },
  ];

  return (
    <ServicesTemplate 
      title={t('advertisementServices.title')}
      description={t('advertisementServices.description')}
      imgSrc="/assets/Art for Synaps/Portfolio - Advertisement.png"
      importanceTitle={t('advertisementServices.importanceTitle')}
      importanceText={t('advertisementServices.importanceText')}
      importanceImgSrc="/assets/Art for Synaps/Services - Advertisement.png"
      types={types}
      bundles={bundles}
    />
  );
};

export default AdvertisementServices;
