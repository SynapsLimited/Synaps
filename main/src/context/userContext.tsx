'use client';

import React, { createContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  token?: string; // token is stored in an HTTP‑only cookie on the server
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate loading user data (replace with your actual logic)
  // For example, you might fetch the user from an API or check a cookie.
  React.useEffect(() => {
    // Simulate async load:
    setTimeout(() => {
      // For testing, set a user (or leave as null)
      // setCurrentUser({ id: '1', name: 'John Doe', token: 'abc123' });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
