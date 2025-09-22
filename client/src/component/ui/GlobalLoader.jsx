import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const GlobalLoader = ({
  type = "spinner", // "spinner" or "progress"
  isVisible = false,
  message = "Loading...",
  size = "medium", // "small", "medium", "large"
  color = "blue", // "blue", "green", "red", "yellow", "purple"
  progress = 0, // 0-100 for progress bar
  showPercentage = false,
  className = "",
  overlay = true, // Show backdrop overlay for spinner
}) => {
  const [progressWidth, setProgressWidth] = useState(0);

  // Animate progress bar
  useEffect(() => {
    if (type === "progress" && isVisible) {
      const timer = setTimeout(() => {
        setProgressWidth(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!isVisible) {
      setProgressWidth(0);
    }
  }, [progress, isVisible, type]);

  // Size configurations
  const sizeConfig = {
    small: {
      spinner: "w-4 h-4",
      text: "text-sm",
      container: "p-2",
    },
    medium: {
      spinner: "w-6 h-6",
      text: "text-base",
      container: "p-4",
    },
    large: {
      spinner: "w-8 h-8",
      text: "text-lg",
      container: "p-6",
    },
  };

  // Color configurations
  const colorConfig = {
    blue: {
      spinner: "text-blue-600",
      progress: "bg-blue-600",
      text: "text-blue-600",
    },
    green: {
      spinner: "text-green-600",
      progress: "bg-green-600",
      text: "text-green-600",
    },
    red: {
      spinner: "text-red-600",
      progress: "bg-red-600",
      text: "text-red-600",
    },
    yellow: {
      spinner: "text-yellow-600",
      progress: "bg-yellow-600",
      text: "text-yellow-600",
    },
    purple: {
      spinner: "text-purple-600",
      progress: "bg-purple-600",
      text: "text-purple-600",
    },
  };

  if (!isVisible) return null;

  // Spinner Loader
  if (type === "spinner") {
    return (
      <>
        {/* Backdrop Overlay */}
        {overlay && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999] flex items-center justify-center">
            <div className={`bg-white rounded-2xl shadow-2xl ${sizeConfig[size].container} ${className}`}>
              <div className="flex flex-col items-center space-y-3">
                <Loader2 
                  className={`${sizeConfig[size].spinner} ${colorConfig[color].spinner} animate-spin`} 
                />
                {message && (
                  <p className={`${sizeConfig[size].text} ${colorConfig[color].text} font-medium`}>
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Inline Spinner (no overlay) */}
        {!overlay && (
          <div className={`flex items-center justify-center ${sizeConfig[size].container} ${className}`}>
            <div className="flex flex-col items-center space-y-2">
              <Loader2 
                className={`${sizeConfig[size].spinner} ${colorConfig[color].spinner} animate-spin`} 
              />
              {message && (
                <p className={`${sizeConfig[size].text} ${colorConfig[color].text} font-medium`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  // Progress Bar Loader
  if (type === "progress") {
    return (
      <div className={`fixed top-0 left-0 right-0 z-[10000] ${className}`}>
        <div className="w-full bg-gray-200 h-1">
          <div
            className={`h-full ${colorConfig[color].progress} transition-all duration-500 ease-out`}
            style={{ width: `${progressWidth}%` }}
          />
        </div>
        {(message || showPercentage) && (
          <div className="bg-white border-b border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between">
              {message && (
                <p className={`text-sm ${colorConfig[color].text} font-medium`}>
                  {message}
                </p>
              )}
              {showPercentage && (
                <p className={`text-sm ${colorConfig[color].text} font-medium`}>
                  {Math.round(progressWidth)}%
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default GlobalLoader;
