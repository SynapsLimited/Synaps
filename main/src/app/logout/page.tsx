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
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/logout`,
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error during logout:", error);
      }
      setCurrentUser(null);
      router.push('/login');
    };
    performLogout();
  }, [setCurrentUser, router]);

  return null;
};

export default Logout;
