import React from "react";
import { CheckSquare } from "lucide-react";

function Notaskpresent(){
    return (
        <div className="p-3 bg-white text-[#3442568c] h-44 col-span-4 shadow-[#c5c5c53f] shadow-sm rounded-[10px] border-[1px] border-[#e5e7eb] w-full flex flex-col gap-2">
            <div className="flex justify-center items-center h-full gap-2  border-dashed border-gray-300 border-2 rounded-md">
                <CheckSquare size={24} />
                <h1 className="text-lg font-semibold">No tasks found</h1>
            </div>
        </div>
    )
    }

export default Notaskpresent;