// context/userContext.tsx
'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/api/users/me', { withCredentials: true });
        // response.data is either a user object or null.
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
