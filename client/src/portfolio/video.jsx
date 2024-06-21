import React from 'react';
import PortfolioTemplate from '../templates/PortfolioTemplate';

const galleryItems = [
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Balkan Sports Scholars.jpg",
    alt: "Balkan Sports Scholars - 01",
    title: "Balkan Sports Scholars - 01",
    description: "For Balkan Sports Scholars, we edited YouTube highlight videos for Endi Rahmani, showcasing his football skills and career highlights. Our editing emphasized key moments and performances, enhancing his visibility and appeal to fans and scouts alike.",
    link: "https://www.youtube.com/watch?v=orqku91tNWk&t=65s"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Balkan Sports Scholars.jpg",
    alt: "Balkan Sports Scholars - 02",
    title: "Balkan Sports Scholars - 02",
    description: "We produced and edited YouTube highlight videos for Xhoel Lutaj, another talented football player under Balkan Sports Scholars. The videos were crafted to highlight his strengths and achievements, providing a professional and engaging showcase of his abilities.",
    link: "https://www.youtube.com/watch?v=Q8XRInqecMM&t=53s"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Balkan Sports Scholars.jpg",
    alt: "Balkan Sports Scholars - 03",
    title: "Balkan Sports Scholars - 03",
    description: "For Franc Rabeta, a football player represented by Balkan Sports Scholars, we edited YouTube highlight videos to capture and present his best moments on the field. These videos were designed to increase his online presence and attract attention from potential recruiters.",
    link: "https://www.youtube.com/watch?v=f367cWpvFPg&t=4s"
  },
  {
    imgSrc: "/assets/Art for Synaps/Portfolio/Meliora Medical.jpg",
    alt: "Meliora Medical",
    title: "Meliora Medical",
    description: "We collaborated with Meliora Medical to ideate and edit videos tailored for TikTok, aiming for viral success. Our creative approach and editing skills helped create engaging and shareable content, boosting their online visibility and engagement on the platform.",
    link: "https://www.tiktok.com/@meliora__medical"
  }
];

const VideoPortfolio = () => (
  <PortfolioTemplate
    title="Video"
    description="Showcasing, filming, and editing has never been easier!"
    imgSrc="/assets/Art for Synaps/Portfolio - Video.png"
    galleryItems={galleryItems}
  />
);

export default VideoPortfolio;
