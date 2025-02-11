// context/userContext.tsx
'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  // Define a list of protected routes (or prefixes) that require authentication.
  // You can adjust this list as needed.
  const protectedRoutes = ['/blog/create', '/dashboard', '/profile'];

  useEffect(() => {
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/api/users/me', { withCredentials: true });
        // If no valid user data is returned...
        if (!response.data || response.data.message) {
          // ...and the user is on a protected route, then log out and redirect to homepage.
          if (isProtectedRoute) {
            await axios.post('/api/users/logout', {}, { withCredentials: true });
            setCurrentUser(null);
            router.push('/');
          }
          // Otherwise, on a public page, just ensure currentUser remains null.
        } else {
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        if (isProtectedRoute) {
          try {
            await axios.post('/api/users/logout', {}, { withCredentials: true });
          } catch (logoutError) {
            console.error('Error during logout:', logoutError);
          }
          setCurrentUser(null);
          router.push('/');
        }
      }
    };

    fetchCurrentUser();
  }, [router, pathname]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
