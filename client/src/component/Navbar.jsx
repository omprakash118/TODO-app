import React from "react";
import { PanelRight, PanelLeft } from "lucide-react";

function Navbar({ open, setOpen }) {
  return (
    <header className="bg-[#FDFDFD] backdrop-blur-xl border-b border-gray-200 fixed w-full top-0 z-20 ">
      <div className="max-w-7xl px-2 sm:px-4 lg:px-6 p-3 flex flex-row justify-start items-center">
      <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded text-[#3c83f6] hover:bg-gray-50 hover:text-gray-800 cursor-pointer"
          > 
            {open ? <PanelRight size={20} /> : <PanelLeft size={20} />}
          </button>
          <h1 className="text-gray-500 p-1.5 font-semibold">
            Task Flow Management
          </h1>
          
      </div>  
    </header>
  );
};

export default  Navbar;
