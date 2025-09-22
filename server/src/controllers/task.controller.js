const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/asyncHandler.js');
const Task = require("../models/task.models.js");
const Group = require("../models/group.models.js");
const User = require('../models/user.models.js');

const getAllTask = asyncHandler(async (req,res) => {
    const task = await Task.find()
        .populate("group", "title")
        .populate("assignTo", "FirstName LastName")
        .populate("createdBy", "FirstName LastName");
    ;
    return res.status(200).json(new ApiResponse(200, task ,"ALL Task Find Successfully"));
});

const createTask = asyncHandler(async (req,res) => {

    const io = req.app.get("io");
    // const { groupID } = req.params;
    const { groupID, title, description , priority , status , dueDate , assignTo, createdBy } = req.body;
    // const userID = req.user._id;
    // const userID = "689b89feb105348cf9ad3e53";

    // 1. Find the Group
    const group = await Group.findById(groupID);
    if(!group) throw new ApiError(403, "Group Not Found");

    // // 2. Check the User
    // if(group.createdBy.toString() !== userID.toString()){
    //     throw new ApiError(403, "Only group creater can assign tasks");
    // }

    const invalidUser = assignTo.filter(uid => 
        !group.members.map(m => m.toString()).includes(uid)
    );

    if(invalidUser.length > 0) throw new ApiError(400, "Some assigned users are not group members");

    const task = await Task.create({
        title,
        description,
        priority,
        status,
        dueDate,
        assignTo,
        group : groupID,
        createdBy,
    })

    await User.updateMany(
      { _id : { $in : assignTo }},
      { $addToSet : { tasks : task._id}}
    );

    await Group.findByIdAndUpdate(groupID, {
        $addToSet : { tasks : task._id}
    });

    const populateTask = await Task.findById(task._id)
            .populate("group", "title")
            .populate("assignTo", "FirstName LastName")
            .populate("createdBy", "FirstName LastName");

    io.emit("taskCreated", {
        message : "A new task was created",
        task : populateTask
    });
    return res.status(201).json(new ApiResponse(201, populateTask, "Task created successfully"));
});

// const updateTask = asyncHandler(async (req,res) => {

//     const { taskID } = req.params;
//     const updatedData = {...req.body};

//     const task = await Task.findById(taskID);
//     if(!task) throw new ApiError(404, "Task Not Found");

//     const group = await Group.findById(task.group);
//     if(!group) throw new ApiError(404, "Group Not Found");

//     const updatedOps = { $set : {}};

//     if(updatedData.assignTo){

//         const { add = [] , remove = [] } = updatedData.assignTo;
//         delete updatedData.assignTo;

//         const groupMembers = group.members.map(m => m.toString());

//         const invalidUser =  [...add , ...remove].filter(
//             uid => !groupMembers.includes(uid)
//         );

//         if(invalidUser.length > 0) throw new ApiError(400, "Some assigned user are not part of the group");

//         if(add.length > 0){
//             updatedOps.$addToSet = {
//                 ...(updatedOps.$addToSet || {}),
//                 assignTo : { $each : add }
//             }
//         }

//         if(remove.length > 0){
//             updatedOps.$pull = {
//                 ...(updatedOps.$pull || {}),
//                 assignTo : { $in : remove }
//             }
//         }

//     }

//     Object.keys(updatedData).forEach(key => {
//         updatedOps.$set[key] = updatedData[key];
//     });

//     const updatedTask = await Task.findByIdAndUpdate(taskID , updatedOps , { $new : true})
//         .populate("group", "title")
//         .populate("assignTo", "FirstName LastName")
//         .populate("createdBy", "FirstName LastName");
    
//     return res.status(200).json(new ApiResponse(200, updatedTask , "Task Updated Successfully"));
// });


// ✅ Update task controller
const updateTask = asyncHandler(async (req, res) => {
  const { taskID } = req.params;
  const { title, description, priority, status, dueDate, assignTo } = req.body;

  let updatedTask;

  // 1. Update normal fields (not assignTo)
  if (title || description || priority || status || dueDate) {
    updatedTask = await Task.findByIdAndUpdate(
      taskID,
      { title, description, priority, status, dueDate },
      { new: true, runValidators: true }
    );
  }

  // 2. Handle assignTo additions
  if (assignTo?.add?.length) {
    updatedTask = await Task.findByIdAndUpdate(
      taskID,
      { $addToSet: { assignTo: { $each: assignTo.add } } },
      { new: true }
    );

    await User.updateMany(
      { _id : { $in : assignTo.add }},
      { $addToSet : { tasks : taskID }}
    )
  }

  // 3. Handle assignTo removals
  if (assignTo?.remove?.length) {
    updatedTask = await Task.findByIdAndUpdate(
      taskID,
      { $pull: { assignTo: { $in: assignTo.remove } } },
      { new: true }
    );

    await User.updateMany(
      { _id : { $in : assignTo.remove }},
      { $pull : { tasks : taskID } }
    )
  }

  if (!updatedTask) {
    throw new ApiError(404, "Task not found");
  }

  updatedTask = await Task.findById(taskID) 
    .populate("group", "title")
    .populate("assignTo", "FirstName LastName")
    .populate("createdBy", "FirstName LastName");

  return res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: updatedTask,
  });
});

const deleteTask = asyncHandler(async (req,res) => {

    const { taskID } =  req.params;
    if(!taskID) throw new ApiError(404, "Task Id is required");
    const deletetasks = await Task.findById(taskID);

    await User.updateMany(
      { _id : { $in : deletetasks.assignTo}},
      { $pull : { tasks : taskID } }
    )

    const deleteTask = await Task.findByIdAndDelete(taskID);
    if(!deleteTask) throw new ApiError(400, "Task Not deleted");

    return res.status(200).json(new ApiResponse(200, deleteTask , "Task Deleted successfully"));
});

module.exports = {
    getAllTask,
    createTask,
    deleteTask,
    updateTask
}