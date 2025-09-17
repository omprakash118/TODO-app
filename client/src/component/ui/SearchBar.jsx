import React, { useState } from "react";
import { ChevronDown , Search, Filter , Check } from "lucide-react";

function SearchBar() {

  const [isOpen , setIsOpen] = useState(false);
  const [ selected , setSelected ] = useState("Select Option");

  const options = [ "All status" ,"Pending", "in-progress", "complete"];

  return ( 
    <div className="mt-4 flex items-center gap-4">
      <div className="relative w-full"> 
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Task.."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 
                     text-sm shadow-xs outline-none 
                   placeholder:text-gray-400
                   focus:bor
                   der-[#3c83f6] focus:ring-2 focus:ring-[#3c83f6] focus:ring-offset-0"       
        />
      </div>
      <div className="relative overflow-visible">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-2 w-40 rounded-md border border-gray-300 
                   bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 
                   focus:outline-none focus:ring-2 focus:ring-[#3b82f6] cursor-pointer"
        >
          <div className="flex flex-row items-center gap-2">

          <Filter  size={16} className="text-gray-600" />
          <span>{selected}</span>
          </div>
          <ChevronDown size={16} className={`text-gray-500
              ${isOpen}
            `} />
        </button>

        {/* Dropdown */}
        { isOpen && 
            <ul className="absolute mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-10" >
              {options.map((items , index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setIsOpen(false);
                      setSelected(items);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer 
                         hover:bg-blue-100 ${
                           selected === items ? "bg-blue-500 text-white hover:bg-blue-500" : ""
                         }`}
                  >
                    {selected === items && <Check size={16}/> }
                    {items}
                  </li>
              ))}
            </ul>
        }
      </div>
    </div> 
  );
}

export default SearchBar;
