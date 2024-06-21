import React from 'react';
import ServicesTemplate from '../templates/ServicesTemplate';

const SocialMediaServices = () => {
  const types = [
    {
      imgSrc: '/assets/Art for Synaps/Services/Content Creation.png',
      title: 'Content Creation',
      description: 'Synaps offers different types of content creation for social media. Starting from the creation of templates to keep the company profile up to date and cohesive, to creating monthly content and using up to specialized content creation for special events, requirements, and requests.',
      link: '/portfolio/content-creation',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Social Media Management.png',
      title: 'Social Media Management',
      description: 'Synaps can manage your social media for you by planning, posting, organizing your whole feed and boosting your social media profiles. All Social Medias with a possibility like Instagram, Facebook, LinkedIn, TikTok, Snapchat, YouTube, Pinterest, etc.',
      link: '/portfolio/social-media-management',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Community Management.png',
      title: 'Community Management',
      description: 'Community Management is special when it comes to organizing your community and your customers. This service is well-suited for companies or creators, students, artists who plan on handling their community with an attitude. Community Management by Synaps with the right and professional manner of speaking to the community is not a challenge for Synaps.',
      link: '/portfolio/community-management',
    },
  ];

  const bundles = [
    {
      name: 'Basic Bundle',
      description: 'Instagram',
      imgSrc: '/assets/Bundles/Slide1.png',
    },
    {
      name: 'Trend Bundle',
      description: 'Instagram & TikTok',
      imgSrc: '/assets/Bundles/Slide2.png',
    },
    {
      name: 'Influential Bundle',
      description: 'Influencer Marketing - Instagram & TikTok',
      imgSrc: '/assets/Bundles/Slide3.png',
    },
    {
      name: 'Professional Bundle',
      description: 'Instagram, Facebook, LinkedIn',
      imgSrc: '/assets/Bundles/Slide4.png',
    },
    {
      name: 'Community Bundle',
      description: 'Instagram, Facebook, X',
      imgSrc: '/assets/Bundles/Slide5.png',
    },
    {
      name: 'Pro Max Social Bundle',
      description: 'All Social Media',
      imgSrc: '/assets/Bundles/Slide6.png',
    },
  ];

  return (
    <ServicesTemplate 
      title="Social Media" 
      description="Discover our top-notch social media services that cater to all your needs!"
      imgSrc="/assets/Art for Synaps/Portfolio - Social Media.png"
      importanceTitle="Social Media"
      importanceText="Synaps offers three types of Social Media Services. These services can be used together or separately based on the goals and targets a company has. High Quality content creation, social media management, and community management by Synaps in order to engage with the audience and speak to your community."
      importanceImgSrc="/assets/Art for Synaps/Services - Social Media.png"
      types={types}
      bundles={bundles}
    />
  );
};

export default SocialMediaServices;
