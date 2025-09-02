import React from "react";
import { Search, Filter } from "lucide-react";

function SearchBar() {
  return (
    <div>
      <div>
        <Search size={20} />
        <input
          type="text"
          placeholder="Search Task.."
          className="w-full rounded-md border border-gray-500  px-3 py-2 text-base ring-offset-[#3c83f6] 
                            file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#3c83f6] 
                            placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 
                            focus-visible:ring-[#3c83f6] focus-visible:ring-offset-1 disabled:cursor-not-allowed 
                            disabled:opacity-50 md:text-sm pl-10"       
        />
      </div>
      <div></div>
    </div>
  );
}

export default SearchBar;
