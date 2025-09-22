import React, { useState, useEffect, useCallback } from "react";
import { X, Users, User, Search, Plus, Minus, Check } from "lucide-react";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useGlobalLoaderContext } from "./GlobalLoaderProvider";
import { useToastContext } from "./ToastProvider";
import axios from "axios";

export default function AddGroupMembers({ isOpen, onClose, groupID, currentMembers = [], onMembersUpdate }) {
  // Fallback for when GlobalLoader context is not available
  let loaders, hideLoader;
  try {
    const loaderContext = useGlobalLoaderContext();
    loaders = loaderContext.loaders;
    hideLoader = loaderContext.hideLoader;
  } catch (error) {
    console.warn('GlobalLoader context not available, using fallback loading state');
    loaders = {
      loadingData: () => {},
      updatingMembers: () => {},
    };
    hideLoader = () => {};
  }

  // Toast context
  const { toast } = useToastContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [membersToRemove, setMembersToRemove] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Use the custom hook to prevent background scrolling
  useScrollLock(isOpen, 'overflow');

  // Memoize loader functions
  const showLoadingData = useCallback(() => {
    loaders.loadingData();
  }, [loaders]);

  const hideLoading = useCallback(() => {
    hideLoader();
  }, [hideLoader]);

  // Fetch available users when modal opens
  useEffect(() => {
    if (isOpen && groupID) {
      fetchAvailableUsers();
    }
  }, [isOpen, groupID]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setSelectedUsers([]);
      setMembersToRemove([]);
      setErrors({});
    }
  }, [isOpen]);

  const fetchAvailableUsers = async () => {
    try {
      showLoadingData();
      // Try to get all users - adjust the endpoint based on your actual user API
      const response = await axios.get('/api/user');
      const allUsers = response.data.data || [];
      
      // Filter out current members and current user
      const currentUserID = localStorage.getItem("userID");
      const filteredUsers = allUsers.filter(user => 
        !currentMembers.some(member => member._id === user._id) && 
        user._id !== currentUserID
      );
      
      setAvailableUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      // If the user endpoint doesn't exist, we can still show the form
      // but with an empty list and a helpful message
      setAvailableUsers([]);
      toast.warning("Unable to load available users. Please check your connection.");
    } finally {
      hideLoading();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = availableUsers.filter(user =>
    `${user.FirstName} ${user.LastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUsers(prev => {
      if (prev.some(u => u._id === user._id)) {
        return prev.filter(u => u._id !== user._id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleMemberRemove = (member) => {
    setMembersToRemove(prev => {
      if (prev.some(m => m._id === member._id)) {
        return prev.filter(m => m._id !== member._id);
      } else {
        return [...prev, member];
      }
    });
  };

  const removeSelectedUser = (userId) => {
    setSelectedUsers(prev => prev.filter(user => user._id !== userId));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (selectedUsers.length === 0 && membersToRemove.length === 0) {
      newErrors.general = "Please select users to add or remove";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.warning("Please select users to add or remove.");
      return;
    }

    try {
      setIsLoading(true);
    //   loaders.updateProgress();

      let successCount = 0;
      let errorCount = 0;

      // Add new members
      if (selectedUsers.length > 0) {
        try {
          const addResponse = await axios.post('/api/group/addMembers', {
            groupID: groupID,
            userID: selectedUsers.map(user => user._id)
          });
          
          if (addResponse.data.success) {
            successCount += selectedUsers.length;
            console.log("Members added successfully:", addResponse.data);
          }
        } catch (error) {
          console.error("Error adding members:", error);
          errorCount += selectedUsers.length;
        }
      }

      // Remove members
      if (membersToRemove.length > 0) {
        try {
          const removeResponse = await axios.post('/api/group/removeMembers', {
            groupID: groupID,
            userID: membersToRemove.map(member => member._id)
          });
          
          if (removeResponse.data.success) {
            successCount += membersToRemove.length;
            console.log("Members removed successfully:", removeResponse.data);
          }
        } catch (error) {
          console.error("Error removing members:", error);
          errorCount += membersToRemove.length;
        }
      }

      // Show appropriate success/error messages
      if (errorCount === 0) {
        toast.success(`Group members updated successfully! ${successCount} changes made.`);
        if (onMembersUpdate) {
          onMembersUpdate();
        }
        handleClose();
      } else if (successCount > 0) {
        toast.warning(`Partial success: ${successCount} changes made, ${errorCount} failed.`);
        if (onMembersUpdate) {
          onMembersUpdate();
        }
        handleClose();
      } else {
        toast.error("Failed to update group members. Please try again.");
      }
    } catch (error) {
      console.error("Error updating group members:", error);
      toast.error("Failed to update group members. Please try again.");
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  const handleClose = () => {
    setSearchTerm("");
    setSelectedUsers([]);
    setMembersToRemove([]);
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
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all scale-100 z-10"
        style={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '56rem',
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
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Manage Group Members</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.general}
              </p>
            </div>
          )}

          {/* Current Members Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Current Members ({currentMembers.length})
            </h3>
            
            {currentMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentMembers.map((member, index) => (
                  <div 
                    key={member._id || `member-${index}`} 
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                      membersToRemove.some(m => m._id === member._id)
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        {member.FirstName} {member.LastName}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">
                        {member.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleMemberRemove(member)}
                      className={`p-1.5 rounded-full transition-colors ${
                        membersToRemove.some(m => m._id === member._id)
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                      }`}
                    >
                      <Minus size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No members in this group</p>
              </div>
            )}
          </div>

          {/* Add Members Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              Add New Members
            </h3>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Selected Users Tags */}
            {selectedUsers.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-xl border border-blue-200">
                {selectedUsers.map(user => (
                  <span
                    key={user._id}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                  >
                    <User className="w-3 h-3 mr-1.5" />
                    {user.FirstName} {user.LastName}
                    <button
                      type="button"
                      onClick={() => removeSelectedUser(user._id)}
                      className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 focus:outline-none transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Available Users List */}
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-xl bg-white">
              {filteredUsers.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  {searchTerm ? 'No users found matching your search' : 'No available users to add'}
                </div>
              ) : (
                <div className="p-2">
                  {filteredUsers.map(user => (
                    <label
                      key={user._id}
                      className="flex items-center px-3 py-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.some(u => u._id === user._id)}
                        onChange={() => handleUserSelect(user)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                      />
                      <div className="ml-3 flex items-center flex-1">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 block truncate">
                            {user.FirstName} {user.LastName}
                          </span>
                          <span className="text-xs text-gray-500 truncate block">
                            {user.email}
                          </span>
                        </div>
                        {selectedUsers.some(u => u._id === user._id) && (
                          <Check className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

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
              disabled={isLoading}
              className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 border border-transparent rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Update Members'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
