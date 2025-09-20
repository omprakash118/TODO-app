import React , {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "../component/app-sideBar";
import Navbar from "./Navbar";
import Dashboard from "../pages/Dashboard";
import Task from "../pages/Task";
import Groups from "../pages/Groups";
import GroupDetailspage from "./groupDetailspage";


function MainComponent(){
  const [ sidebarOpen , setSidebarOpen ] = useState(true);
  const [ isMobile , setIsMobile ] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if(mobile){
        setSidebarOpen(false);
      }else{
        setSidebarOpen(true);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
    return(
        <div className="flex h-screen">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} isMobile={isMobile} />
          <div className={`flex flex-col flex-1 bg-[#FDFDFD] transition-all duration-300 ease-in-out 
            ${isMobile ? 'ml-0' : (sidebarOpen ? 'ml-64' : 'ml-16')}
            `}> 
              <Navbar open={sidebarOpen} setOpen={setSidebarOpen} /> 
              <div className="mt-16">
                <main>
                  <Routes>
                    <Route path="/" element={<Dashboard />}  />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<Task />}  />
                    <Route path="/groups" element={<Groups />}  />
                    <Route path="/group/:groupID" element={<GroupDetailspage />}  />
                  </Routes>
                </main>
              </div>
          </div>
        </div>
    )
};

export default MainComponent;