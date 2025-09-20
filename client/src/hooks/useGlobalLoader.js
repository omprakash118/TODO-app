import { useState, useCallback } from 'react';

const useGlobalLoader = () => {
  const [loaderState, setLoaderState] = useState({
    isVisible: false,
    type: 'spinner',
    message: 'Loading...',
    size: 'medium',
    color: 'blue',
    progress: 0,
    showPercentage: false,
    overlay: true,
  });

  const showLoader = useCallback((options = {}) => {
    setLoaderState(prev => ({
      ...prev,
      isVisible: true,
      ...options,
    }));
  }, []);

  const hideLoader = useCallback(() => {
    setLoaderState(prev => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  const updateProgress = useCallback((progress) => {
    setLoaderState(prev => ({
      ...prev,
      progress: Math.max(0, Math.min(100, progress)),
    }));
  }, []);

  const showSpinner = useCallback((message = 'Loading...', options = {}) => {
    showLoader({
      type: 'spinner',
      message,
      ...options,
    });
  }, [showLoader]);

  const showProgressBar = useCallback((message = 'Loading...', options = {}) => {
    showLoader({
      type: 'progress',
      message,
      progress: 0,
      ...options,
    });
  }, [showLoader]);

  // Predefined loader configurations
  const loaders = {
    // API call loaders
    apiCall: (message = 'Making API call...') => 
      showSpinner(message, { color: 'blue', size: 'medium' }),
    
    // Task operations
    creatingTask: () => 
      showSpinner('Creating task...', { color: 'green', size: 'medium' }),
    
    updatingTask: () => 
      showSpinner('Updating task...', { color: 'blue', size: 'medium' }),
    
    deletingTask: () => 
      showSpinner('Deleting task...', { color: 'red', size: 'medium' }),
    
    // File operations
    uploadingFile: (progress = 0) => 
      showProgressBar('Uploading file...', { 
        color: 'blue', 
        progress, 
        showPercentage: true 
      }),
    
    downloadingFile: (progress = 0) => 
      showProgressBar('Downloading file...', { 
        color: 'green', 
        progress, 
        showPercentage: true 
      }),
    
    // Authentication
    signingIn: () => 
      showSpinner('Signing in...', { color: 'blue', size: 'medium' }),
    
    signingOut: () => 
      showSpinner('Signing out...', { color: 'red', size: 'small' }),
    
    // Data operations
    loadingData: () => 
      showSpinner('Loading data...', { color: 'blue', size: 'medium' }),
    
    savingData: () => 
      showSpinner('Saving data...', { color: 'green', size: 'medium' }),
    
    // Custom progress operations
    processingData: (progress = 0) => 
      showProgressBar('Processing data...', { 
        color: 'purple', 
        progress, 
        showPercentage: true 
      }),
  };

  return {
    loaderState,
    showLoader,
    hideLoader,
    updateProgress,
    showSpinner,
    showProgressBar,
    loaders,
  };
};

export default useGlobalLoader;
