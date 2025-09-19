import React from "react";
import { Users , PenBoxIcon, Trash2 } from "lucide-react";

// Function to handle date formatting
const handleDate = (dateString) => {
    if (!dateString) return '';
    
    const inputDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Reset time to start of day for accurate comparison
    const inputDateOnly = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    
    // Calculate difference in days
    const diffTime = todayOnly - inputDateOnly;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays >= 2 && diffDays <= 6) {
        return `${diffDays} days ago`;
    } else {
        // Format as "Sep 4, 2025"
        return inputDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
};

export default function GroupCard({
    title = '',
    members = [],
    tasks = [],
    createdAt = '',
    createdBy = '',
}){
    return(
        <div className="p-6 bg-white text-[#344256] shadow-[#c5c5c53f] shadow-sm rounded-[10px] border-[1px] border-[#e5e7eb] w-auto flex flex-col gap-2">
            <div>
                <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                    <Users size={20} className="text-[#3c83f6]" />
                    <h1 className="text-lg font-semibold">{title}</h1>
                </div>
                <div className="flex flex-row gap-2 justify-center items-center text-center">
                    <button className="hover:scale-[1.02]  hover:text-[#3c83f6]  hover:bg-gray-50  rounded-full  focus:scale-[0.98] transition-all duration-200 cursor-pointer p-1">
                        <PenBoxIcon size={15}  />
                    </button>
                    <button className="hover:scale-[1.02] mt-[-1px] focus:scale-[0.98] text-red-600 rounded-full hover:bg-gray-50  transition-all duration-200 cursor-pointer p-1">
                        <Trash2 size={15}  />
                    </button>
                </div>
                </div>
            </div>
            
                <div className="flex flex-row gap-2 justify-between items-center">
                    <h1 className="text-sm  text-[#94a3b8]">Members</h1>
                    <p className="  text-xs mt-1">{members.length}</p>
                </div>
         
                <div className="flex flex-row gap-2 justify-between items-center">
                    <h1 className="text-sm  text-[#94a3b8]">Tasks</h1>
                    <p className="text-xs mt-1">{tasks.length}</p>
                </div>
                <div className="flex flex-row gap-2 justify-between items-center">
                    <h1 className="text-sm  text-[#94a3b8]">Created At</h1>
                    <p className="  text-xs mt-1">{handleDate(createdAt)}</p>
                </div>
                <div className="flex flex-row gap-2 justify-between items-center">
                    <h1 className="text-sm  text-[#94a3b8]">Created By</h1>
                    <p className="  text-xs mt-1">{createdBy.FirstName + " " + createdBy.LastName}</p>
                </div>
        </div>
    )
}