import React, { useState } from "react";
import LoginHead from "../component/LoginHead";
import { User, Eye, EyeOff, Mail, Lock, Check, X } from "lucide-react";
import Buttons from "../component/ui/Buttons";
import { Link } from "react-router-dom";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData , setformData] = useState({
    FirstName : '',
    LastName : '',
    email : '',
    password : '',
  });

  const handleChange = (e) => {
    setformData({
      ...formData , 
      [e.target.id] : e.target.value
    });
  }

  const handleRegister = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      
      try {
        
        const response = await fetch('http://localhost:8000/api/register', {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            credentials : 'include',
            body : JSON.stringify(formData),
          }
        ); 

        const data = await response.json();

        if(!response.ok) throw new Error(data.message || "User not Register");

        alert("✅ Registration success:");

        console.log("✅ Registration success:", data);

      } catch (error) {
        console.log("❌ User not created :- ", error);
      }finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4">
      <div className="w-full max-w-md">
        <LoginHead />
        
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">Get Started 🚀</h1>
              <p className="text-gray-500 text-sm">Register to create your account</p>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleRegister}
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
                  id="FirstName"
                  type="text"
                  placeholder="John"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50/60 focus:bg-white border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500 text-sm"
                  value={formData.FirstName}
                  onChange={handleChange}
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
                  id="LastName"
                  type="text"
                  placeholder="Doe"
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50/60 focus:bg-white border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500 text-sm"
                  value={formData.LastName}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                >
                  {/* Password toggle icon */}
                </button>
              </div>
            </div>

            <Buttons isLoading={isLoading} btnName="Register" loadingText="Register..." />
          </form>  
          {/* Divider or bottom */}
          <div className="text-center text-sm text-gray-500">
            You have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
