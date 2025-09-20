import React, { createContext, useContext } from 'react';
import Toast from './Toast';
import useToast from '../../hooks/useToast';

const ToastContext = createContext();

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const toastHook = useToast();

  return (
    <ToastContext.Provider value={toastHook}>
      {children}
      {/* Render all toasts */}
      <div className="toast-container">
        {toastHook.toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={toastHook.removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
