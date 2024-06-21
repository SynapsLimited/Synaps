import React from 'react';
import PortfolioTemplate from '../templates/PortfolioTemplate';

const galleryItems = [
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Meliora Medical.jpg",
    alt: "Meliora Medical",
    title: "Meliora Medical - SEO & SEA",
    description: "We provided comprehensive SEO and SEA services for Meliora Medical, a physiotherapy and dermoesthetics clinic, to enhance their online visibility and attract more clients. Our strategic approach resulted in improved search engine rankings and increased web traffic.",
    link: ""
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Grei's Dental Clinic.jpg",
    alt: "Grei’s Dental Clinic",
    title: "Grei’s Dental Clinic - SEO & SEA",
    description: "For Grei's Dental Clinic, we implemented effective SEO and SEA strategies to boost their online presence and patient acquisition. Our efforts significantly improved their search engine performance and visibility in local searches.",
    link: ""
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Nika Rentals.jpg",
    alt: "Nika Rentals",
    title: "Nika Rentals - SEO & SEA",
    description: "We assisted Nika Rentals, a car rental service, with SEO and SEA services to ensure they stood out in a competitive market. Our targeted campaigns enhanced their online visibility, leading to higher website traffic and increased bookings.",
    link: "https://nikarentcartirana.com/"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/ADSH.jpg",
    alt: "ADSH - Physical Ads",
    title: "ADSH - Physical Ads",
    description: "For ADSH, an importer/exporter in the dairy industry, we designed and planned physical advertisements for their new shop. Our creative advertising solutions effectively captured the attention of potential customers and drove foot traffic to their location.",
    link: "https://www.adsh2014.al"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Balkan Sports Scholars.jpg",
    alt: "Balkan Sports Scholars - Email Marketing",
    title: "Balkan Sports Scholars - Email Marketing",
    description: "We set up and managed email marketing services for Balkan Sports Scholars, a leading sports agency. Our email campaigns were designed to engage their audience, promote their services, and maintain strong communication with athletes and partners.",
    link: ""
  }
];

const AdvertisementPortfolio = () => (
  <PortfolioTemplate
    title="Advertisement"
    description="Ready to show the products you want to the people you want?!"
    imgSrc="/assets/Art for Synaps/Portfolio - Advertisement.png"
    galleryItems={galleryItems}
  />
);

export default AdvertisementPortfolio;
