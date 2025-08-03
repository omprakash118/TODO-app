// components/SubmitButton.jsx
import React from "react";

export default function Buttons({ isLoading = false, type = "submit" , btnName = 'Submit' , loadingText = 'Submiting...' }) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] focus:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>{loadingText}</span>
        </div>
      ) : (
        btnName
      )}
    </button>
  );
}
