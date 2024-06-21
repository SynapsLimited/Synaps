import React from 'react';
import ServicesTemplate from '../templates/ServicesTemplate';

const VideoServices = () => {
  const types = [
    {
      imgSrc: '/assets/Art for Synaps/Services/Reels.png',
      title: 'Reels',
      description: 'Reels are the most famous style of videos lately. In a horizontal format and engaging techniques these videos can be pitched, filmed, scripted, and edited to a targeted audience through TikTok, Instagram, Facebook, or YouTube Shorts.',
      link: '/portfolio/reels',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/YouTube.png',
      title: 'YouTube',
      description: 'YouTube videos are videos that can display different skills, video editors, different and engaging content. We have the ability to script, film, or edit different content varying on the needs of the company. The horizontal format YouTube videos are usually longer than Reels.',
      link: '/portfolio/youtube',
    },
    {
      imgSrc: '/assets/Art for Synaps/Services/Ads.png',
      title: 'Ads',
      description: 'Advertisements videos can come in all types of formats for any type of products, company, or event. We create this video adaptable to the theme of the message it is trying to promote and to the audience that is targeted through these.',
      link: '/portfolio/ads',
    },
  ];

  const bundles = [
    {
      name: 'Editor Bundle',
      description: 'Video Editing',
      imgSrc: '/assets/Bundles/Slide1.png',
    },
    {
      name: 'Internet Bundle',
      description: 'Video Ideation & Editing for Socials',
      imgSrc: '/assets/Bundles/Slide2.png',
    },
    {
      name: 'YouTube Bundle',
      description: 'Video Ideation & Editing for YouTube',
      imgSrc: '/assets/Bundles/Slide3.png',
    },
  ];

  return (
    <ServicesTemplate 
      title="Video" 
      description="Discover our top-notch video services that cater to all your needs!"
      imgSrc="/assets/Art for Synaps/Portfolio - Video.png"
      importanceTitle="Video"
      importanceText="Synaps offers three types of videos that can be used in different practices according to the channels you would like to start promoting or engaging. Starting from reels in a vertical style, going to YouTube videos on horizontal style with the newest ideas to interact, ending up in ads of all sorts and styles."
      importanceImgSrc="/assets/Art for Synaps/Services - Video.png"
      types={types}
      bundles={bundles}
    />
  );
};

export default VideoServices;
