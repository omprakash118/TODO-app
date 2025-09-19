import React from "react";
import TaskCard from "./TaskCard";
import Notaskpresent from "./Notaskpresent";

function HeadingTask({
    title = '',
    tasks = []
}){
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row items-end gap-2 text-[#344256]">
                <h1 className="text-xl  font-semibold ">{title}</h1>
                <span className="bg-[#f3f4f6]  border-[#f3f4f6] border w-fit mb-1 items-center rounded-full  px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">{tasks.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {tasks.length > 0 ? (
                tasks.map((task) => (
                    <TaskCard 
                        key={task._id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        priority={task.priority}
                        groupTitle={task.group.title}
                        assignBy={task.createdBy.FirstName + " " + task.createdBy.LastName}
                    />
                ))
                ) : (
                    <Notaskpresent />
                )}
            </div>
        </div>
    );
}

export default HeadingTask;





// <TaskCard 
// title = 'Implement User Authentication'
// description = 'Set up login/logout functionality with JWT tokens'
// status = 'pending'
// priority = 'medium'
// groupTitle = 'Frontend Team'
// assignBy = 'Ompraksh'
// />
// <TaskCard 
// title = 'Implement User Authentication'
// description = 'Set up login/logout functionality with JWT tokens'
// status = 'pending'
// priority = 'medium'
// groupTitle = 'Frontend Team'
// assignBy = 'Ompraksh'
// />
// <TaskCard 
// title = 'Implement User Authentication'
// description = 'Set up login/logout functionality with JWT tokens'
// status = 'pending'
// priority = 'medium'
// groupTitle = 'Frontend Team'
// assignBy = 'Ompraksh'
// />
// <TaskCard 
// title = 'Implement User Authentication'
// description = 'Set up login/logout functionality with JWT tokens'
// status = 'pending'
// priority = 'medium'
// groupTitle = 'Frontend Team'
// assignBy = 'Ompraksh'
// />