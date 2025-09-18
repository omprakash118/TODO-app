import React from "react";
import Btns from "../component/ui/Btns";
import HeadingTask from "../component/ui/HeadingTask";
import SearchBar from "../component/ui/SearchBar";

export default function Task(){
    return(
        <div className="p-5">
            <div className="flex justify-between items-center" >
                <div>
                    <h1 className="text-[1.87rem] font-bold" >Tasks</h1>
                    <p className="text-gray-500 mt-[-5px]">Manage your tasks and track team productivity</p>
                </div>
                <div>
                    <Btns btnName="+ Create Task" />
                </div>
            </div>
            <div>
                <SearchBar />
            </div>
            <div className="mt-6 flex flex-col gap-6">
                <HeadingTask title="Pending" />
                <HeadingTask title="In Progress" />
                <HeadingTask title="Completed"/>
            </div>
            
        </div>
    )
}
