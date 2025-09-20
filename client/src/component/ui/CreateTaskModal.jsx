import React, { useState, useEffect, useCallback } from "react";
import { X, Calendar, ChevronDown, User, Users, FileText, Clock, Flag, FolderOpen, AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { useScrollLock } from "../../hooks/useScrollLock";
import CustomDropdown from "./CustomDropdown";
import { useGlobalLoaderContext } from "./GlobalLoaderProvider";
import { useToastContext } from "./ToastProvider";
import axios from "axios";

export default function CreateTaskModal({ isOpen, onClose, onSubmit }) {
  // Fallback for when GlobalLoader context is not available
  let loaders, hideLoader;
  try {
    const loaderContext = useGlobalLoaderContext();
    loaders = loaderContext.loaders;
    hideLoader = loaderContext.hideLoader;
  } catch (error) {
    // Fallback to local loading state if context is not available
    console.warn('GlobalLoader context not available, using fallback loading state');
    loaders = {
      loadingData: () => {},
      creatingTask: () => {},
    };
    hideLoader = () => {};
  }

  // Toast context
  const { toast } = useToastContext();

  // Memoize loader functions to prevent infinite loops
  const showLoadingData = useCallback(() => {
    loaders.loadingData();
  }, [loaders]);

  const hideLoading = useCallback(() => {
    hideLoader();
  }, [hideLoader]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    groupID: "",
    status: "pending",
    assignTo: []
  });
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await axios.get('api/group');
        const data = response.data.data;
        console.log("created task Groups :- ", data);
        setGroups(data);
        console.log("set groups data :- ", setGroups)
      } catch (error) {
        console.log("Error :- ", error);
        toast.error("Failed to load groups. Please try again.");
      }
    }
    getGroups();
  }, [toast]); // Only run once when component mounts

  useEffect(() => {
    const getUsers = async () => {
      if (formData.groupID) {
        try {
          const response = await axios.get(`api/group/members/${formData.groupID}`);
          const data = response.data.data;
          // console.log("Users :- ", data);
          setUsers(data);
        } catch (error) {
          console.log("Error :- ", error);
          toast.error("Failed to load group members. Please try again.");
        }
      } else {
        setUsers([]); // Clear users when no group is selected
      }
    }
    getUsers();
  }, [formData.groupID, toast]); // Only depend on formData.groupID

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const priorities = ["low", "medium", "high"];

  // Use the custom hook to prevent background scrolling
  useScrollLock(isOpen, 'overflow');

  useEffect(() => {
    if (isOpen) {
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleUserToggle = (userId) => {
    setFormData(prev => ({
      ...prev,
      assignTo: prev.assignTo.includes(userId)
        ? prev.assignTo.filter(id => id !== userId)
        : [...prev.assignTo, userId]
    }));
    
    // Clear error when user makes selection
    if (errors.assignTo) {
      setErrors(prev => ({
        ...prev,
        assignTo: ""
      }));
    }
  };

  const removeUser = (userId) => {
    setFormData(prev => ({
      ...prev,
      assignTo: prev.assignTo.filter(id => id !== userId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    
    if (!formData.groupID) {
      newErrors.groupID = "Please select a group";
      newErrors.group = "Please select a group";
    }
    
    if (formData.groupID && formData.assignTo.length === 0) {
      newErrors.assignTo = "Please assign the task to at least one user";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        loaders.creatingTask();
        // console.log("Form data :- ", formData);
        // console.log("OMsubmit :- ", onSubmit);
        await onSubmit(formData);
        // Reset form
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          priority: "medium",
          groupID: "",
          status: "pending",
          assignTo: []
        });
        setErrors({});
        onClose();
        hideLoader();
        toast.success("Task created successfully!");
      } catch (error) {
        console.error("Error creating task:", error);
        hideLoader();
        toast.error("Failed to create task. Please try again.");
      }
    } else {
      toast.warning("Please fill in all required fields.");
    }
  };

  const handleClose = () => {
    setIsLoading(false);
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      groupID: "",
      status: "pending",
      assignTo: []
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1
        }}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all scale-100 z-10"
        style={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '32rem',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 10,
          transform: 'scale(1)',
          transition: 'all 0.2s ease-in-out'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Create New Task</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title Field - Full Width */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 mr-2 text-gray-500" />
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a descriptive title for your task..."
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:bg-white'
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.title}
              </p>
            )}
          </div>

          {/* Description Field - Full Width */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 mr-2 text-gray-500" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide detailed information about the task..."
              rows={3}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 ${
                errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:bg-white'
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.description}
              </p>
            )}
          </div>

          {/* Two Column Layout for Smaller Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Due Date Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.dueDate ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:bg-white'
                  }`}
                />
                <Calendar 
                  size={18} 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
              {errors.dueDate && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.dueDate}
                </p>
              )}
            </div>

            {/* Priority Field */}
            <CustomDropdown
              label="Priority"
              icon={Flag}
              options={priorities.map(priority => ({
                value: priority.toLowerCase(),
                label: priority,
                color: priority === 'high' ? '#ef4444' : priority === 'medium' ? '#f59e0b' : '#10b981',
                icon: priority === 'high' ? AlertCircle : priority === 'medium' ? AlertTriangle : CheckCircle
              }))}
              value={formData.priority}
              onChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              placeholder="Select priority..."
              getOptionIcon={(option) => (
                <option.icon className="w-4 h-4" style={{ color: option.color }} />
              )}
            />
          </div>

          {/* Group Field - Full Width */}
          <CustomDropdown
            label="Group"
            icon={FolderOpen}
            options={groups}
            value={formData.groupID}
            onChange={(value) => setFormData(prev => ({ ...prev, groupID: value }))}
            placeholder="Select a group..."
            error={errors.groupID}
            getOptionLabel={(group) => group.title}
            getOptionValue={(group) => group._id}
            getOptionIcon={() => <FolderOpen className="w-4 h-4 text-gray-500" />}
          />
          
        { formData.groupID && (
          <>
          {/* Assign To Field */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <Users className="w-4 h-4 mr-2 text-gray-500" />
              Assign To
            </label>
            
            {/* Selected Users Tags */}
            {formData.assignTo.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-xl border border-blue-200">
                {formData.assignTo.map(userId => {
                  const user = users.find(u => u._id === userId);
                  return user ? (
                    <span
                      key={userId}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      <User className="w-3 h-3 mr-1.5" />
                      {user.FirstName} {user.LastName}
                      <button
                        type="button"
                        onClick={() => removeUser(userId)}
                        className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 focus:outline-none transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            )}
            
            {/* User Selection List */}
            <div className={`max-h-28 overflow-y-auto border rounded-xl bg-white ${
              errors.assignTo ? 'border-red-300' : 'border-gray-200'
            }`}>
              {users.length === 0 ? (
                <div className="px-4 py-4 text-center text-sm text-gray-500">
                  <Users className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                  No users available in this group
                </div>
              ) : (
                <div className="p-2">
                  {users.map(user => (
                    <label
                      key={user._id}
                      className="flex items-center px-3 py-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors group"
                    >
                      <input
                        type="checkbox"
                        checked={formData.assignTo.includes(user._id)}
                        onChange={() => handleUserToggle(user._id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                      />
                      <div className="ml-3 flex items-center">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {user.FirstName} {user.LastName}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {errors.assignTo && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.assignTo}
              </p>
            )}
          </div>
          </>
        )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 border border-transparent rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
