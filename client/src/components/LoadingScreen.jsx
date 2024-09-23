import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import your SVGs
import svg1 from './../Loading Screen/Loading Screen Transition 1.svg';
import svg2 from './../Loading Screen/Loading Screen Transition 2.svg';
import svg3 from './../Loading Screen/Loading Screen Transition 3.svg';
import svg4 from './../Loading Screen/Loading Screen Transition 4.svg';

import svgMobile1 from './../Loading Screen/Loading Screen Transition Mobile 1.svg';
import svgMobile2 from './../Loading Screen/Loading Screen Transition Mobile 2.svg';
import svgMobile3 from './../Loading Screen/Loading Screen Transition Mobile 3.svg';
import svgMobile4 from './../Loading Screen/Loading Screen Transition Mobile 4.svg';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const desktopSvgs = [svg1, svg2, svg3, svg4];
  const mobileSvgs = [svgMobile1, svgMobile2, svgMobile3, svgMobile4];
  const selectedSvgs = isMobile ? mobileSvgs : desktopSvgs;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);

    // Cycle through SVGs
    const interval = setInterval(() => {
      setCurrentSvgIndex((prevIndex) => prevIndex + 1);
    }, 1250); // Change SVG every 1.25 seconds

    // Remove loading screen after animations
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // Adjust timing as needed

    // Prevent background scrolling
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      clearTimeout(timeout);
      document.body.style.overflow = ''; // Re-enable scrolling
    };
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

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
};

export default LoadingScreen;
