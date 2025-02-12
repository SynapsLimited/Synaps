// src/app/components/UserInitializer.tsx
'use client';

import { useEffect, useContext } from 'react';
import { UserContext } from '../../context/userContext';

export default function UserInitializer() {
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/users/me');
        if (!res.ok) {
          // If the response is not OK (e.g., 401/404), just set the user to null and exit.
          setCurrentUser(null);
          return;
        }
        const data = await res.json();
        setCurrentUser(data);
      } catch (error) {
        // In case of any network or other errors, silently set the user to null.
        setCurrentUser(null);
      }
    };

    fetchUser();
  }, [setCurrentUser]);

  return null;
}
