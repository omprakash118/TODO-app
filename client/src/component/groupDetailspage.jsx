import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, User, Calendar, Plus, CheckSquare, ChevronDown, PenBoxIcon } from 'lucide-react';
import { useNavigate , useParams } from 'react-router-dom';
import CreateTaskModal from './ui/CreateTaskModal';
import axios from 'axios';
import { useToastContext } from './ui/ToastProvider';
import AddGroupMembers from './ui/AddGroupMembers';

export default function GroupDetailsPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  // const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToastContext();
  const { groupID } = useParams();

  const [groupData, setGroupData] = useState({});
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isAddGroupMembersOpen, setIsAddGroupMembersOpen] = useState(false);

  useEffect(() => {
    const getGroupData = async () => {
      try {
        const response = await axios.get(`/api/group/${groupID}`);
        const data = response.data.data;  
        setGroupData(data);
        setMembers(data.members || []);
        setTasks(data.tasks || []);
      } catch (error) {
        console.error('Error fetching group data:', error);
        // Handle error appropriately - maybe show a toast or redirect
      }
    }
    getGroupData();
  }, [groupID, toast, isModalOpen]);


  // Function to handle date formatting
  const handleDate = (dateString) => {
    if (!dateString) return '';
    
    const inputDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Reset time to start of day for accurate comparison
    const inputDateOnly = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    
    // Calculate difference in days
    const diffTime = todayOnly - inputDateOnly;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays >= 2 && diffDays <= 6) {
        return `${diffDays} days ago`;
    } else {
        // Format as "Sep 4, 2025"
        return inputDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
        // setIsLoading(true);
        console.log("taskData which i am sending to create task :- ", taskData);
        const response = await axios.post("/api/task", taskData);

        // console.log("Response :- ", response);
        if(response.status === 201){
            // toast.success("Task created successfully!");
            console.log("Response :- ", response);
        }else{
            // toast.error("Failed to create task. Please try again.");
            console.log("Response :- ", response);
        }
    } catch (error) {
        console.log("Error :- ", error);
        // toast.error("Failed to create task. Please try again.");
    }finally {
        // setIsLoading(false);
    }
};

  const handleStatusChange = async (taskID, newStatus) => {
    try {
      // Update task status via API
      const response = await axios.patch(`/api/task/${taskID}`, { status: newStatus });
      
      if (response.data.success) {
        // Update local state
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task._id === taskID ? { ...task, status: newStatus } : task
          )
        );
        toast.success("Task status updated successfully");
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error("Failed to update task status");
      // Handle error appropriately - maybe show a toast
    }
    
    // Close dropdown after selection
    setOpenDropdowns(prev => ({ ...prev, [taskID]: false }));
  };

  const toggleDropdown = (taskId) => {
    setOpenDropdowns(prev => ({ 
      ...prev, 
      [taskId]: !prev[taskId] 
    }));
  };

  const closeAllDropdowns = () => {
    setOpenDropdowns({});
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const inlineEdit = () => {
    setIsAddGroupMembersOpen(true);
  }

  // const [tasks, setTasks] = useState(groupData.tasks);

  // Component to display assigned users
  const AssignedUsersDisplay = ({ assignedTo }) => {
    // Add safety check for undefined/null assignedTo
    if (!assignedTo || !Array.isArray(assignedTo)) {
      return (
        <div className="text-sm text-gray-400 italic">
          Unassigned
        </div>
      );
    }

    const maxVisible = 3;
    const visibleUsers = assignedTo.slice(0, maxVisible);
    const remainingCount = assignedTo.length - maxVisible;

    if (assignedTo.length === 0) {
      return (
        <div className="text-sm text-gray-400 italic">
          Unassigned
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 min-w-0 flex-wrap">
        <div className="flex -space-x-1 flex-shrink-0">
          {visibleUsers.map((user, index) => (
            <div
              key={user._id || `user-${index}`}
              className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium text-blue-700"
              title={`${user.FirstName || 'Unknown'} ${user.LastName || 'User'} `}
            >
              {(user.FirstName?.charAt(0) || 'U')}{(user.LastName?.charAt(0) || 'N')}
            </div>
          ))}
          {remainingCount > 0 && (
            <div
              className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium text-gray-600"
              title={`${remainingCount} more user${remainingCount > 1 ? 's' : ''}: ${assignedTo.slice(maxVisible).map(u => `${u.FirstName} ${u.LastName}`).join(', ')}`}
            >
              +{remainingCount}
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 truncate">
          {assignedTo.length} user{assignedTo.length > 1 ? 's' : ''}
        </div>
      </div>
    );
  };

  // Close dropdowns when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!event.target.closest('.custom-dropdown')) {
  //       closeAllDropdowns();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  return (
      <div className="p-5 max-w-7xl mx-auto ">
        
          {/* Back to Groups */}
          <div className= "flex items-center gap-2 mb-6">
            <button
              onClick={() => navigate('/group')}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span className={`text-sm`}>Back to Groups</span>
            </button>
          </div>
    
          {/* Group Information */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8 w-full">
            <div className=" min-w-0 w-full">
              <h1 className={`text-2xl lg:text-[1.87rem] font-bold text-gray-900 break-words`}>{groupData.title}</h1>
              <p className={`text-gray-500 mt-[-5px] mb-4 break-words text-sm`}>{"No description"}</p>
              
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 w-full">
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Users size={15} className="text-blue-600 flex-shrink-0" />
                  <span className="whitespace-nowrap">{members.length} Members</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <CheckSquare size={15} className="text-green-600 flex-shrink-0" />
                  <span className="whitespace-nowrap">{tasks.length} Tasks</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Calendar size={15} className="text-purple-600 flex-shrink-0" />
                  <span className={`hidden sm:inline whitespace-nowrap`}>Created {handleDate(groupData.createdAt)}</span>
                  <span className={`sm:hidden whitespace-nowrap`}>{handleDate(groupData.createdAt)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-2 text-sm bg-blue-600 w-full sm:w-auto text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2  justify-center flex-shrink-0"
            >
              <Plus size={15} />
              Create Task
            </button>
          </div>
    
          
          <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 w-full`}>
            <div className="flex flex-row justify-between items-center mb-6 ">

              <h2 className={`text-lg font-semibold text-gray-900 flex items-center gap-2`}>
                <Users size={15} className="text-blue-600 flex-shrink-0" />
                Team Information
              </h2>
              <button onClick={inlineEdit} className="hover:scale-[1.02]  hover:text-[#3c83f6]  hover:bg-gray-50  rounded-full  focus:scale-[0.98] transition-all duration-200 cursor-pointer p-1">
                <PenBoxIcon size={15} className="text-gray-900 hover:text-gray-600 transition-all duration-200 cursor-pointer"/>
              </button>
            </div>
            
            {/* Group Owner */}
            <div className="mb-6">
              <h3 className={`text-sm font-medium text-gray-700 mb-3 flex items-center gap-2`}>
                <User size={15} className="text-blue-600" />
                Group Owner
              </h3>
              <div className={`flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100 w-full`}>
                <div className={`w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <User size={15} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium text-gray-900 truncate`}>
                    {groupData.createdBy?.FirstName} {groupData.createdBy?.LastName}
                  </h3>
                  {/* <p className="text-sm text-gray-600">{groupData.createdBy || 'No Owner'}</p> */}
                </div>
                <span className={`px-3 py-1 text-xs bg-blue-100 text-blue-800 font-medium rounded-full flex-shrink-0`}>
                  Owner
                </span>
              </div>
            </div>
            {/* Team Members */}
            <div>
              <h3 className={`text-sm font-medium text-gray-700 mb-3 flex items-center gap-2`}>
                <Users size={15} className="text-green-600" />
                Team Members ({members.length})
              </h3>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3`}>
                {members.map((member, index) => (
                  <div key={member._id || `member-${index}`} className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100 min-w-0`}>
                    <div className={`w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <User size={15} className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden  break-words">
                            <h4 className={`font-medium text-gray-900 text-sm truncate`}>
                        {member.FirstName} {member.LastName}
                      </h4>
                      <p className={`text-xs text-gray-600 truncate`}>
                        {member.email}
                      </p>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full truncate`}>
                        {member.position || 'Member'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          
        <div className="mt-8 w-full">
            <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 w-full`}>
              <h2 className={`text-lg font-semibold text-gray-900 flex items-center gap-2`}>
                <CheckSquare size={15} className="text-purple-600 flex-shrink-0" />
                Group Tasks ({tasks.length})
              </h2>
              <div className={`text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded self-start sm:self-auto flex-shrink-0`}>
                <span className={`sm:hidden`}>← Scroll to see more →</span>
                <span className={`hidden sm:inline`}>Scroll horizontally to view all columns</span>
              </div>
            </div>
    
            {/* Task Table */}
            {tasks.length > 0 ? (
              <div className="w-full grid grid-cols-1">
              <div className="rounded-lg overflow-hidden w-full bg-white shadow-sm border border-gray-200">
                <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 transition-all duration-200">
                  <table className="w-full min-w-[1800px] border-collapse">
                    <thead className="rounded-lg">
                      <tr className="bg-[#ECF0F2] border-b border-gray-200">
                        <th className="w-80 px-6 py-3 text-left">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Task</span>
                          </div>
                        </th>
                        <th className="w-36 px-6 py-3 text-left">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Status</span>
                          </div>
                        </th>
                        <th className="w-36 px-6 py-3 text-left">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Priority</span>
                          </div>
                        </th>
                        <th className="w-48 px-6 py-3 text-left">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Assigned To</span>
                          </div>
                        </th>
                        <th className="w-36 px-6 py-3 text-left">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Assigned By</span>
                          </div>
                        </th>
                        <th className="w-36 px-6 py-3 text-left">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Due Date</span>
                          </div>
                        </th>
                        <th className="w-36 px-6 py-3 text-left">
                          <span className="text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <tr
                          key={task._id || `task-${index}`}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate" title={task.title}>
                                {task.title}
                              </div>
                              <div className="text-sm text-gray-500 truncate cursor-help" title={task.description}>
                                {task.description}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <AssignedUsersDisplay assignedTo={task.assignTo} />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-purple-100 border border-white rounded-full flex items-center justify-center text-xs font-medium text-purple-700 flex-shrink-0">
                                {task.createdBy?.FirstName?.charAt(0) || 'U'}{task.createdBy?.LastName?.charAt(0) || 'N'}
                              </div>
                              <div className="text-sm text-gray-900 truncate min-w-0" title={`${task.createdBy?.FirstName || 'Unknown'} ${task.createdBy?.LastName || 'User'}`}>
                                {task.createdBy?.FirstName || 'Unknown'} {task.createdBy?.LastName || 'User'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{handleDate(task.dueDate)}</td>
                          <td className="px-6 py-4">
                            <div className="relative custom-dropdown">
                              <button
                                type="button"
                                onClick={() => toggleDropdown(task._id || `task-${index}`)}
                                className={`flex items-center justify-between w-full px-3 py-2 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                  openDropdowns[task._id] 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-300 bg-white hover:border-gray-400'
                                }`}
                              >
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                                  {task.status}
                                </span>
                                <ChevronDown 
                                  size={14} 
                                  className={`text-gray-400 transition-transform duration-200 ${
                                    openDropdowns[task._id] ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                              
                              {openDropdowns[task._id] && (
                                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                                  <div className="py-1">
                                    {[
                                      { value: 'pending', label: 'Pending', color: 'bg-gray-100 text-gray-800' },
                                      { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
                                      { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' }
                                    ].map((option) => (
                                      <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleStatusChange(task._id, option.value)}
                                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 ${
                                          task.status === option.value ? 'bg-blue-50' : ''
                                        }`}
                                      >
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${option.color}`}>
                                          {option.label}
                                        </span>
                                      </button>
                                    ))}
                                  </div>  
                                </div>
                              )}
                            </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <div className="w-full max-w-md">
                  <div className="p-3 bg-white text-[#3442568c] h-44 col-span-4 shadow-[#c5c5c53f] shadow-sm rounded-[10px] border-[1px] border-[#e5e7eb] w-full flex flex-col gap-2">
                    <div className="flex justify-center items-center h-full gap-2 border-dashed border-gray-300 border-2 rounded-md">
                      <CheckSquare size={20} />
                      <h1 className="text-lg font-semibold">No tasks available</h1>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
    
          
          <CreateTaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateTask}
            isGroupPage={true}
            groupID={groupID}
          />
          <AddGroupMembers
            isOpen={isAddGroupMembersOpen}
            onClose={() => setIsAddGroupMembersOpen(false)}
            groupID={groupID}
            currentMembers={members}
            onMembersUpdate={() => setMembers(members)}
          />
        </div> 
  );
}



