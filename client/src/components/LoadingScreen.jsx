import React, { useEffect } from 'react';
import './../css/loadingscreen.css'; // Ensure you have appropriate CSS

const LoadingScreen = () => {
  useEffect(() => {
    function animateTransition(prevImg, nextImg, delay) {
      setTimeout(() => {
        if (prevImg && nextImg) { // Ensure both images exist before proceeding
          prevImg.classList.add('fade-out');
          nextImg.classList.add('fade-in');
          nextImg.style.display = 'block';

          // Force reflow in Safari
          void nextImg.offsetWidth; // This forces reflow, making sure styles are applied correctly

          setTimeout(() => {
            prevImg.style.display = 'none';
            prevImg.classList.remove('fade-out');
            nextImg.classList.remove('fade-in');
          }, 600); // Animation duration
        }
      }, delay);
    }

    function updateImageSources() {
      const isMobile = window.innerWidth < 768; // or use matchMedia
      const image1 = document.getElementById('image1');
      const image2 = document.getElementById('image2');
      const image3 = document.getElementById('image3');
      const image4 = document.getElementById('image4');

      if (image1 && image2 && image3 && image4) { // Ensure all images exist before setting sources
        image1.src = isMobile
          ? '/assets/Loading Screen/Loading Screen Transition Mobile 1.png'
          : '/assets/Loading Screen/Loading Screen Transition 1.png';
        image2.src = isMobile
          ? '/assets/Loading Screen/Loading Screen Transition Mobile 2.png'
          : '/assets/Loading Screen/Loading Screen Transition 2.png';
        image3.src = isMobile
          ? '/assets/Loading Screen/Loading Screen Transition Mobile 3.png'
          : '/assets/Loading Screen/Loading Screen Transition 3.png';
        image4.src = isMobile
          ? '/assets/Loading Screen/Loading Screen Transition Mobile 4.png'
          : '/assets/Loading Screen/Loading Screen Transition 4.png';
      }
    }

    function setFallbackForImage1() {
      const image1 = document.getElementById('image1');
      setTimeout(() => {
        if (image1) {
          image1.classList.add('fade-out'); // Ensure the first image fades out if no animation triggers
          image1.style.display = 'none';
        }
      }, 2400); // Total animation time (or more) to ensure it never takes too long
    }

    // Update image sources immediately for quick load
    updateImageSources();

    window.addEventListener('resize', updateImageSources);

    window.addEventListener('load', function () {
      const loadingScreen = document.getElementById('loadingScreen');
      const image1 = document.getElementById('image1');
      const image2 = document.getElementById('image2');
      const image3 = document.getElementById('image3');
      const image4 = document.getElementById('image4');

      if (image1 && image2 && image3 && image4) { // Ensure all images exist before animating
        animateTransition(image1, image2, 600);    // Transition from image 1 to 2
        animateTransition(image2, image3, 1200); // Transition from image 2 to 3
        animateTransition(image3, image4, 1800); // Transition from image 3 to 4

        setTimeout(() => {
          image4.style.transform = 'translateY(-100%)'; // Slide out image 4
          loadingScreen.style.backgroundColor = 'transparent'; // Change background color to transparent
          setTimeout(() => {
            loadingScreen.classList.add('loading-screen-fade-out'); // Fade out the entire loading screen
            setTimeout(() => {
              loadingScreen.style.display = 'none'; // Hide the loading screen after fade out
            }, 600); // This timeout matches the last image slide out time
          }, 500); // Delay to let image4 finish its transition
        }, 2400); // Timing to start the slide out after the last fade in
      }
    });

    // Set the fallback to ensure the first image never stays longer than the animation time
    setFallbackForImage1();

    return () => {
      window.removeEventListener('resize', updateImageSources);
    };
  }, []);

  return (
    <div id="loadingScreen">
      <img id="image1" alt="Image 1" />
      <img id="image2" alt="Image 2" style={{ display: 'none' }} />
      <img id="image3" alt="Image 3" style={{ display: 'none' }} />
      <img id="image4" alt="Image 4" style={{ display: 'none' }} />
    </div>
  );
};

export default LoadingScreen;
