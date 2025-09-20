import React, { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Loader2 } from "lucide-react";

const Toast = ({
  id,
  type = "info", // "success", "error", "warning", "info", "loading"
  title = "",
  message = "",
  duration = 5000, // Auto dismiss duration in ms (0 = no auto dismiss)
  position = "top-right", // "top-right", "top-left", "bottom-right", "bottom-left", "top-center", "bottom-center"
  onClose,
  action,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Show toast with animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto dismiss
  useEffect(() => {
    if (duration > 0 && type !== "loading") {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, type]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Match animation duration
  };

  // Icon and color configuration
  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          iconColor: "text-green-500",
          titleColor: "text-green-800",
          messageColor: "text-green-700",
        };
      case "error":
        return {
          icon: AlertCircle,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-500",
          titleColor: "text-red-800",
          messageColor: "text-red-700",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          iconColor: "text-yellow-500",
          titleColor: "text-yellow-800",
          messageColor: "text-yellow-700",
        };
      case "loading":
        return {
          icon: Loader2,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconColor: "text-blue-500",
          titleColor: "text-blue-800",
          messageColor: "text-blue-700",
        };
      default: // info
        return {
          icon: Info,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconColor: "text-blue-500",
          titleColor: "text-blue-800",
          messageColor: "text-blue-700",
        };
    }
  };

  const config = getToastConfig();
  const Icon = config.icon;

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-center":
        return "top-4 left-1/2 transform -translate-x-1/2";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-center":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "top-4 right-4";
    }
  };

  return (
    <div
      className={`fixed z-[10000] max-w-sm w-full mx-4 ${getPositionClasses()} ${
        isVisible && !isExiting
          ? "animate-slide-in"
          : isExiting
          ? "animate-slide-out"
          : "opacity-0 scale-95"
      } transition-all duration-300 ease-out ${className}`}
    >
      <div
        className={`${config.bgColor} ${config.borderColor} border rounded-xl shadow-lg p-4 backdrop-blur-sm`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon
              className={`w-5 h-5 ${config.iconColor} ${
                type === "loading" ? "animate-spin" : ""
              }`}
            />
          </div>
          <div className="ml-3 flex-1">
            {title && (
              <p className={`text-sm font-semibold ${config.titleColor}`}>
                {title}
              </p>
            )}
            {message && (
              <p className={`text-sm ${config.messageColor} ${title ? "mt-1" : ""}`}>
                {message}
              </p>
            )}
            {action && (
              <div className="mt-3">
                {action}
              </div>
            )}
          </div>
          {type !== "loading" && (
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={handleClose}
                className={`inline-flex rounded-md p-1.5 ${config.iconColor} hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition-colors`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toast;
