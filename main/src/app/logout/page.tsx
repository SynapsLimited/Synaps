// app/logout/page.tsx
'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserContext } from '@/context/userContext';

const Logout: React.FC = () => {
  const { setCurrentUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post(
          `/api/users/logout`,
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.error('Error during logout:', error);
      }
      setCurrentUser(null);
      // Set the flag so that the UserProvider stops trying to rehydrate the user.
      localStorage.setItem('loggedOut', 'true');
      router.push('/login');
    };
    performLogout();
  }, [setCurrentUser, router]);

  return null;
};

export default Logout;
