import React from 'react';
import PortfolioTemplate from '../templates/PortfolioTemplate';

const galleryItems = [
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Meliora Medical.jpg",
    alt: "Meliora Medical",
    title: "Meliora Medical",
    description: "For Meliora Medical, a physiotherapy and dermoesthetics clinic, we set up and managed their social media accounts, focusing on creating compelling and informative content. This approach enhanced their online visibility and attracted a wider audience to their services.",
    link: "https://www.instagram.com/meliora_medical/"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Melody's Thrift.jpg",
    alt: "Melody’s Thrift",
    title: "Melody’s Thrift",
    description: "For Melody's Thrift, an online thrift shop, we provided community management and developed a comprehensive social media content plan. This initiative helped build a loyal online community and fostered increased interaction and sales.",
    link: "https://www.instagram.com/melodys_thrift/"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Grei's Dental Clinic.jpg",
    alt: "Grei’s Dental Clinic",
    title: "Grei’s Dental Clinic",
    description: "We handled the social media setup and ongoing management for Grei's Dental Clinic, providing them with high-quality content creation. Our strategy aimed to increase their digital footprint and engage with both current and potential patients effectively.",
    link: "https://www.instagram.com/grei_dental_clinic/"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Balkan Sports Scholars.jpg",
    alt: "Balkan’s Sport Scholars",
    title: "Balkan’s Sport Scholars",
    description: "We established and managed the social media presence for Balkan Sports Scholars, a prominent sports agency, ensuring consistent and engaging content creation. Our efforts helped boost their online engagement and expand their reach across social media platforms.",
    link: "https://www.instagram.com/balkansportscholars/"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Onus Maison.jpg",
    alt: "Onus Maison",
    title: "Onus Maison",
    description: "We assisted Onus Maison, a brand specializing in 3D-printed and hand-crafted sustainable fashion and art, by editing and enhancing their social media content. Our work ensured their posts were visually appealing and aligned with their brand's eco-friendly ethos.",
    link: "https://www.instagram.com/onusmaison/"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Vip Tie Dubai.jpg",
    alt: "Vip Tie",
    title: "Vip Tie",
    description: "For Vip Tie, known for their unique 3D-printed and hand-crafted ties, we focused on refining their social media content. Our content editing services ensured their brand's high-quality craftsmanship was effectively showcased online.",
    link: "https://www.instagram.com/viptiemilano/"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/URT shpk.jpg",
    alt: "URT Shpk",
    title: "URT Shpk",
    description: "We provided comprehensive content creation and social media management for URT shpk, an engineering procurement and construction company. Our services helped establish their authority in the industry and maintain a strong online presence.",
    link: "https://www.instagram.com/urtshpk/"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Mother Earth.jpg",
    alt: "Mother Earth",
    title: "Mother Earth",
    description: "For Mother Earth, specializing in green solutions within the engineering procurement and construction sector, we delivered content creation and social media management services similar to URT shpk. Our efforts promoted their sustainable projects and enhanced their online engagement.",
    link: "https://www.instagram.com/motherearthalbania/"
  }
  // Add more items as needed
];

const SocialMediaPortfolio = () => (
  <PortfolioTemplate
    title="Social Media Portfolio"
    description="Keeping up with Social Media trends and audience has never been easier!"
    imgSrc="/assets/Art for Synaps/Portfolio - Social Media.png"
    galleryItems={galleryItems}
  />
);

export default SocialMediaPortfolio;
