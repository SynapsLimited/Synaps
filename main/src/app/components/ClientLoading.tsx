// src/app/components/ClientLoading.tsx
'use client';

import React, { useEffect, useState, ReactNode, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from './LoadingScreen'; // Ensure this component exists

interface ClientLoadingProps {
  children: ReactNode;
}

const ClientLoading: React.FC<ClientLoadingProps> = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // Define a callback to be called when LoadingScreen finishes
  const handleLoadingFinish = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Trigger loading when pathname changes
    setIsLoading(true);
  }, [pathname]);

  return (
    <>
      {isLoading && <LoadingScreen />} {/* Pass the callback */}
      {children}
    </>
  );
};

export default ClientLoading;
