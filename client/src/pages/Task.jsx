import React, { useState, useEffect } from "react";
import Btns from "../component/ui/Btns";
import HeadingTask from "../component/ui/HeadingTask";
import SearchBar from "../component/ui/SearchBar";
import CreateTaskModal from "../component/ui/CreateTaskModal";
import axios from "axios";

export default function Task(){
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);


    useEffect(() => {
        getTasks();
    }, [])

    const getTasks = async () => {      
        const response = await axios.get('api/task');
        const data = response.data.data;
        setPendingTasks(data.filter(task => task.status === "pending"));
        setInProgressTasks(data.filter(task => task.status === "in-progress"));
        setCompletedTasks(data.filter(task => task.status === "completed"));
    }

    const handleCreateTask = (taskData) => {
        console.log("Creating task:", taskData);
        // Here you would typically send the data to your API
        // For now, we'll just log it
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log("Task created successfully!");
        }, 1000);
    };
    return(
        <div className="p-5">
            <div className="flex justify-between items-center" >
                <div>
                    <h1 className="text-[1.87rem] font-bold" >Tasks</h1>
                    <p className="text-gray-500 mt-[-5px]">Manage your tasks and track team productivity</p>
                </div>
                <div>
                    <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            + Create Task
                        </button>
                </div>
            </div>
            <div>
                <SearchBar />
            </div>
            <div className="mt-6 flex flex-col gap-6">
                <HeadingTask title="Pending" tasks={pendingTasks} />
                <HeadingTask title="In Progress" tasks={inProgressTasks} />
                <HeadingTask title="Completed" tasks={completedTasks} />
            </div>
            <CreateTaskModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateTask}
            />

        </div>
    )
}
