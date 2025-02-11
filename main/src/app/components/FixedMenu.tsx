// components/FixedMenu.tsx
'use client';

import React, { useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import './../css/FixedMenu.css';
import { UserContext } from '../../context/userContext';

const FixedMenu = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useContext(UserContext);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // If there's no logged-in user or if we're on the login page, do not render the FixedMenu.
  if (!currentUser || pathname === '/login') {
    return null;
  }

  return (
    <div className="fixed-menu" ref={menuRef}>
      <div
        className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`}
        onClick={handleMenuToggle}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={`menu-content ${isMenuOpen ? 'show' : ''}`}>
        <li className="welcome-user"><b>{currentUser?.name}</b></li>
        <li><Link href="/posts">{t('fixedMenu.allPosts')}</Link></li>
        <li><Link href={`/profile/${currentUser.id}`}>{t('fixedMenu.profile')}</Link></li>
        <li><Link href="/blog/create">{t('fixedMenu.create')}</Link></li>
        <li><Link href="/authors">{t('fixedMenu.authors')}</Link></li>
        <li><Link href="/logout">{t('fixedMenu.logout')}</Link></li>
      </ul>
    </div>
  );
};

export default FixedMenu;
