import React from 'react';
import ServicesTemplate from '../templates/ServicesTemplate';

const AdvertisementServices = () => {
  const types = [
    {
      imgSrc: '/assets/Art for Synaps/Services/Digital Advertising.png',
      title: 'Digital Advertising',
      description: 'Digital Advertising consists of very different elements. Starting from Social Media Paid Ads like Instagram, Facebook, and also YouTube. Synaps has the tools to improve your SEO by ranking you higher in the search index and your SEA by promoting directly through the search page.',
      link: '/portfolio/digital-advertising',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Email Marketing.png',
      title: 'Email Marketing',
      description: 'Email Marketing is the pinnacle of Growth Marketing. Through a certain database which can be provided by you or us we can target the specific target audience and send the information and update them in real-time. This is the key element when it comes to achieving customer acquisition and loyalty.',
      link: '/portfolio/email-marketing',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Physical Advertising.png',
      title: 'Physical Advertising',
      description: 'Physical Advertising can be a wide range of products that can be designed and tailored to your needs. Starting from flyers, banners, or other printed materials to big assets such as cars or ideas to place our advertisement in strategic places like business cards, posters, catalogs, portfolios, etc.',
      link: '/portfolio/physical-advertising',
    },
  ];

  const bundles = [
    {
      name: 'Conversion Bundle',
      description: 'Google Ads',
      imgSrc: '/assets/Bundles/Slide1.png',
    },
    {
      name: 'Awareness Bundle',
      description: 'Meta Ads',
      imgSrc: '/assets/Bundles/Slide2.png',
    },
    {
      name: 'Contact Bundle',
      description: 'Email Marketing',
      imgSrc: '/assets/Bundles/Slide3.png',
    },
    {
      name: 'Announcer Bundle',
      description: 'Email Marketing & Newsletter',
      imgSrc: '/assets/Bundles/Slide4.png',
    },
    {
      name: 'Guerrilla Bundle',
      description: 'Physical Advertising',
      imgSrc: '/assets/Bundles/Slide5.png',
    },
  ];

  return (
    <ServicesTemplate 
      title="Advertisement" 
      description="Discover our top-notch advertisement services that cater to all your needs!"
      imgSrc="/assets/Art for Synaps/Portfolio - Advertisement.png"
      importanceTitle="Advertisement"
      importanceText="Synaps can help you reach audiences and promote products in no time. Through different digital tools and our expertise we can advertise the business digitally, through emails or even provide physical advertisement."
      importanceImgSrc="/assets/Art for Synaps/Services - Advertisement.png"
      types={types}
      bundles={bundles}
    />
  );
};

export default AdvertisementServices;
