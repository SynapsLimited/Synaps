import React from 'react';
import ServicesTemplate from '../templates/ServicesTemplate';

const WebDesignServices = () => {
  const types = [
    {
      imgSrc: '/assets/Art for Synaps/Services/3D Websites.png',
      title: '3D Websites',
      description: '3D Websites are websites which offer a great User Experience. 3D models are created, embedded and animated throughout a website to visualize and create a strong bond with the user or customer. These websites can be great for companies in the industries of fashion, furniture, pharmaceutical products, skin-care products, etc.',
      link: '/portfolio/3d-websites',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Customized Website.png',
      title: 'Customized Websites',
      description: 'Customized Websites are multiple page websites which are tailored to the companies\' preferences including the latest trends, cutting-edge animations, vectors and icons. We offer new ideas in these websites to improve the User Interface with a spark of creativity and innovation.',
      link: '/portfolio/customized-websites',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/One-Pager Website.png',
      title: 'One-Pager Website',
      description: 'One-Pager Websites are simple websites which contain one page. This page includes all the sections that a website should such as About Us, Services, Testimonials, Contact, Portfolio, Video Promotion, Certifications, etc., to display everything a company has to show in one place. It does the job perfectly and has enough information to promote a company.',
      link: '/portfolio/one-pager-websites',
    },
  ];

  const bundles = [
    {
      name: 'Simple Bundle',
      description: 'Wordpress',
      imgSrc: '/assets/Bundles/Slide1.png',
    },
    {
      name: 'Blogger Bundle',
      description: 'Wordpress & SEO',
      imgSrc: '/assets/Bundles/Slide2.png',
    },
    {
      name: 'Original Bundle',
      description: 'Designed & Developed',
      imgSrc: '/assets/Bundles/Slide3.png',
    },
    {
      name: 'Authentic Bundle',
      description: 'Designed & Developed & SEO',
      imgSrc: '/assets/Bundles/Slide4.png',
    },
    {
      name: 'Pro Performance Bundle',
      description: 'WordPress & SEO & SEA',
      imgSrc: '/assets/Bundles/Slide5.png',
    },
    {
      name: 'Pro Max Performance Bundle',
      description: 'Designed & Developed & SEO & SEA',
      imgSrc: '/assets/Bundles/Slide6.png',
    },
  ];

  return (
    <ServicesTemplate 
      title="Web Design" 
      description="Discover our top-notch web design services that cater to all your needs!"
      imgSrc="/assets/Art for Synaps/Portfolio - Web Design.png"
      importanceTitle="Web Design"
      importanceText="Synaps presents to you three types of modern Web Designs that are suited and tailored to your company. Varying from having a website as visualizing as ever with multiple 3D elements to offer the best User Experience, to a website customized to the desires of the customer with an eye for details, ending to a simple one-pager website which does the job just right."
      importanceImgSrc="/assets/Art for Synaps/Services - Web Design.png"
      types={types}
      bundles={bundles} // Pass bundles to the ServicesTemplate
    />
  );
};

export default WebDesignServices;
