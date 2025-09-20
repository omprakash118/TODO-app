import { useState, useCallback } from 'react';

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      title: '',
      message: '',
      duration: 5000,
      position: 'top-right',
      ...toast,
    };
    
    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Predefined toast methods
  const toast = {
    success: (message, options = {}) => 
      addToast({
        type: 'success',
        title: 'Success',
        message,
        duration: 4000,
        ...options,
      }),
    
    error: (message, options = {}) => 
      addToast({
        type: 'error',
        title: 'Error',
        message,
        duration: 6000,
        ...options,
      }),
    
    warning: (message, options = {}) => 
      addToast({
        type: 'warning',
        title: 'Warning',
        message,
        duration: 5000,
        ...options,
      }),
    
    info: (message, options = {}) => 
      addToast({
        type: 'info',
        title: 'Info',
        message,
        duration: 4000,
        ...options,
      }),
    
    loading: (message, options = {}) => 
      addToast({
        type: 'loading',
        title: 'Loading',
        message,
        duration: 0, // No auto dismiss for loading
        ...options,
      }),
    
    custom: (options) => addToast(options),
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    toast,
  };
};

export default useToast;
