// components/SubmitButton.jsx
import React from "react";

function Btns({ isLoading = false, type = "submit" , btnName = 'Submit' , loadingText = 'Submiting...' }) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className="w-auto py-2 px-4 bg-[#3c83f6] text-[#f3f4f6] font-semibold rounded-lg hover:scale-[1.02] focus:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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

export default Btns;
