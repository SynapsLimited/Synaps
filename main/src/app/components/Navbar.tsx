"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import "./../css/navbar.css"
import ReactCountryFlag from "react-country-flag"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [language, setLanguage] = useState("EN")
  const [isMobile, setIsMobile] = useState(false)

  // Properly typed refs for TypeScript
  const languageDropdownRef = useRef<HTMLLIElement>(null)
  const mobileMenuRef = useRef<HTMLUListElement>(null)
  const mobileLanguageRef = useRef<HTMLLIElement>(null)

  const pathname = usePathname()

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // Close language dropdown when toggling mobile menu
    if (!isMobileMenuOpen) {
      setIsLanguageDropdownOpen(false)
    }
  }

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false)
    setIsLanguageDropdownOpen(false)
  }

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50)
  }

  const handleLanguageDropdown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    i18n.changeLanguage(lang.toLowerCase())
    localStorage.setItem("preferredLanguage", lang)
    setIsLanguageDropdownOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  // Handle clicks outside of dropdown and mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close language dropdown if clicked outside
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node) &&
        isLanguageDropdownOpen &&
        !isMobile
      ) {
        setIsLanguageDropdownOpen(false)
      }

      // Close mobile language dropdown if clicked outside
      if (
        mobileLanguageRef.current &&
        !mobileLanguageRef.current.contains(event.target as Node) &&
        isLanguageDropdownOpen &&
        isMobile
      ) {
        setIsLanguageDropdownOpen(false)
      }

      // Close mobile menu if clicked outside
      if (
        isMobile &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !document.getElementById("mobile-menu")?.contains(event.target as Node) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isLanguageDropdownOpen, isMobileMenuOpen, isMobile])

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage")
    if (savedLanguage) {
      setLanguage(savedLanguage)
      i18n.changeLanguage(savedLanguage.toLowerCase())
    }

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 800)
      // Close mobile menu when resizing to desktop
      if (window.innerWidth > 800) {
        setIsMobileMenuOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [i18n])

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.1 },
    },
  }

  // Animation variants for dropdown
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      scale: 0.95,
      transformOrigin: "top center",
    },
    visible: {
      opacity: 1,
      height: "auto",
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.25,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  // Animation variants for language items
  const languageItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.1 },
    },
    hover: {
      scale: 1.1, // Updated to 1.1 as requested
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className={`page-wrapper ${isScrolled ? "scrolled" : ""}`}>
      <div className={`nav-wrapper ${isScrolled ? "scrolled" : ""}`}>
        <nav className="navbar">
          <Link href="/" onClick={handleMenuClose}>
            <img
              src="/assets/Synaps Logos/Synaps Logo Art navbar.png"
              alt="Company Logo"
              className={isScrolled ? "scrolled" : ""}
            />
          </Link>
          <div
            className={`menu-toggle ${isMobileMenuOpen ? "is-active" : ""}`}
            id="mobile-menu"
            onClick={handleMenuToggle}
          >
            <span className={`bar ${isScrolled ? "scrolled" : ""}`}></span>
            <span className={`bar ${isScrolled ? "scrolled" : ""}`}></span>
            <span className={`bar ${isScrolled ? "scrolled" : ""}`}></span>
          </div>

          {isMobile ? (
            <AnimatePresence mode="wait">
              {isMobileMenuOpen && (
                <motion.ul
                  className="nav mobile-nav"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={mobileMenuVariants}
                  ref={mobileMenuRef}
                >
                  <motion.li className={`nav-item ${isActive("/") ? "active" : ""}`} variants={menuItemVariants}>
                    <Link href="/" onClick={handleMenuClose}>
                      {t("navbar.home")}
                    </Link>
                  </motion.li>
                  <motion.li className={`nav-item ${isActive("/about") ? "active" : ""}`} variants={menuItemVariants}>
                    <Link href="/about" onClick={handleMenuClose}>
                      {t("navbar.about")}
                    </Link>
                  </motion.li>
                  <motion.li
                    className={`nav-item ${isActive("/services") ? "active" : ""}`}
                    variants={menuItemVariants}
                  >
                    <Link href="/services" onClick={handleMenuClose}>
                      {t("navbar.services")}
                    </Link>
                  </motion.li>
                  <motion.li
                    className={`nav-item ${isActive("/portfolio") ? "active" : ""}`}
                    variants={menuItemVariants}
                  >
                    <Link href="/portfolio" onClick={handleMenuClose}>
                      {t("navbar.portfolio")}
                    </Link>
                  </motion.li>
                  <motion.li className={`nav-item ${isActive("/blog") ? "active" : ""}`} variants={menuItemVariants}>
                    <Link href="/blog" onClick={handleMenuClose}>
                      {t("navbar.blog")}
                    </Link>
                  </motion.li>
                  <motion.li className={`nav-item ${isActive("/contact") ? "active" : ""}`} variants={menuItemVariants}>
                    <Link href="/contact" onClick={handleMenuClose}>
                      {t("navbar.contact")}
                    </Link>
                  </motion.li>
                  <motion.li className="nav-item language-selector" variants={menuItemVariants} ref={mobileLanguageRef}>
                    <a href="/" onClick={handleLanguageDropdown} className="language-toggle">
                      <span className="current-language">{language}</span>
                    </a>
                    <AnimatePresence mode="wait">
                      {isLanguageDropdownOpen && (
                        <motion.div
                          className="mobile-dropdown "
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                        >
                          <motion.div
                            className="language-item"
                            variants={languageItemVariants}
                            whileHover="hover"
                            onClick={() => handleLanguageChange("EN")}
                          >
                            <ReactCountryFlag countryCode="GB" svg className="country-flags" /> EN
                          </motion.div>
                          <motion.div
                            className="language-item"
                            variants={languageItemVariants}
                            whileHover="hover"
                            onClick={() => handleLanguageChange("FR")}
                          >
                            <ReactCountryFlag countryCode="FR" svg className="country-flags" /> FR
                          </motion.div>
                          <motion.div
                            className="language-item"
                            variants={languageItemVariants}
                            whileHover="hover"
                            onClick={() => handleLanguageChange("DE")}
                          >
                            <ReactCountryFlag countryCode="DE" svg className="country-flags" /> DE
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          ) : (
            <ul className="nav desktop-nav ">
              <li className={`nav-item ${isActive("/") ? "active" : ""}`}>
                <Link href="/" onClick={handleMenuClose}>
                  {t("navbar.home")}
                </Link>
              </li>
              <li className={`nav-item ${isActive("/about") ? "active" : ""}`}>
                <Link href="/about" onClick={handleMenuClose}>
                  {t("navbar.about")}
                </Link>
              </li>
              <li className={`nav-item ${isActive("/services") ? "active" : ""}`}>
                <Link href="/services" onClick={handleMenuClose}>
                  {t("navbar.services")}
                </Link>
              </li>
              <li className={`nav-item ${isActive("/portfolio") ? "active" : ""}`}>
                <Link href="/portfolio" onClick={handleMenuClose}>
                  {t("navbar.portfolio")}
                </Link>
              </li>
              <li className={`nav-item ${isActive("/blog") ? "active" : ""}`}>
                <Link href="/blog" onClick={handleMenuClose}>
                  {t("navbar.blog")}
                </Link>
              </li>
              <li className={`nav-item ${isActive("/contact") ? "active" : ""}`}>
                <Link href="/contact" onClick={handleMenuClose}>
                  {t("navbar.contact")}
                </Link>
              </li>
              <li className="nav-item language-selector" ref={languageDropdownRef}>
                <a href="/" onClick={handleLanguageDropdown} className="language-toggle">
                  {language}
                </a>
                <AnimatePresence mode="wait">
                  {isLanguageDropdownOpen && (
                    <motion.div
                      className="desktop-dropdown "
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                    >
                      <motion.div
                        className="language-item"
                        variants={languageItemVariants}
                        whileHover="hover"
                        onClick={() => handleLanguageChange("EN")}
                      >
                        <ReactCountryFlag countryCode="GB" svg className="country-flags" /> EN
                      </motion.div>
                      <motion.div
                        className="language-item"
                        variants={languageItemVariants}
                        whileHover="hover"
                        onClick={() => handleLanguageChange("FR")}
                      >
                        <ReactCountryFlag countryCode="FR" svg className="country-flags" /> FR
                      </motion.div>
                      <motion.div
                        className="language-item"
                        variants={languageItemVariants}
                        whileHover="hover"
                        onClick={() => handleLanguageChange("DE")}
                      >
                        <ReactCountryFlag countryCode="DE" svg className="country-flags" /> DE
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Navbar

