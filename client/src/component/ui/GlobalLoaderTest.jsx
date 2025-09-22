import React from 'react';
import { useGlobalLoaderContext } from './GlobalLoaderProvider';

const GlobalLoaderTest = () => {
  const { loaders, hideLoader, updateProgress, debugLoader } = useGlobalLoaderContext();

  const testSpinner = () => {
    loaders.apiCall('Testing spinner loader...');
    setTimeout(() => {
      hideLoader();
    }, 3000);
  };

  const testProgressBar = () => {
    loaders.uploadingFile(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      updateProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          hideLoader();
        }, 500);
      }
    }, 200);
  };

  const testTaskCreation = () => {
    loaders.creatingTask();
    setTimeout(() => {
      hideLoader();
    }, 2000);
  };

  const testCustomLoader = () => {
    loaders.showSpinner('Custom test message', { 
      color: 'purple', 
      size: 'large',
      overlay: true 
    });
    setTimeout(() => {
      hideLoader();
    }, 2500);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">GlobalLoader Test</h2>
      
      <div className="space-y-3">
        <button
          onClick={testSpinner}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Test Spinner Loader
        </button>
        
        <button
          onClick={testProgressBar}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Test Progress Bar
        </button>
        
        <button
          onClick={testTaskCreation}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Test Task Creation
        </button>
        
        <button
          onClick={testCustomLoader}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Test Custom Loader
        </button>
        
        <button
          onClick={debugLoader}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Debug Loader State
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
        <p><strong>Instructions:</strong></p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Click any button to test different loader types</li>
          <li>Check browser console for debug logs</li>
          <li>Verify loaders appear and disappear correctly</li>
        </ul>
      </div>
    </div>
  );
};

export default GlobalLoaderTest;
