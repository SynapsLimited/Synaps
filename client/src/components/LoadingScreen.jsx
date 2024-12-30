import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import your SVGs
import svg1 from '../loading-screen/loading-screen-transition-1.svg';
import svg2 from '../loading-screen/loading-screen-transition-2.svg';
import svg3 from '../loading-screen/loading-screen-transition-3.svg';
import svg4 from '../loading-screen/loading-screen-transition-4.svg';

import svgMobile1 from '../loading-screen/loading-screen-transition-mobile-1.svg';
import svgMobile2 from '../loading-screen/loading-screen-transition-mobile-2.svg';
import svgMobile3 from '../loading-screen/loading-screen-transition-mobile-3.svg';
import svgMobile4 from '../loading-screen/loading-screen-transition-mobile-4.svg';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const desktopSvgs = [svg1, svg2, svg3, svg4];
  const mobileSvgs = [svgMobile1, svgMobile2, svgMobile3, svgMobile4];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const transitionDuration = 1000; // 1 second for each transition
    const fadeOutDuration = 1000; // 1 second for fade out

    if (currentSvgIndex < 3) {
      const timer = setTimeout(() => {
        setCurrentSvgIndex((prevIndex) => prevIndex + 1);
      }, transitionDuration);
      return () => clearTimeout(timer);
    } else {
      // After the last SVG, initiate slide-up exit animation
      const timer = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = '';
      }, transitionDuration + fadeOutDuration);
      return () => clearTimeout(timer);
    }
  }, [currentSvgIndex]);

  if (!isLoading) return null;

  const selectedSvgs = isMobile ? mobileSvgs : desktopSvgs;

  const containerVariants = {
    initial: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100, transition: { ease: 'easeIn', duration: 0.5 } },
  };

  const svgVariants = {
    enter: (index) => ({
      y: index === 4 ? 0 : 1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (index) => {
      if (index === 4) {
        return {
          opacity: 0,
        };
      }
      return {
        zIndex: 0,
        y: index === 4 ? -1000 : 0,
        opacity: index === 4 ? 1 : 0,
      };
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-100000 flex items-center justify-center bg-background overflow-hidden"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <AnimatePresence initial={false} custom={currentSvgIndex}>
            <motion.div
              key={currentSvgIndex}
              custom={currentSvgIndex}
              variants={svgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: currentSvgIndex === 4 ? 1 : 0.2 },
              }}
              className="absolute inset-0"
            >
              <img
                src={selectedSvgs[currentSvgIndex]}
                alt={`Loading ${currentSvgIndex + 1}`}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="relative z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <img
              src="/assets/Synaps Logos/Synaps Logo Art navbar.png"
              alt="Synaps Logo"
              className="w-32 h-32 md:w-48 md:h-48"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
