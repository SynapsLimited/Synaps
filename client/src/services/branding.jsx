import React from 'react';
import ServicesTemplate from '../templates/ServicesTemplate';

const BrandingServices = () => {
  const types = [
    {
      imgSrc: '/assets/Art for Synaps/Services/Logo & Art.png',
      title: 'Logo and Art',
      description: 'The logo is the most important element when it comes to Branding as it is the face of the enterprise. We provide services that will create your Logo, Logo Art, Logo Text and Main Logo. Main Logo 2D and 3D are useful and important to visualize your logo and to use it on your website, social media, advertisements, etc.',
      link: '/portfolio/logo-and-art',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Full Branding.png',
      title: 'Full Branding',
      description: 'Full branding includes branding starting from the logo, background, main colors, types of fonts, style flows, etc. Full Branding is to create your brand in all of its elements. Full Branding creates the Full Personality of the company.',
      link: '/portfolio/full-branding',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/3D Branding.png',
      title: '3D Branding',
      description: '3D Branding is the most visualizing type of branding that can be done since it can be applied at every dimension. This can allow your different products to be advertised or displayed on your interactive website, social media, or even videos.',
      link: '/portfolio/3d-branding',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Company Presentation.png',
      title: 'Company Presentation',
      description: 'Company presentations are multiple pages in a presentation that can help your different slides represent every part of your theme, and used to pitch your company or present something else. These presentations can be shown at different locations or applied to specific situations as well as creating a good look.',
      link: '/portfolio/company-presentation',
    },
  ];

  const bundles = [
    {
      name: 'Logo Bundle',
      description: 'Logo',
      imgSrc: '/assets/Bundles/Slide1.png',
    },
    {
      name: 'Brand Identity Bundle',
      description: 'Logo, Colors, Fonts, Design Flows',
      imgSrc: '/assets/Bundles/Slide2.png',
    },
    {
      name: 'Brand Art Bundle',
      description: 'Brand Identity & 2D Art',
      imgSrc: '/assets/Bundles/Slide3.png',
    },
    {
      name: 'CyberBranding Bundle',
      description: 'Full Branding & Website',
      imgSrc: '/assets/Bundles/Slide4.png',
    },
  ];

  return (
    <ServicesTemplate 
      title="Branding" 
      description="Discover our top-notch branding services that cater to all your needs!"
      imgSrc="/assets/Art for Synaps/Portfolio - Branding.png"
      importanceTitle="Branding"
      importanceText="Synaps provides different types of branding for your company. Logo and art to create the main face of your company or a full branding to create your full brand personality. Extra branding elements like 3D branding that helps your company identify itself or a company presentation that allows you to present or pitch your company are also useful options when it comes to Branding."
      importanceImgSrc="/assets/Art for Synaps/Services - Branding.png"
      types={types}
      bundles={bundles}
    />
  );
};

export default BrandingServices;
