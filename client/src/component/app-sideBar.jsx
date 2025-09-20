import React from "react";
import { LayoutDashboard, CheckSquare, Users , PanelRight} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";


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
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" open={open} to="/dashboard" onClick={() => { if(isMobile) setOpen(false)}} />
                    <SidebarItem icon={<CheckSquare size={20} />} label="Tasks" open={open} to="/tasks" onClick={() => { if(isMobile) setOpen(false)}} />
                    <SidebarItem icon={<Users size={20} />} label="Groups" open={open} to="/groups" onClick={() => { if(isMobile) setOpen(false)}} />
                </nav>
        </aside>
    )
}

function SidebarItem({icon, label, open, to, onClick}){
    const location = useLocation();
    const isActive = location.pathname === to || (to === '/dashboard' && location.pathname === '/');
    
    return (
        <Link 
            to={to} 
            onClick={onClick}
            className={`flex items-center gap-3 rounded-lg cursor-pointer transition-all duration-200 ${
                open ? 'py-2 px-4 mx-4' : 'mx-2 p-2 justify-center'
            } ${
                isActive 
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
                    : 'hover:bg-gray-50 hover:text-gray-800 text-gray-600'
            }`}
        >
            <div className={`transition-colors duration-200 ${
                isActive ? 'text-blue-700' : 'text-gray-500'
            }`}>
                {icon}
            </div>
            {open && (
                <span className={`font-medium transition-colors duration-200 ${
                    isActive ? 'text-blue-700' : 'text-gray-700'
                }`}>
                    {label}
                </span>
            )}
        </Link>
    )
}