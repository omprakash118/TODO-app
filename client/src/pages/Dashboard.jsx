import React, {useState} from "react";
import Btns from "../component/ui/Btns";
import TaskNumberCard from "../component/ui/TaskNumberCarc";
import HeadingTask from "../component/ui/HeadingTask";
import SearchBar from "../component/ui/SearchBar";
import CreateTaskModal from "../component/ui/CreateTaskModal";

function Dashboard(){
    const [isLoading , setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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

    return (
        <div className="p-5">
                {/* Top */}
                <div className="flex justify-between items-center" >
                    <div>
                        <h1 className="text-[1.87rem] font-bold" >Dashboard</h1>
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
               
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                    <TaskNumberCard title="Total Tasks" total={24} para="All active task" icons='CheckSquare'/>
                    <TaskNumberCard title="Completed" total={12} para="Tasks completed this week" icons='CheckCheck'/>
                    <TaskNumberCard title="Active Group" total={4} para="Working groups" icons='Users'/>  
                    <TaskNumberCard title="Productivity" total={'85%'} para="This week vs last week" icons='TrendingUp'/>
                </div>

                <div>
                    <SearchBar />
                </div>
                
                <div className="mt-6 flex flex-col gap-6">
                    <HeadingTask title="Pending" />
                    <HeadingTask title="In Progress" />
                    <HeadingTask title="Completed"/>
                </div>
                
                {/* Modal */}
                <CreateTaskModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateTask}
                />
        </div>
    )
};

export default Dashboard;