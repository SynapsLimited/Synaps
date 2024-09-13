import React, { useEffect } from 'react';
import './../css/loadingscreen.css'; // Ensure you have appropriate CSS

const LoadingScreen = () => {
  useEffect(() => {
    // Function to animate the transitions
    function animateTransition(prevImg, nextImg, delay) {
      setTimeout(() => {
        prevImg.classList.add('fade-out');
        nextImg.classList.add('fade-in');
        nextImg.style.display = 'block';
        nextImg.offsetWidth; // Force reflow for Safari
  
        setTimeout(() => {
          prevImg.style.display = 'none';
          prevImg.classList.remove('fade-out');
          nextImg.classList.remove('fade-in');
        }, 600);
      }, delay);
    }
  
    // Function to update image sources based on screen size
    function updateImageSources() {
      const isMobile = window.innerWidth < 768;
      document.getElementById('image1').src = isMobile ? '/assets/Loading Screen/Loading Screen Transition Mobile 1.png' : '/assets/Loading Screen/Loading Screen Transition 1.png';
      document.getElementById('image2').src = isMobile ? '/assets/Loading Screen/Loading Screen Transition Mobile 2.png' : '/assets/Loading Screen/Loading Screen Transition 2.png';
      document.getElementById('image3').src = isMobile ? '/assets/Loading Screen/Loading Screen Transition Mobile 3.png' : '/assets/Loading Screen/Loading Screen Transition 3.png';
      document.getElementById('image4').src = isMobile ? '/assets/Loading Screen/Loading Screen Transition Mobile 4.png' : '/assets/Loading Screen/Loading Screen Transition 4.png';
    }
  
    // Load only on the first visit to the home page
    const hasSeenLoadingScreen = localStorage.getItem('hasSeenLoadingScreen');
  
    if (!hasSeenLoadingScreen) {
      updateImageSources();
      window.addEventListener('resize', updateImageSources);
  
      window.addEventListener('load', function () {
        const image1 = document.getElementById('image1');
        const image2 = document.getElementById('image2');
        const image3 = document.getElementById('image3');
        const image4 = document.getElementById('image4');
        
        animateTransition(image1, image2, 600);
        animateTransition(image2, image3, 1200);
        animateTransition(image3, image4, 1800);
  
        setTimeout(() => {
          image4.style.transform = 'translateY(-100%)';
          document.getElementById('loadingScreen').style.backgroundColor = 'transparent';
          setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            localStorage.setItem('hasSeenLoadingScreen', 'true'); // Mark that the user has seen the loading screen
          }, 500);
        }, 2400);
      });
    } else {
      // If the user has already seen the loading screen, just hide it
      document.getElementById('loadingScreen').style.display = 'none';
    }
  
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
