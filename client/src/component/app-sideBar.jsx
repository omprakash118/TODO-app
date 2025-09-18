import React from "react";
import { LayoutDashboard, CheckSquare, Users , PanelRight} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


export function Sidebar({ open , setOpen, isMobile }){
    // const [ open , setOpen ] = useState(true);

    return (

        <aside open={open} onOpenChange={setOpen} 
                className={`bg-[#f3f4f6] text-[#3c83f6] h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out 
                    ${open ? "w-64" : "w-16"}
                    ${isMobile ? (open ? "translate-x-0 z-50 transition-all duration-300 ease-in-out" : "-translate-x-full transition-all duration-300 ease-in-out z-50") : ""}`}
            >    
                {/* Header */}
                <div className={` border-b text-gray-200 flex flex-row justify-between items-center ${open ? 'p-4' : 'p-3'}`}>
                    {open ? <h1 className="text-lg font-bold text-[#3c83f6]  ">TaskFlow</h1>
                        : <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 flex justify-center items-center rounded-xl shadow-lg">
                            <CheckSquare className=" text-white" size={20}/> 
                        </div>
                    }
                    {isMobile && (
                        <button
                            onClick={() => setOpen(!open)}
                            className="rounded text-[#3c83f6] hover:bg-gray-50 hover:text-gray-800 cursor-pointer"
                        >
                            {open ? <PanelRight size={20} /> : '' }
                        </button>
                    )}
                    
                </div>

                <nav className={`flex flex-col gap-2 mt-2 `}>
                    {open && <h1 className="p-4 text-gray-800 ">Main</h1>}
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" open={open} to="/dashboard" />
                    <SidebarItem icon={<CheckSquare size={20} />} label="Tasks" open={open} to="/tasks" />
                    <SidebarItem icon={<Users size={20} />} label="Groups" open={open} to="/groups" />
                </nav>
        </aside>
    )
}

function SidebarItem({icon,label, open, to}){
    return (
        <Link to={to} className={`flex items-center gap-3  rounded-lg hover:bg-gray-50 hover:text-gray-800 cursor-pointer ${open ? 'py-2 px-4 mx-4' : 'mx-2 p-2  justify-center'} `} >
            {icon}
            {open && <span>{label}</span>}
        </Link>
    )
}