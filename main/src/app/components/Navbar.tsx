'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import './../css/navbar.css';
import ReactCountryFlag from 'react-country-flag';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const navElement = document.querySelector('.nav-wrapper');
    if (navElement) {
      const navHeight = (navElement as HTMLElement).offsetHeight;
      setIsScrolled(scrollTop > navHeight);
    }
  };

  const handleLanguageDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownMenu) {
      if (isLanguageDropdownOpen) {
        dropdownMenu.classList.add('hide');
        setTimeout(() => {
          setIsLanguageDropdownOpen(false);
          dropdownMenu.classList.remove('hide');
        }, 700);
      } else {
        setIsLanguageDropdownOpen(true);
      }
    }
  };
  

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.toLowerCase());
    localStorage.setItem('preferredLanguage', lang);
    setIsLanguageDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage.toLowerCase());
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div  className={`page-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div  className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <nav  className="navbar">
          <Link href="/" onClick={handleMenuClose}>
            <img src="/assets/Synaps Logos/Synaps Logo Art navbar.png" alt="Company Logo"  className={isScrolled ? 'scrolled' : ''} />
          </Link>
          <div
             className={`menu-toggle ${isMobileMenuOpen ? 'is-active' : ''} ${isScrolled ? 'scrolled' : ''}`}
            id="mobile-menu"
            onClick={handleMenuToggle}
          >
            <span  className={`bar ${isScrolled ? 'scrolled' : ''}`}></span>
            <span  className={`bar ${isScrolled ? 'scrolled' : ''}`}></span>
            <span  className={`bar ${isScrolled ? 'scrolled' : ''}`}></span>
          </div>
          <ul  className={`nav no-search ${isMobileMenuOpen ? 'mobile-nav' : ''} ${isScrolled ? 'scrolled' : ''}`}>
            <li  className="nav-item">
              <Link href="/"  className={isScrolled ? 'scrolled' : ''} onClick={handleMenuClose}>{t('navbar.home')}</Link>
            </li>
            <li  className="nav-item">
              <Link href="/about"  className={isScrolled ? 'scrolled' : ''} onClick={handleMenuClose}>{t('navbar.about')}</Link>
            </li>
            <li  className="nav-item">
              <Link href="/services"  className={isScrolled ? 'scrolled' : ''} onClick={handleMenuClose}>{t('navbar.services')}</Link>
            </li>
            <li  className="nav-item">
              <Link href="/portfolio"  className={isScrolled ? 'scrolled' : ''} onClick={handleMenuClose}>{t('navbar.portfolio')}</Link>
            </li>
            <li  className="nav-item">
              <Link href="/blog"  className={isScrolled ? 'scrolled' : ''} onClick={handleMenuClose}>{t('navbar.blog')}</Link>
            </li>
            <li  className="nav-item">
              <Link href="/contact"  className={isScrolled ? 'scrolled' : ''} onClick={handleMenuClose}>{t('navbar.contact')}</Link>
            </li>
            <li  className="nav-item has-dropdown">
              <a href="/"  className={isScrolled ? 'scrolled' : ''} onClick={handleLanguageDropdownToggle}>
                {language}
              </a>
              <ul  className={`dropdown-menu ${isLanguageDropdownOpen ? 'show' : ''} ${isScrolled ? 'scrolled' : ''}`}>
                <li  className={isScrolled ? 'scrolled' : ''} onClick={() => handleLanguageChange('EN')}>
                  <ReactCountryFlag countryCode="US" svg  className="country-flags" /> EN
                </li>
                <li  className={isScrolled ? 'scrolled' : ''} onClick={() => handleLanguageChange('FR')}>
                  <ReactCountryFlag countryCode="FR" svg  className="country-flags" /> FR
                </li>
                <li  className={isScrolled ? 'scrolled' : ''} onClick={() => handleLanguageChange('NL')}>
                  <ReactCountryFlag countryCode="NL" svg  className="country-flags" /> NL
                </li>
                <li  className={isScrolled ? 'scrolled' : ''} onClick={() => handleLanguageChange('IT')}>
                  <ReactCountryFlag countryCode="IT" svg  className="country-flags" /> IT
                </li>
                <li  className={isScrolled ? 'scrolled' : ''} onClick={() => handleLanguageChange('DE')}>
                  <ReactCountryFlag countryCode="DE" svg  className="country-flags" /> DE
                </li>
                <li  className={`${isScrolled ? 'scrolled' : ''} last-link`} onClick={() => handleLanguageChange('ES')}>
                  <ReactCountryFlag countryCode="ES" svg  className="country-flags" /> ES
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
