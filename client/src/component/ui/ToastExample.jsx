import React from 'react';
import { useToastContext } from './ToastProvider';

const ToastExample = () => {
  const { toast } = useToastContext();

  const showSuccessToast = () => {
    toast.success("Operation completed successfully!");
  };

  const showErrorToast = () => {
    toast.error("Something went wrong. Please try again.");
  };

  const showWarningToast = () => {
    toast.warning("Please check your input before proceeding.");
  };

  const showInfoToast = () => {
    toast.info("Here's some useful information for you.");
  };

  const showLoadingToast = () => {
    const loadingId = toast.loading("Processing your request...");
    
    // Simulate async operation
    setTimeout(() => {
      toast.removeToast(loadingId);
      toast.success("Processing completed!");
    }, 3000);
  };

  const showCustomToast = () => {
    toast.custom({
      type: 'success',
      title: 'Custom Toast',
      message: 'This is a custom toast with different styling.',
      duration: 0, // No auto dismiss
      position: 'bottom-center',
      action: (
        <button 
          onClick={() => toast.info("Action button clicked!")}
          className="text-green-600 hover:text-green-800 font-medium text-sm"
        >
          View Details
        </button>
      )
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Toast Examples</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          onClick={showSuccessToast}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Success Toast
        </button>
        
        <button
          onClick={showErrorToast}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Error Toast
        </button>
        
        <button
          onClick={showWarningToast}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Warning Toast
        </button>
        
        <button
          onClick={showInfoToast}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Info Toast
        </button>
        
        <button
          onClick={showLoadingToast}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Loading Toast
        </button>
        
        <button
          onClick={showCustomToast}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Custom Toast
        </button>
      </div>
    </div>
  );
};

export default ToastExample;
