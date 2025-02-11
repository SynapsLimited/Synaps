// context/userContext.tsx
'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  name: string;
  token?: string; // token is stored in an HTTP‑only cookie on the server
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/api/users/me', { withCredentials: true });
        // If no valid user data is returned, log out immediately.
        if (!response.data || response.data.message) {
          await axios.post('/api/users/logout', {}, { withCredentials: true });
          setCurrentUser(null);
          router.push('/login');
        } else {
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        try {
          await axios.post('/api/users/logout', {}, { withCredentials: true });
        } catch (logoutError) {
          console.error('Error during logout:', logoutError);
        }
        setCurrentUser(null);
        router.push('/login');
      }
    };

    fetchCurrentUser();
  }, [router]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
