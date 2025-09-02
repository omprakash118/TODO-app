import React from "react";
import { LayoutDashboard, CheckSquare, Users, PanelRight, PanelLeft } from "lucide-react";
import { useState } from "react";


export function Sidebar({ open , setOpen }){
    // const [ open , setOpen ] = useState(true);

    return (

        <aside open={open} onOpenChange={setOpen} 
                className={`bg-[#f3f4f6] text-[#3c83f6] h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out ${open ? "w-64" : "w-16"}`}
            >
            
                {/* <div className="flex items-center justify-between p-4">
                    {open && <h1 className="text-lg font-bold">TaskFlow</h1>}
                    <button
                        onClick={() => setOpen(!open)}
                        className="p-2 rounded hover:bg-gray-800"
                    >
                        <Menu size={20} />
                    </button>
                </div> */}
                
                {/* Header */}
                <div className="p-4 border-b text-gray-200 flex flex-row justify-between items-center">
                    {open && <h1 className="text-lg font-bold text-[#3c83f6] ">TaskFlow</h1>}
                    <button
                        onClick={() => setOpen(!open)}
                        className="p-2 rounded text-[#3c83f6] hover:bg-gray-50 hover:text-gray-800 cursor-pointer"
                    >
                        {open ? <PanelRight size={20} /> : <PanelLeft size={20} />}
                        {/* <PanelLeft size={20} /> */}
                    </button>
                </div>

                <nav className="flex flex-col gap-2 mt-2">
                    {open && <h1 className="p-4 text-gray-800 ">Main</h1>}
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" open={open} />
                    <SidebarItem icon={<CheckSquare size={20} />} label="Tasks" open={open} />
                    <SidebarItem icon={<Users size={20} />} label="Groups" open={open} />
                </nav>
        </aside>
    )
}

function SidebarItem({icon,label, open}){
    return (
        <button className={`flex items-center gap-3 mx-4  rounded-lg hover:bg-gray-50 hover:text-gray-800 cursor-pointer ${open ? 'py-2 px-4' : 'mx-2 p-2'} `} >
            {icon}
            {open && <span>{label}</span>}
        </button>
    )
}