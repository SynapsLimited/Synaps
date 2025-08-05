'use client';

import { useTranslation } from 'react-i18next';
import ServicesTemplate from '@/app/components/ServicesTemplate';
import { use } from 'react';
import { servicesData } from '@/data/services';

// Map URL slugs to proper translation keys
const SERVICE_TRANSLATION_KEYS: Record<string, string> = {
  'webdesign': 'webDesign',
  'appdesign': 'appDesign',
  'socialmedia': 'socialMedia',
  'branding': 'branding',
  'video': 'video',
  'advertisement': 'advertisement'
};

const ServicePage = ({ params }: { params: Promise<{ service: string }> }) => {
  const unwrappedParams = use(params); // Unwrap the params Promise
  const { t } = useTranslation();
  
  // Get the proper translation key for the service
  const translationKey = SERVICE_TRANSLATION_KEYS[unwrappedParams.service] || unwrappedParams.service;
  
  // Get the services for the current service category
  const currentServices = servicesData[unwrappedParams.service] || [];

  return (
    <ServicesTemplate 
      title={t(`${translationKey}Services.title`)}
      description={t(`${translationKey}Services.description`)}
      imgSrc={`/assets/Art for Synaps/Portfolio - ${unwrappedParams.service}.png`}
      services={currentServices}
    />
  );
};

export default ServicePage;