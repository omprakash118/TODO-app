import React, { useState } from "react";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import Buttons from "./ui/Buttons";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="max-w-md mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h1>
        <p className="text-gray-500 text-sm">Sign in to continue to your account</p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000); // Dummy delay
      }}>
        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-purple-600 hover:underline font-medium"
            >
              Forgot password?
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Buttons
            isLoading={isLoading}
            btnName="Sign In"
            loadingText="Signing in..."
          />
        </div>
      </form>

      {/* Divider or bottom */}
      <div className="text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <a href="#" className="text-purple-600 hover:underline font-medium">
          Sign up
        </a>
      </div>
    </div>
  );
}
