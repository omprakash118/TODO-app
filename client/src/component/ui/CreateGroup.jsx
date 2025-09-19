import React, { useState } from "react";
import { X, Users, ChevronDown } from "lucide-react";
import { useScrollLock } from "../../hooks/useScrollLock";
export default function CreateGroup({ isOpen, onClose, onSubmit }){

    const [formData, setFormData] = useState({
        title: "",
        members:[],
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const users = [
        {
            _id: "1",
            FirstName: "John",
            LastName: "Doe",
        },
        {
            _id: "2",
            FirstName: "Jane",
            LastName: "Doe",
        },
        {
            _id: "3",
            FirstName: "Jim",
            LastName: "Beam",
        },
        {
            _id: "4",
            FirstName: "Jill",
            LastName: "Doe",
        },
        {
            _id: "5",
            FirstName: "Jack",
            LastName: "Doe",
        },
    ];

    useScrollLock(isOpen, 'fixed');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Handle member selection
    const handleMemberSelect = (user) => {
        // Check if user is already selected
        const isAlreadySelected = formData.members.some(member => member._id === user._id);
        
        if (!isAlreadySelected) {
            setFormData(prev => ({
                ...prev,
                members: [...prev.members, user]
            }));
        }
        setIsDropdownOpen(false);
    }

    // Handle member removal
    const handleMemberRemove = (userId) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.filter(member => member._id !== userId)
        }));
    }

    // Get available users (not already selected)
    const getAvailableUsers = () => {
        return users.filter(user => 
            !formData.members.some(member => member._id === user._id)
        );
    }

    const validateForm = () => {
        const newErrors = {};
        if(!formData.title.trim()) newErrors.title = "Title is required";
        if(!formData.members.length) newErrors.members = "At least one member is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()){
            onSubmit(formData);
        }
    }
    
    const handleClose = () => {
        setIsLoading(false);
        setFormData({
            title: "",
            members: [],
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
                    {/* Selected Members Display */}
                    {formData.members.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Selected Members:
                            </label>
                            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-md border">
                                {formData.members.map(member => (
                                    <div 
                                        key={member._id}
                                        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                                    >
                                        <span>{member.FirstName} {member.LastName}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleMemberRemove(member._id)}
                                            className="text-blue-600 hover:text-blue-800 ml-1"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Custom Multi-Select Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Add Members:
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between ${
                                    errors.members ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <span className="text-gray-500">
                                    {getAvailableUsers().length > 0 ? 'Select members' : 'All members selected'}
                                </span>
                                <ChevronDown 
                                    size={16} 
                                    className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </button>
                            
                            {/* Dropdown Options */}
                            {isDropdownOpen && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                    {getAvailableUsers().length > 0 ? (
                                        getAvailableUsers().map(user => (
                                            <button
                                                key={user._id}
                                                type="button"
                                                onClick={() => handleMemberSelect(user)}
                                                className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-2"
                                            >
                                                <Users size={16} className="text-gray-400" />
                                                <span>{user.FirstName} {user.LastName}</span>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-3 py-2 text-gray-500 text-sm">
                                            All members have been selected
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {errors.members && <p className="text-red-500 text-xs mt-1">{errors.members}</p>}
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Create Group</button>
                    </div>
                </form>
            </div>
        </div>
    )
}