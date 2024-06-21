import React from 'react';
import PortfolioTemplate from '../templates/PortfolioTemplate';

const galleryItems = [
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Emko.jpg",
    alt: "Emko",
    title: "Emko",
    description: "We developed a comprehensive website for Emko, an office design and furniture provider, to showcase their company’s ethos and extensive product offerings. The site features an integrated catalog within the products section, ensuring a seamless browsing experience for potential clients.",
    link: "https://www.emko.al"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Balkan Sports Scholars.jpg",
    alt: "Balkan Sports Scholars",
    title: "Balkan Sports Scholars",
    description: "For Balkan Sports Scholars, a leading sports agency, we created a dynamic page to enhance their online presence across the Balkans and the US. The site supports their digital platforms, offering detailed information and engagement opportunities for athletes and partners.",
    link: ""
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Meliora Medical.jpg",
    alt: "Meliora Medical",
    title: "Meliora Medical",
    description: "We designed a robust website for Meliora Medical, a physiotherapy and dermoesthetics clinic, to elevate their digital presence and improve their SEO and SEA performance. The site effectively highlights their services and expertise, attracting more clients and enhancing their online visibility.",
    link: ""
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/ADSH.jpg",
    alt: "ADSH",
    title: "ADSH",
    description: "We created a simple yet effective one-page website for ADSH, importers and exporters in the dairy industry, to establish their digital presence. This straightforward site provides essential information about their business, ensuring they are accessible to potential clients and partners.",
    link: "https://www.adsh2014.al"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Grei's Dental Clinic.jpg",
    alt: "Grei's Dental Clinic",
    title: "Grei's Dental Clinic",
    description: "For Grei's Dental Clinic, we developed a sleek and informative website similar to Meliora Medical’s, aiming to boost their digital presence and SEO rankings. The site presents their dental services clearly and professionally, helping to attract new patients and retain existing ones.",
    link: ""
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Grade Up Training.jpg",
    alt: "Grade Up Training",
    title: "Grade Up Training",
    description: "For Grade Up Training, renowned for their professional athletic training, we developed a concise one-page website to solidify their digital presence. The page highlights their top-notch training services, making it easy for athletes to learn about and connect with their expert trainers.",
    link: "https://www.gradeuptraining.al"
  }
  
  // Add more items as needed
];

const WebDesignPortfolio = () => (
  <PortfolioTemplate
    title="Web Design Portfolio"
    description="Check out our web design projects."
    galleryItems={galleryItems}
  />
);

export default WebDesignPortfolio;
