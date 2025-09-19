const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/asyncHandler.js');
const Task = require("../models/task.models.js");
const Group = require("../models/group.models.js");
const User = require("../models/user.models.js");

const getDashboardData = asyncHandler(async (req,res) => {
    const tasks = await Task.find();

    const completedTasks = tasks.filter(task => task.status === "completed");
    const users = await User.find();
    const groups = await Group.find();

    const dashboardData = {
        totalTasks : tasks.length,
        completedTask : completedTasks.length,
        activeGroups : groups.length,
        totalUsers : users.length,
    }

    return res.status(200).json(new ApiResponse(200, dashboardData , "Dashboard data fetched successfully"));
});

module.exports = {
    getDashboardData
}