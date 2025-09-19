import { useEffect } from 'react';

/**
 * Custom hook to prevent body scrolling when modal is open
 * @param {boolean} isOpen - Whether the modal is open
 * @param {string} method - Scroll prevention method ('fixed', 'overflow', 'touch')
 */
export const useScrollLock = (isOpen, method = 'fixed') => {
  useEffect(() => {
    if (!isOpen) return;

    // Save current scroll position
    const scrollY = window.scrollY;
    const body = document.body;

    // Apply scroll prevention based on method
    switch (method) {
      case 'fixed':
        // Most reliable method - fixes body position
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
        body.style.overflow = 'hidden';
        break;
        
      case 'overflow':
        // Simple overflow hidden
        body.style.overflow = 'hidden';
        break;
        
      case 'touch':
        // Touch action prevention for mobile
        body.style.touchAction = 'none';
        body.style.overflow = 'hidden';
        break;
        
      case 'class':
        // CSS class method
        body.classList.add('modal-open');
        break;
        
      default:
        // Default to fixed method
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
        body.style.overflow = 'hidden';
    }

    // Cleanup function
    return () => {
      // Reset all styles
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflow = '';
      body.style.touchAction = '';
      body.classList.remove('modal-open');
      
      // Restore scroll position for fixed method
      if (method === 'fixed' || method === 'default') {
        window.scrollTo(0, scrollY);
      }
    };
  }, [isOpen, method]);
};

/**
 * Simple hook for basic scroll prevention
 * @param {boolean} isOpen - Whether the modal is open
 */
export const useSimpleScrollLock = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);
};

export default useScrollLock;
