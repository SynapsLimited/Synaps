"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import your SVGs
import svg1 from '../loading-screen/loading-screen-transition-1.svg';
import svg2 from '../loading-screen/loading-screen-transition-2.svg';
import svg3 from '../loading-screen/loading-screen-transition-3.svg';
import svg4 from '../loading-screen/loading-screen-transition-4.svg';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const desktopSvgs = [svg1, svg2, svg3, svg4];

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
    const svgDuration = 1200; // 1.2 seconds for each SVG
    const mobilePulseDuration = 4500; // 4.5 seconds for mobile pulsing (2 full pulses + bounce)
    const logoExitDuration = 500; // 0.5 seconds for logo exit
    const backgroundFadeDuration = 1000; // 1 second for background fade-out
    const slideUpDuration = 1000; // 0.8 seconds for slide-up animation

    if (isMobile) {
      // Total duration: mobilePulseDuration + logoExitDuration + backgroundFadeDuration
      const timer = setTimeout(() => {
        setIsExiting(true);
        // First, exit the logo
        setTimeout(() => {
          // Then, fade out the background
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = '';
          }, backgroundFadeDuration);
        }, logoExitDuration);
      }, mobilePulseDuration);

      return () => clearTimeout(timer);
    } else {
      if (currentSvgIndex < desktopSvgs.length) {
        const timer = setTimeout(() => {
          setCurrentSvgIndex((prevIndex) => prevIndex + 1);
        }, svgDuration);
        return () => clearTimeout(timer);
      } else {
        // Initiate exit sequence
        setIsExiting(true);
        const timer = setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
        }, slideUpDuration);
        return () => clearTimeout(timer);
      }
    }
  }, [currentSvgIndex, desktopSvgs.length, isMobile]);

  if (!isLoading) return null;

  // Variants for container animation (only affects exit)
  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        ease: 'easeOut',
        duration: 1,
      },
    },
  };

  // Variants for background fade-out
  const backgroundVariants = {
    initial: { opacity: 1 },
    fade: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  // Variants for SVG blending and slide-up animation
  const svgVariants = {
    initial: { opacity: 0, y: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    exit: (index) => ({
      opacity: index === desktopSvgs.length - 1 ? 1 : 0, // Maintain opacity for the last SVG
      y: index === desktopSvgs.length - 1 ? '-100%' : 0, // Slide up only for the last SVG
      transition: {
        opacity: {
          duration: 1,
          ease: 'easeIn',
        },
        y: index === desktopSvgs.length - 1 ? {
          duration: 0.8,
          ease: 'easeInOut',
        } : {},
      },
    }),
  };

  // Variants for mobile logo pulsing
  const pulseVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.2, 1],
      transition: { 
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
    exit: { 
      scale: 0,
      opacity: 0,
      transition: { 
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          variants={containerVariants}
          initial="initial"
          animate="initial"
          exit="exit"
          aria-live="assertive"
        >
          {/* Background Handling */}
          {isMobile ? (
            <motion.div
              className="absolute inset-0 bg-background"
              variants={backgroundVariants}
              initial="initial"
              animate={isExiting ? "fade" : "initial"}
            />
          ) : (
            <motion.div
              className="absolute inset-0 bg-background"
              variants={backgroundVariants}
              initial="initial"
              animate={isExiting ? "fade" : "initial"}
            />
          )}

          {/* Content Handling */}
          {isMobile ? (
            // Mobile loading animation
            <motion.div
              className="relative z-[10001]"
              variants={pulseVariants}
              initial="initial"
              animate={isExiting ? "exit" : "animate"}
            >
              <img
                src="/assets/Synaps Logos/Synaps Logo Art navbar.png"
                alt="Synaps Logo"
                className="w-full h-32"
              />
            </motion.div>
          ) : (
            // Desktop SVG transitions
            <AnimatePresence initial={false}>
              {desktopSvgs.map((svg, index) => (
                currentSvgIndex === index && (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={svgVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`absolute inset-0 z-[10000] ${
                      // Apply 'bg-transparent' only to the last SVG before sliding up
                      isExiting && index === desktopSvgs.length - 1 ? 'bg-transparent' : 'shadow-xl'
                    }`}
                  >
                    <img
                      src={svg}
                      alt={`Loading ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
