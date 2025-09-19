import React from "react";
import GroupCard from "../component/ui/GroupCard";
import { useState } from "react";
import CreateGroup from "../component/ui/CreateGroup";

export default function Groups(){
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCreateGroup = (groupData) => {
        console.log("Creating group:", groupData);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            console.log("Group created successfully!");
        }, 1000);
    };
    return(
        <div className="p-5">
            <div className="flex justify-between items-center" >
                <div>
                    <h1 className="text-[1.87rem] font-bold" >Groups</h1>
                    <p className="text-gray-500 mt-[-5px]">Manage your groups and track team productivity</p>
                </div>
                <div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            + Create Group
                        </button>
                    </div>
            </div>
            <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                <GroupCard title="Group 1" description="Group 1 description" members={["Member 1", "Member 2", "Member 3"]} tasks={["Task 1", "Task 2", "Task 3"]} createdAt="2025-09-18" createdBy="John Doe"/>
                <GroupCard title="Group 2" description="Group 2 description" members={["Member 1", "Member 2", "Member 3"]} tasks={["Task 1", "Task 2", "Task 3"]} createdAt="2025-09-15" createdBy="John Doe"/>
                <GroupCard title="Group 3" description="Group 3 description" members={["Member 1", "Member 2", "Member 3"]} tasks={["Task 1", "Task 2", "Task 3"]} createdAt="2025-09-14" createdBy="John Doe"/>
                <GroupCard title="Group 3" description="Group 3 description" members={["Member 1", "Member 2", "Member 3"]} tasks={["Task 1", "Task 2", "Task 3"]} createdAt="2025-09-14" createdBy="John Doe"/>
                <GroupCard title="Group 3" description="Group 3 description" members={["Member 1", "Member 2", "Member 3"]} tasks={["Task 1", "Task 2", "Task 3"]} createdAt="2025-09-14" createdBy="John Doe"/>
                <GroupCard title="Group 3" description="Group 3 description" members={["Member 1", "Member 2", "Member 3"]} tasks={["Task 1", "Task 2", "Task 3"]} createdAt="2025-09-14" createdBy="John Doe"/>
                <GroupCard title="Group 3" description="Group 3 description" members={["Member 1", "Member 2", "Member 3"]} tasks={["Task 1", "Task 2", "Task 3"]} createdAt="2025-09-14" createdBy="John Doe"/>
                <GroupCard title="Group 3" description="Group 3 description" members={["Member 1", "Member 2", "Member 3"]} tasks={["Task 1", "Task 2", "Task 3"]} createdAt="2025-09-14" createdBy="John Doe"/>
            </div>
            <CreateGroup 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleCreateGroup} 
            />
        </div>
    )
}