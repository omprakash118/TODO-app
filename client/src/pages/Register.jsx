import React, { useState } from "react";
import LoginHead from "../component/LoginHead";
import { User, Eye, EyeOff, Mail, Lock, Check, X } from "lucide-react";
import Buttons from "../component/ui/Buttons";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <LoginHead />
        <div className="bg-white/80 backdrop-blur-md mt-4 shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
          <form
            className="space-y-5"
            onClick={(e) => {
              e.preventDefault();
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 2000);
            }}
          >
            <div className="grid grid-cols-2 gap-4">
                
            {/* First Name */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50/60 focus:bg-white border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500 text-sm"
                />
              </div>
            </div>

            {/* Last Name */}

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50/60 focus:bg-white border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500 text-sm"
                />
              </div>
            </div>
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50/60 focus:bg-white border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  required
                  className="w-full pl-10 pr-10 py-3 border rounded-xl bg-gray-50/60 focus:bg-white border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500 text-sm"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                >
                  {/* Password toggle icon */}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="w-full pl-10 pr-10 py-3 border rounded-xl bg-gray-50/60 focus:bg-white border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500 text-sm"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                >
                  {/* Confirm password toggle icon */}
                </button>
              </div>
            </div>

            <Buttons isLoading={isLoading} btnName="Register" loadingText="Register..." />
          </form>
        </div>
      </div>
    </div>
  );
}
