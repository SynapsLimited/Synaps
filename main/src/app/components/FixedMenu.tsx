'use client'


import React, { useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import './../css/FixedMenu.css';
import { UserContext } from '../../context/userContext';

const FixedMenu = () => {
    const { t } = useTranslation(); // Initialize translation
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser } = useContext(UserContext);
    const menuRef = useRef<HTMLDivElement | null>(null);

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

    if (!currentUser) {
        return null; // If there is no logged-in user, do not render the menu
    }

    return (
        <div  className="fixed-menu" ref={menuRef}>
            <div
                 className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`}
                onClick={handleMenuToggle}
            >
                <span  className="bar"></span>
                <span  className="bar"></span>
                <span  className="bar"></span>
            </div>
            <ul  className={`menu-content ${isMenuOpen ? 'show' : ''}`}>
                <li  className="welcome-user"><b>{currentUser?.name}</b></li>
                <li><Link href={`/profile/${currentUser.id}`}>{t('fixedMenu.profile')}</Link></li> {/* Translated "Profile" */}
                <li><Link href={`/dashboard/${currentUser.id}`}>Dashboard</Link></li> {/* Dashboard */}
                <li><Link href="/posts">{t('fixedMenu.allPosts')}</Link></li> {/* Translated "All Posts" */}
                <li><Link href="/blog/create">{t('fixedMenu.create')}</Link></li> {/* Translated "Create" */}
                <li><Link href="/logout">{t('fixedMenu.logout')}</Link></li> {/* Translated "Log out" */}
            </ul>
        </div>
    );
};

export default FixedMenu;
