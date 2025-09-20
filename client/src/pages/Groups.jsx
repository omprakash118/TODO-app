import React, { useEffect } from "react";
import GroupCard from "../component/ui/GroupCard";
import { useState } from "react";
import CreateGroup from "../component/ui/CreateGroup";
import axios from "axios";
import { useToastContext } from "../component/ui/ToastProvider";

export default function Groups(){
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const { toast } = useToastContext();
    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = async () => {
        const response = await axios.get('api/group');
        const data = response.data.data;
        console.log("Groups :- ", data);
        setGroups(data);
    }

    const handleCreateGroup = async (groupData) => {
        console.log("Creating group:", groupData);
        setIsLoading(true);
        console.log("Group data :- ", groupData);
        const response = await axios.post('api/group/new', groupData);
        const data = response.data.data;
        console.log("Data :- ", data);
        // setIsLoading(false);
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Group created successfully!");
        }, 1000);
        getGroups();
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
                {groups.map((group) => (
                    <GroupCard  title={group.title}  members={group.members} tasks={group.tasks} createdAt={group.createdAt} createdBy={group.createdBy}/>
                ))}
            </div>
            <CreateGroup 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleCreateGroup} 
            />
        </div>
    )
}