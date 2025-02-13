'use client';

import { useTranslation } from 'react-i18next';
import ServicesTemplate from '@/app/components/ServicesTemplate';
import { use } from 'react';


// Define interfaces for the data structure
interface ServiceType {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
}

interface Bundle {
  name: string;
  description: string;
  imgSrc: string;
}

interface ServiceData {
  types: ServiceType[];
  bundles: Bundle[];
}

interface ServiceDataMap {
  [key: string]: ServiceData;
}

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
  
  const serviceData: ServiceDataMap = {
    advertisement: {
        types: [
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
          ],
        
          bundles: [
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
          ],
    },
    webDesign: {
        types: [
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
          ],
        
          bundles: [
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
          ],
    },


    socialMedia: {
        types: [
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
          ],
        
          bundles: [
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
          ],

    },


    appDesign: {

        types: [
            {
              imgSrc: '/assets/Art for Synaps/Services/Customized Website.png',
              title: t('appDesignServices.types.uiUxDesign.title'),
              description: t('appDesignServices.types.uiUxDesign.description'),
              link: '/portfolio/uiuxdesign',
            },
            {
              imgSrc: '/assets/Art for Synaps/Services/One-Pager Website.png',
              title: t('appDesignServices.types.nativeAppDevelopment.title'),
              description: t('appDesignServices.types.nativeAppDevelopment.description'),
              link: '/portfolio/nativeappdevelopment',
            },
            {
              imgSrc: '/assets/Art for Synaps/Services/One-Pager Website.png',
              title: t('appDesignServices.types.crossPlatformDevelopment.title'),
              description: t('appDesignServices.types.crossPlatformDevelopment.description'),
              link: '/portfolio/crossplatformdevelopment',
            },
          ],
        
          bundles: [
            {
              name: t('appDesignServices.bundles.androidBundle.name'),
              description: t('appDesignServices.bundles.androidBundle.description'),
              imgSrc: '/assets/Bundles/Slide1.png',
            },
            {
              name: t('appDesignServices.bundles.iosBundle.name'),
              description: t('appDesignServices.bundles.iosBundle.description'),
              imgSrc: '/assets/Bundles/Slide2.png',
            },
            {
              name: t('appDesignServices.bundles.allPlatformsBundle.name'),
              description: t('appDesignServices.bundles.allPlatformsBundle.description'),
              imgSrc: '/assets/Bundles/Slide2.png',
            },
            {
              name: t('appDesignServices.bundles.enterpriseBundle.name'),
              description: t('appDesignServices.bundles.enterpriseBundle.description'),
              imgSrc: '/assets/Bundles/Slide3.png',
            },
            {
              name: t('appDesignServices.bundles.startupBundle.name'),
              description: t('appDesignServices.bundles.startupBundle.description'),
              imgSrc: '/assets/Bundles/Slide4.png',
            }
          ],

    
    },

    branding: {

        types: [
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
          ],
        
          bundles: [
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
          ],

    },

    video: {

        types: [
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
          ],
        
          bundles: [
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
          ],

    },

    
    // ... other services
  };

  // Get the correct service key for accessing the data
  const serviceKey = Object.keys(serviceData).find(
    key => key.toLowerCase() === translationKey.toLowerCase()
  );

  // Provide default empty arrays if service is not found
  const currentService: ServiceData = serviceKey 
    ? serviceData[serviceKey]
    : { types: [], bundles: [] };

  return (
    <ServicesTemplate 
      title={t(`${translationKey}Services.title`)}
      description={t(`${translationKey}Services.description`)}
      imgSrc={`/assets/Art for Synaps/Portfolio - ${unwrappedParams.service}.png`}
      importanceTitle={t(`${translationKey}Services.importanceTitle`)}
      importanceText={t(`${translationKey}Services.importanceText`)}
      importanceImgSrc={`/assets/Art for Synaps/ServicesImporttance${unwrappedParams.service}.png`}
      types={currentService.types}
      bundles={currentService.bundles}
    />
  );
};

export default ServicePage;