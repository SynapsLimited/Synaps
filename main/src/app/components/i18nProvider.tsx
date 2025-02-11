'use client'; // Ensure this is a client component

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n'; // Adjust the path as necessary

interface I18nProviderProps {
  children: React.ReactNode;
}

const I18nProvider = ({ children }: I18nProviderProps) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
