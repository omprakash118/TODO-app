import React, { createContext, useContext } from 'react';
import GlobalLoader from './GlobalLoader';
import useGlobalLoader from '../../hooks/useGlobalLoader';

const GlobalLoaderContext = createContext();

export const useGlobalLoaderContext = () => {
  const context = useContext(GlobalLoaderContext);
  if (!context) {
    throw new Error('useGlobalLoaderContext must be used within a GlobalLoaderProvider');
  }
  return context;
};

export const GlobalLoaderProvider = ({ children }) => {
  const loaderHook = useGlobalLoader();

  return (
    <GlobalLoaderContext.Provider value={loaderHook}>
      {children}
      <GlobalLoader {...loaderHook.loaderState} />
    </GlobalLoaderContext.Provider>
  );
};

export default GlobalLoaderProvider;
