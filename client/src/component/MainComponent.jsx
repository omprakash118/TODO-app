import React , {useState} from "react";
import { Sidebar } from "../component/app-sideBar";
import Navbar from "./Navbar";

import Mainpart from "./Mainpart";

function MainComponent(){
  const [ open , setOpen ] = useState(true);
    return(
        <div className="flex h-screen">
          <Sidebar open={open} setOpen={setOpen} />
          <div className={`flex flex-col flex-1 bg-[#FDFDFD] transition-all duration-300 ease-in-out ${open ? 'ml-64' : 'ml-16'}`}> 
              <Navbar /> 
              <div className="mt-16">
                <main>
                  <Mainpart />
                </main>
              </div>
          </div>
        </div>
    )
};

export default MainComponent;