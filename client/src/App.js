import './App.css';
import React, { useEffect, useState } from 'react'; // Import useState
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n/i18n'; // Ensure this import is correct
import { HelmetProvider } from 'react-helmet-async';

import AOS from 'aos';
import 'aos/dist/aos.css';


import PrivacyPolicy from './pages/PrivacyPolicy';
import CookieConsent from './components/CookieConsent';


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LogoShowcase from './components/LogoShowcase';
import LoadingScreen from './components/LoadingScreen';
import FixedMenu from './components/FixedMenu';
import ScrollToTop from './components/ScrollToTop';
import Posts from './components/Posts';
import ServicesForm from './components/ServicesForm';
import UserProvider from './context/userContext';
import Layout from './components/Layout';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// Import blog pages

import ErrorPage from './blog/ErrorPage';
import PostDetail from './blog/PostDetail';
import Register from './blog/Register';
import Login from './blog/Login';
import UserProfile from './blog/UserProfile';
import Authors from './blog/Authors';
import CreatePost from './blog/CreatePost';
import EditPost from './blog/EditPost';
import DeletePost from './blog/DeletePost';
import CategoryPosts from './blog/CategoryPosts';
import AuthorPosts from './blog/AuthorPosts';
import Dashboard from './blog/Dashboard';
import Logout from './blog/Logout';

// Import portfolio pages
import AdvertisementPortfolio from './portfolio/advertisement';
import BrandingPortfolio from './portfolio/branding';
import SocialMediaPortfolio from './portfolio/socialmedia';
import VideoPortfolio from './portfolio/video';
import WebDesignPortfolio from './portfolio/webdesign';

// Import services pages
import AdvertisementServices from './services/advertisement';
import BrandingServices from './services/branding';
import SocialMediaServices from './services/socialmedia';
import VideoServices from './services/video';
import WebDesignServices from './services/webdesign';

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // State for loading

  const getBackgroundClass = (pathname) => {
    switch (pathname) {
      case '/':
        return 'homepage-background';
      case '/about':
        return 'about-background';
      case '/services':
        return 'services-background';
      case '/portfolio':
      case '/services/webdesign':
      case '/services/socialmedia':
      case '/services/branding':
      case '/services/video':
      case '/services/advertisement':
        return 'portfolio-background';
      case '/blog':
        return 'blog-background';
      case '/contact':
      case '/portfolio/webdesign':
      case '/portfolio/socialmedia':
      case '/portfolio/branding':
      case '/portfolio/video':
      case '/portfolio/advertisement':
        return 'contact-background';
      default:
        return 'other-background';
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true,     // Whether animation should happen only once
      mirror: false,  // Whether elements should animate out while scrolling past them
    });

    // Refresh AOS on route change
    // This ensures that AOS detects new elements on page navigation
    AOS.refresh();
  }, []);



  return (
    <HelmetProvider>
    <div className={`App ${getBackgroundClass(location.pathname)}`}>
      <ScrollToTop />
      <Navbar />
      <Layout>
      <LoadingScreen />
      <CookieConsent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Blog routes */}
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="authors" element={<Authors />} />
          <Route path="servicesform" element={<ServicesForm />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:categories/:category" element={<CategoryPosts />} />
          <Route path="posts/users/:id" element={<AuthorPosts />} />
          <Route path="myposts/:id" element={<Dashboard />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
          <Route path="posts/:id/delete" element={<DeletePost />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />

          {/* Portfolio routes */}
          <Route path="/portfolio/advertisement" element={<AdvertisementPortfolio />} />
          <Route path="/portfolio/branding" element={<BrandingPortfolio />} />
          <Route path="/portfolio/socialmedia" element={<SocialMediaPortfolio />} />
          <Route path="/portfolio/video" element={<VideoPortfolio />} />
          <Route path="/portfolio/webdesign" element={<WebDesignPortfolio />} />

          {/* Services routes */}
          <Route path="/services/advertisement" element={<AdvertisementServices />} />
          <Route path="/services/branding" element={<BrandingServices />} />
          <Route path="/services/socialmedia" element={<SocialMediaServices />} />
          <Route path="/services/video" element={<VideoServices />} />
          <Route path="/services/webdesign" element={<WebDesignServices />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        </Routes>
        <FixedMenu />
        <LogoShowcase />
        <Footer />
        </Layout>
    </div>
    </HelmetProvider>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  );
  
}

