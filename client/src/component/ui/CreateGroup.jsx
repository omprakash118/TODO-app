import React, { useState, useEffect } from "react";
import { X, Users, User } from "lucide-react";
import { useScrollLock } from "../../hooks/useScrollLock";
import axios from "axios";

export default function CreateGroup({ isOpen, onClose, onSubmit }){

    const [formData, setFormData] = useState({
        title: "",
        members:[],
        createdBy: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    let userID;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userID = localStorage.getItem("userID");
        formData.createdBy = userID;
        // console.log("User ID :- ", userID);
        const fetchUsers = async () => {
            const response = await axios.get("api/user");
            const data = response.data.data;
            const filteredUsers = data.filter(user => user._id !== userID);
            setUsers(filteredUsers);
            // console.log("Users :- ", filteredUsers);
        }
        fetchUsers();
    }, []);

    useScrollLock(isOpen, 'fixed');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Handle member toggle (checkbox style)
    const handleMemberToggle = (userId) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.includes(userId)
                ? prev.members.filter(id => id !== userId)
                : [...prev.members, userId]
        }));
        
        // Clear error when user makes selection
        if (errors.members) {
            setErrors(prev => ({
                ...prev,
                members: ""
            }));
        }
    };

    // Handle member removal from tags
    const removeMember = (userId) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.filter(id => id !== userId)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if(!formData.title.trim()) newErrors.title = "Title is required";
        if(!formData.members.length) newErrors.members = "At least one member is required";
        if(!formData.createdBy) newErrors.createdBy = "Created by is required"; 
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Form data card 1:- ", formData);
        onSubmit(formData);
        if(validateForm()){
            setIsLoading(true);
            // console.log("Form data  card 2:- ", formData);
            setIsLoading(false);
            handleClose();
        }
    }
    
    const handleClose = () => {
        setIsLoading(false);
        setFormData({
            title: "",
            members: [],
            createdBy: "",
        });
        setErrors({});
        onClose();
    }

    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            <div 
                className="absolute inset-0 bg-[#00000072] bg-opacity-50  transition-opacity"
                onClick={handleClose}
            />
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Group</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title : 
                            <input type="text" 
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter title"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </label>
                    </div>
                    {/* Member Selection */}
                    <div className="space-y-3">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                            <Users className="w-4 h-4 mr-2 text-gray-500" />
                            Select Members
                        </label>
                        
                        {/* Selected Members Tags */}
                        {formData.members.length > 0 && (
                            <div className="flex flex-wrap gap-2 p-3 bg-blue-50 max-h-28 overflow-y-auto rounded-xl border border-blue-200">
                                {formData.members.map(userId => {
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
                                                onClick={() => removeMember(userId)}
                                                className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 focus:outline-none transition-colors"
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        )}
                        
                        {/* Member Selection List */}
                        <div className={`max-h-48 overflow-y-auto border rounded-xl bg-white ${
                            errors.members ? 'border-red-300' : 'border-gray-200'
                        }`}>
                            {users.length === 0 ? (
                                <div className="px-4 py-4 text-center text-sm text-gray-500">
                                    <Users className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                                    No users available
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
                                                checked={formData.members.includes(user._id)}
                                                onChange={() => handleMemberToggle(user._id)}
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
                        
                        {errors.members && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                {errors.members}
                            </p>
                        )}
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            onClick={handleSubmit}
                        >Create Group</button>
                    </div>
                </form>
            </div>
        </div>
    )
}