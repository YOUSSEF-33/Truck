import React, { createContext, useContext } from 'react';
import { ar } from '../locales/ar';

interface LanguageContextType {
  t: typeof ar;
}

const LanguageContext = createContext<LanguageContextType>({ t: ar });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{ t: ar }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => useContext(LanguageContext);