import React, {useState, useEffect} from "react";
import Btns from "../component/ui/Btns";
import TaskNumberCard from "../component/ui/TaskNumberCarc";
import HeadingTask from "../component/ui/HeadingTask";
import SearchBar from "../component/ui/SearchBar";
import CreateTaskModal from "../component/ui/CreateTaskModal";
import axios from "axios";

function Dashboard(){
    const [isLoading , setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dashboardData, setDashboardData] = useState({
        totalTasks : 0,
        completedTasks : 0,
        activeGroup : 0,
        totalUsers : 0,
    });
    const [pendingTasks, setPendingTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    
    useEffect(() => {
        getDashboardData();
        getTasks();
    }, []);

    const getDashboardData = async () => {
        try{
            const response = await  axios.get('/api/dashboardData');
            const data = response.data.data;
            // console.log("Data :- ", data);


            setDashboardData({
                totalTasks : data.totalTasks,
                completedTasks : data.completedTask,
                activeGroup : data.activeGroups,
                totalUsers : data.totalUsers,
            });

        }catch(error){
            console.log("Error :- ", error);
        }
    }
    
    const getTasks = async () => {
        try {
            const response = await axios.get('/api/task');
            const data = response.data.data;
            console.log("Tasks :- ", data);

            setPendingTasks(data.filter(task => task.status === "pending"));
            setInProgressTasks(data.filter(task => task.status === "in-progress"));
            setCompletedTasks(data.filter(task => task.status === "completed"));
        } catch (error) {
            console.log("Error :- ", error);
        }
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
                    <TaskNumberCard title="Total Tasks" total={dashboardData.totalTasks || 0} para="All active task" icons='CheckSquare'/>
                    <TaskNumberCard title="Completed" total={dashboardData.completedTasks || 0} para="Tasks completed this week" icons='CheckCheck'/>
                    <TaskNumberCard title="Active Group" total={dashboardData.activeGroup || 0} para="Working groups" icons='Users'/>  
                    <TaskNumberCard title="Total Users" total={dashboardData.totalUsers || 0} para="This week vs last week" icons='TrendingUp'/>
                </div>

                <div>
                    <SearchBar />
                </div>
                
                <div className="mt-6 flex flex-col gap-6">
                    <HeadingTask title="Pending" tasks={pendingTasks} />
                    <HeadingTask title="In Progress" tasks={inProgressTasks} />
                    <HeadingTask title="Completed" tasks={completedTasks} />
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