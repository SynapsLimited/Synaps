import React from 'react';
import PortfolioTemplate from '../templates/PortfolioTemplate';

const galleryItems = [
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/ADSH.jpg",
    alt: "ADSH",
    title: "ADSH",
    description: "For ADSH, a key player in the dairy import/export industry, we delivered a complete branding package that included logo design, color schemes, and patterns. Our cohesive branding strategy helped ADSH establish a strong and recognizable identity in the market.",
    link: "https://www.adsh2014.al"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Cali Hype.jpg",
    alt: "Cali Hype",
    title: "Cali Hype",
    description: "We provided Cali Hype, a clothing and fashion brand, with a full branding overhaul, encompassing logo creation, color palettes, and pattern designs. This comprehensive branding effort enabled Cali Hype to stand out in the competitive fashion industry with a distinct and stylish visual identity.",
    link: ""
  }
];

const BrandingPortfolio = () => (
  <PortfolioTemplate
    title="Branding"
    description="Let’s give your brand a cool personality and a vibe around it!"
    imgSrc="/assets/Art for Synaps/Portfolio - Branding.png"
    galleryItems={galleryItems}
  />
);

export default BrandingPortfolio;
