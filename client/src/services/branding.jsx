import React from 'react';
import { useTranslation } from 'react-i18next';
import ServicesTemplate from '../templates/ServicesTemplate';

const BrandingServices = () => {
  const { t } = useTranslation();

  const types = [
    {
      imgSrc: '/assets/Art for Synaps/Services/Logo & Art.png',
      title: t('brandingServices.types.logoAndArt.title'),
      description: t('brandingServices.types.logoAndArt.description'),
      link: '/portfolio/logo-and-art',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Full Branding.png',
      title: t('brandingServices.types.fullBranding.title'),
      description: t('brandingServices.types.fullBranding.description'),
      link: '/portfolio/full-branding',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/3D Branding.png',
      title: t('brandingServices.types.threeDBranding.title'),
      description: t('brandingServices.types.threeDBranding.description'),
      link: '/portfolio/3d-branding',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Company Presentation.png',
      title: t('brandingServices.types.companyPresentation.title'),
      description: t('brandingServices.types.companyPresentation.description'),
      link: '/portfolio/company-presentation',
    },
  ];

  const bundles = [
    {
      name: t('brandingServices.bundles.logoBundle.name'),
      description: t('brandingServices.bundles.logoBundle.description'),
      imgSrc: '/assets/Bundles/Slide1.png',
    },
    {
      name: t('brandingServices.bundles.brandIdentityBundle.name'),
      description: t('brandingServices.bundles.brandIdentityBundle.description'),
      imgSrc: '/assets/Bundles/Slide2.png',
    },
    {
      name: t('brandingServices.bundles.brandArtBundle.name'),
      description: t('brandingServices.bundles.brandArtBundle.description'),
      imgSrc: '/assets/Bundles/Slide3.png',
    },
    {
      name: t('brandingServices.bundles.cyberBrandingBundle.name'),
      description: t('brandingServices.bundles.cyberBrandingBundle.description'),
      imgSrc: '/assets/Bundles/Slide4.png',
    },
  ];

  return (
    <ServicesTemplate 
      title={t('brandingServices.title')}
      description={t('brandingServices.description')}
      imgSrc="/assets/Art for Synaps/Portfolio - Branding.png"
      importanceTitle={t('brandingServices.importanceTitle')}
      importanceText={t('brandingServices.importanceText')}
      importanceImgSrc="/assets/Art for Synaps/Services - Branding.png"
      types={types}
      bundles={bundles}
    />
  );
};

export default BrandingServices;
