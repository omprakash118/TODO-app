import React from "react";
import { PanelRight, PanelLeft, LogOut } from "lucide-react";
import { useToastContext } from "../component/ui/ToastProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ open, setOpen }) {
  
  const {toast} = useToastContext();
  const navigate = useNavigate();

  const handleLogout = async () => {

    try {
      const response = await axios.post("api/logout", {} ,{
        withCredentials: true,
      });
      const data = await response.data;
      console.log("Data :- ", data);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
    // toast.success("Logout successful");
    // navigate("/login");
  };
  
  return (
    <header className="bg-[#FDFDFD] backdrop-blur-xl flex flex-row justify-between items-center border-b border-gray-200 fixed w-[-webkit-fill-available] top-0 z-20 ">
      <div className=" px-2 sm:px-4 lg:px-6 p-3 flex flex-row justify-start items-center">
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
      <div className="flex flex-row justify-end items-center mr-4">
        <button onClick={handleLogout} className=" cursor-pointer text-gray-600 hover:text-gray-800 hover:underline focus:outline-none transition-colors flex flex-row justify-center items-center gap-2 px-4 py-2">
          <span>Logout</span> <LogOut size={13} className="mt-1" />
        </button>
      </div>
    </header>
  );
};

export default  Navbar;
