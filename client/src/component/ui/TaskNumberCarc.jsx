import React from "react";
import { CheckSquare, CheckCheck, Users , TrendingUp } from "lucide-react";

function TaskNumberCard({
    title = 'Total Task',
    icons = <CheckSquare />,
    total = 0,
    para = 'All Task'
}){
    const iconMap = {
        CheckSquare : <CheckSquare size={15}/>,
        CheckCheck : <CheckCheck size={15}/>,
        Users : <Users size={15}/>,
        TrendingUp : <TrendingUp size={15}/>
    }

    return (

        <div className="p-6 bg-white shadow-[#c5c5c53f] text-[#344256] shadow-sm rounded-lg border-[1px] border-[#e5e7eb]">
            <div className="flex justify-between">
                <h2 className="text-sm font-semibold">{title}</h2>
                <h4 className="text-[#94a3b8]">{iconMap[icons]}</h4>
            </div>
            <div className="mt-2">
                <h1 className="font-bold text-2xl">{total}</h1>
                <p className="text-[#94a3b8] text-xs">{para}</p>
            </div>
        </div>

    )
};

export default TaskNumberCard;