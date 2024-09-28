// LoadingScreen.js
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BarLoader from 'react-spinners/BarLoader';
import './../css/loadingscreen.css';

// Import your SVGs
import svg1 from './../Loading Screen/Loading Screen Transition 1.png';
import svg2 from './../Loading Screen/Loading Screen Transition 2.png';
import svg3 from './../Loading Screen/Loading Screen Transition 3.png';
import svg4 from './../Loading Screen/Loading Screen Transition 4.png';

import svgMobile1 from './../Loading Screen/Loading Screen Transition Mobile 1.svg';
import svgMobile2 from './../Loading Screen/Loading Screen Transition Mobile 2.svg';
import svgMobile3 from './../Loading Screen/Loading Screen Transition Mobile 3.svg';
import svgMobile4 from './../Loading Screen/Loading Screen Transition Mobile 4.svg';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [fadeOut, setFadeOut] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const desktopSvgs = [svg1, svg2, svg3, svg4];
  const mobileSvgs = [svgMobile1, svgMobile2, svgMobile3, svgMobile4];
  const selectedSvgs = isMobile ? mobileSvgs : desktopSvgs;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    if (isMobile) {
      // Mobile loading screen logic

      // Set a timeout to trigger the fade-out effect one second before loading ends
      const fadeOutTimer = setTimeout(() => {
        setFadeOut(true);
      }, 3000); // Fade-out starts at 3 seconds

      // Set a timeout to end the loading
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = ''; // Re-enable scrolling
      }, 4000); // Loading ends at 4 seconds

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(loadingTimer);
        document.body.style.overflow = ''; // Re-enable scrolling
        window.removeEventListener('resize', handleResize);
      };
    } else {
      // Desktop and tablet loading screen logic
      // Cycle through SVGs
      const interval = setInterval(() => {
        setCurrentSvgIndex((prevIndex) => prevIndex + 1);
      }, 1250); // Change SVG every 1.25 seconds

      // Remove loading screen after animations
      const timeout = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = ''; // Re-enable scrolling
      }, 6000); // Adjust timing as needed

      return () => {
        window.removeEventListener('resize', handleResize);
        clearInterval(interval);
        clearTimeout(timeout);
        document.body.style.overflow = ''; // Re-enable scrolling
      };
    }
  }, [isMobile]);

  if (!isLoading) {
    return null;
  }

  if (isMobile) {
    // Mobile loading screen
    return (
      <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
        <div className="loading-content">
          <img
            src={`${process.env.PUBLIC_URL}/assets/Synaps Logos/Synaps Logo Art navbar.png`} // Update with your logo path
            alt="Synaps Logo"
            className="loading-logo"
          />
          <BarLoader
            color="var(--color-primary)" // Use your primary color variable
            height={8}
            loading={isLoading}
            speedMultiplier={0.5}
            width={windowWidth > 768 ? 500 : 300} // 500px for large screens, 300px for mobile
          />
        </div>
      </div>
    );
  } else {
    // Desktop and tablet loading screen
    const slideUpVariants = {
      initial: { y: 0 },
      animate: { y: '-100%', transition: { duration: 0.8, ease: 'easeInOut' } },
    };

    return (
      <div
        id="loadingScreen"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 1100,
          backgroundColor:
            currentSvgIndex < selectedSvgs.length
              ? 'var(--color-background)'
              : 'transparent', // Conditionally set background color
        }}
      >
        <AnimatePresence>
          {currentSvgIndex < selectedSvgs.length && (
            <motion.img
              key={currentSvgIndex}
              src={selectedSvgs[currentSvgIndex]}
              alt={`Loading ${currentSvgIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
        </AnimatePresence>

        {currentSvgIndex === selectedSvgs.length && (
          <motion.div
            key="slide-up-container"
            variants={slideUpVariants}
            initial="initial"
            animate="animate"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <img
              src={selectedSvgs[selectedSvgs.length - 1]}
              alt="Loading final"
              style={{
                opacity: 1,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </motion.div>
        )}
      </div>
    );
  }
};

export default LoadingScreen;
