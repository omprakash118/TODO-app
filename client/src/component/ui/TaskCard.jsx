import React from "react";
import { CalendarIcon } from "lucide-react";

const statusStyles = {
    pending: "bg-[#f3f4f6] text-[#344256]",
    progress: "bg-[#fef3c8] text-[#f97415]",
    completed: "bg-[#21c45d] text-[#fafafa]"
}

const priorityStyles = {
    low: "bg-[#e5e7eb] text-[#344256]",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800"
}


function TaskCard({
    title = '',
    description = '',
    status = '',
    priority = '',
    groupTitle = '',
    assignBy = ''
}){
    return (
        <div className="p-6 bg-white text-[#344256] shadow-[#c5c5c53f] shadow-sm rounded-[10px] border-[1px] border-[#e5e7eb] w-auto flex flex-col gap-2">
            <div>
                <h1 className="text-sm font-semibold">{title}</h1>
                <p className="text-[#94a3b8] text-xs mt-1">{description}</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <div className={`inline-flex items-center  border-[#f3f4f6] border rounded-full  px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                            ${statusStyles[status]}
                        `}>
                        {status}
                    </div>
                    <div className={`inline-flex items-center border-[#f3f4f6] border rounded-full  px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                            ${priorityStyles[priority]}
                        `}>
                        {priority}
                    </div>
                </div>
                <div className="inline-flex bg-[#f3f4f6] text-[#344256] border-[#f3f4f6] border w-fit items-center rounded-full  px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    {groupTitle}
                </div>
            </div>
            <div className="text-[#94a3b8] text-xs flex flex-row justify-between items-center">
                <div className="flex flex-row gap-1  items-center">
                    <CalendarIcon size={12}/>
                    <span>2025-08-18</span>
                </div>
                <div>
                    {assignBy}
                </div>
            </div>
        </div>
    )
}

export default TaskCard;