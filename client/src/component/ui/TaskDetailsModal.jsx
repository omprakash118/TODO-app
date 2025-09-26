import React, { useState, useEffect, useCallback } from "react";
import { X, Users, User, Calendar, Flag, FileText, Clock, CheckCircle, AlertCircle, AlertTriangle, Plus, Minus, ChevronDown, Search } from "lucide-react";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useGlobalLoaderContext } from "./GlobalLoaderProvider";
import { useToastContext } from "./ToastProvider";
import axios from "axios";
import Model from "./Model";

export default function TaskDetailsModal({ 
  isOpen, 
  onClose, 
  task, 
  groupMembers = [], 
}) {
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
      updatingTask: () => {},
    };
    hideLoader = () => {};
  }

  // Toast context
  const { toast } = useToastContext();
  let taskID = task._id;
  const [isLoading, setIsLoading] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [assignUserDropdownOpen, setAssignUserDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usersToRemove, setUsersToRemove] = useState([]);

  // Use the custom hook to prevent background scrolling
  useScrollLock(isOpen, 'overflow');

  // Memoize loader functions
  const showLoadingData = useCallback(() => {
    loaders.loadingData();
  }, [loaders]);

  const hideLoading = useCallback(() => {
    hideLoader();
  }, [hideLoader]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen && task) {
      setSearchTerm("");
      setSelectedUsers([]);
      setUsersToRemove([]);
      setStatusDropdownOpen(false);
      setAssignUserDropdownOpen(false);
      fetchAvailableUsers();
    }
  }, [isOpen, task]);

  useEffect( async () => {

    if (toast.success) {
      console.log("toast.success");
      await fetchUpdatedTask();
    }
  }, [toast]);

  const fetchAvailableUsers = async () => {
    try {
      showLoadingData();
      // Filter out users already assigned to the task
      const assignedUserIds = task.assignTo?.map(user => user._id) || [];
      const filteredUsers = groupMembers.filter(member => 
        !assignedUserIds.includes(member._id)
      );
      setAvailableUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching available users:", error);
      setAvailableUsers([]);
    } finally {
      hideLoading();
    }
  };

  const fetchUpdatedTask = async () => {
    try {
      const response = await axios.get(`/api/task/${taskID}`);
      if (response.data.success) {
        setTask(response.data.data);
        if (onTaskUpdate) {
          onTaskUpdate();
        }
      }
    } catch (error) {
      console.error("Error fetching updated task:", error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setIsLoading(true);
      loaders.updatingTask();
      const response = await axios.patch(`/api/task/${taskID}`, {
        status: newStatus
      });

      if (response.data.success) {
        toast.success("Task status updated successfully!");
        // await fetchUpdatedTask();
        setStatusDropdownOpen(false);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status. Please try again.");
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  const handleUserAssign = async () => {
    if (selectedUsers.length === 0) {
      toast.warning("Please select users to assign.");
      return;
    }

    try {
      setIsLoading(true);
      loaders.updatingTask();

      const response = await axios.patch(`/api/task/${taskID}`, {
        assignTo: [...(task.assignTo?.map(user => user._id) || []), ...selectedUsers.map(user => user._id)]
      });

      if (response.data.success) {
        toast.success(`${selectedUsers.length} user(s) assigned successfully!`);
        // await fetchUpdatedTask();
        setSelectedUsers([]);
        setAssignUserDropdownOpen(false);
        fetchAvailableUsers(); // Refresh available users
      }
    } catch (error) {
      console.error("Error assigning users:", error);
      toast.error("Failed to assign users. Please try again.");
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  const handleUserRemove = async (userId) => {
    try {
      setIsLoading(true);
      loaders.updatingTask();

      console.log("userId which i am sending to remove user :- ", taskID);

      // const currentAssignedIds = task.assignTo?.map(user => user._id) || [];
      // const updatedAssignTo = currentAssignedIds.filter(id => id !== userId);

      const response = await axios.patch(`/api/task/${taskID}`, {
        assignTo: {
          remove: [userId]
        }
      });

      if (response.data.success) {
        toast.success("User removed from task successfully!");
        // await fetchUpdatedTask();
        fetchAvailableUsers(); // Refresh available users
      }
    } catch (error) {
      console.error("Error removing user:", error);
      toast.error("Failed to remove user. Please try again.");
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUsers(prev => {
      if (prev.some(u => u._id === user._id)) {
        return prev.filter(u => u._id !== user._id);
      } else {
        return [...prev, user];
      }
    });
  };

  const removeSelectedUser = (userId) => {
    setSelectedUsers(prev => prev.filter(user => user._id !== userId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return AlertCircle;
      case 'medium': return AlertTriangle;
      case 'low': return CheckCircle;
      default: return Flag;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredUsers = availableUsers.filter(user =>
    `${user.FirstName} ${user.LastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen || !task) return null;

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
        onClick={onClose}
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
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Task Details</h2>
              <p className="text-sm text-gray-600">Manage task information and assignments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Task Information */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>

            {/* Task Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="relative">
                  <button
                    onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    className={`w-full flex items-center justify-between px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      statusDropdownOpen ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    <ChevronDown 
                      size={14} 
                      className={`text-gray-400 transition-transform duration-200 ${
                        statusDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {statusDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                      <div className="py-1">
                        {[
                          { value: 'pending', label: 'Pending', color: 'bg-gray-100 text-gray-800' },
                          { value: 'progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
                          { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleStatusChange(option.value)}
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 ${
                              task.status === option.value ? 'bg-blue-50' : ''
                            }`}
                          >
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${option.color}`}>
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>  
                    </div>
                  )}
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  {React.createElement(getPriorityIcon(task.priority), { 
                    className: "w-4 h-4", 
                    style: { color: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981' }
                  })}
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Due Date</label>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{formatDate(task.dueDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Created By */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Created By</label>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {task.createdBy?.FirstName} {task.createdBy?.LastName}
                </h4>
                <p className="text-sm text-gray-600">Task Creator</p>
              </div>
            </div>
          </div>

          {/* Assigned Users */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Assigned Users ({task.assignTo?.length || 0})
              </h3>
              <button
                onClick={() => setAssignUserDropdownOpen(!assignUserDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Assign Users
              </button>
            </div>

            {/* Assigned Users List */}
            {task.assignTo && task.assignTo.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {task.assignTo.map((user, index) => (
                  <div 
                    key={user._id || `user-${index}`} 
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        {user.FirstName} {user.LastName}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleUserRemove(user._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      title="Remove user from task"
                    >
                      <Minus size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No users assigned to this task</p>
              </div>
            )}

            {/* Assign Users Dropdown */}
            {assignUserDropdownOpen && (
              <div className="border border-gray-200 rounded-lg bg-white shadow-lg">
                <div className="p-4 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search users by name or email..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Selected Users Tags */}
                {selectedUsers.length > 0 && (
                  <div className="p-3 bg-blue-50 border-b border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {selectedUsers.map(user => (
                        <span
                          key={user._id}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {user.FirstName} {user.LastName}
                          <button
                            onClick={() => removeSelectedUser(user._id)}
                            className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 focus:outline-none"
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Users List */}
                <div className="max-h-48 overflow-y-auto">
                  {filteredUsers.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-gray-500">
                      <Users className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                      {searchTerm ? 'No users found matching your search' : 'No available users to assign'}
                    </div>
                  ) : (
                    <div className="p-2">
                      {filteredUsers.map(user => (
                        <label
                          key={user._id}
                          className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedUsers.some(u => u._id === user._id)}
                            onChange={() => handleUserSelect(user)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <div className="ml-3 flex items-center flex-1">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-gray-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-gray-700 block truncate">
                                {user.FirstName} {user.LastName}
                              </span>
                              <span className="text-xs text-gray-500 truncate block">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 p-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setAssignUserDropdownOpen(false);
                      setSelectedUsers([]);
                      setSearchTerm("");
                    }}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUserAssign}
                    disabled={selectedUsers.length === 0 || isLoading}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Assigning...' : `Assign ${selectedUsers.length} User${selectedUsers.length !== 1 ? 's' : ''}`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>


    </div>
  );
}
