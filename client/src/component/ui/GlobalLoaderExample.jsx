import React from 'react';
import { useGlobalLoaderContext } from './GlobalLoaderProvider';

// Example component showing how to use the GlobalLoader
const GlobalLoaderExample = () => {
  const { loaders, hideLoader, updateProgress } = useGlobalLoaderContext();

  const handleApiCall = async () => {
    loaders.apiCall('Fetching user data...');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    hideLoader();
  };

  const handleFileUpload = async () => {
    loaders.uploadingFile(0);
    
    // Simulate file upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      updateProgress(i);
    }
    
    hideLoader();
  };

  const handleTaskCreation = async () => {
    loaders.creatingTask();
    // Simulate task creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    hideLoader();
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">GlobalLoader Examples</h2>
      
      <div className="space-y-2">
        <button
          onClick={handleApiCall}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Test API Call Loader
        </button>
        
        <button
          onClick={handleFileUpload}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Test File Upload Progress
        </button>
        
        <button
          onClick={handleTaskCreation}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Test Task Creation
        </button>
      </div>
    </div>
  );
};

export default GlobalLoaderExample;
