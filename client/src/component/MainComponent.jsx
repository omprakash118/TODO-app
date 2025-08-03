import React from "react";
import {
  Plus, CheckCircle2, Target, Clock, Circle,
  Calendar, Star, Edit3, Trash2
} from 'lucide-react';

export default function MainComponent(){
    return(
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Total Tasks</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <Target className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm">Completed</p>
                      <p className="text-2xl font-bold text-green-700">1</p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm">In Progress</p>
                      <p className="text-2xl font-bold text-orange-700">4</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Progress Chart */}
              <div className="mb-6">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-200" stroke="currentColor" strokeWidth="3" fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-purple-600" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                        fill="none" strokeDasharray="20, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-800">20%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Progress Today</p>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
                <div className="space-y-1">
                  {['All', 'Work', 'Personal', 'Health', 'Shopping'].map((cat) => (
                    <button key={cat} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
                      {cat}
                      <span className="float-right text-xs text-gray-400">2</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Good morning, John! 👋</h2>
              <p className="text-gray-600">You have 4 tasks pending. Let's get productive!</p>
            </div>

            {/* Add Task UI */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <button className="w-full flex items-center justify-center space-x-3 py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200">
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add new task</span>
              </button>
            </div>

            {/* Static Task Example */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border-l-4 border-red-500 bg-red-50 p-6 hover:shadow-md transition-all duration-200">
                <div className="flex items-start space-x-4">
                  <Circle className="w-6 h-6 text-gray-400 mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Complete project proposal</h3>
                        <p className="mt-1 text-sm text-gray-600">Finish the Q4 project proposal for client review</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">high priority</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Work</span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" /> 2025-08-05
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-2 text-yellow-500 hover:text-yellow-600"><Star className="w-4 h-4 fill-current" /></button>
                        <button className="p-2 text-blue-500"><Edit3 className="w-4 h-4" /></button>
                        <button className="p-2 text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
        </div>
    )
}