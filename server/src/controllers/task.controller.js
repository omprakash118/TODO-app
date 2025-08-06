const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/asyncHandler.js');


const getAllTask = asyncHandler(async (req,res) => {
    res.status(200).json({
        message : " Hello Bab from Get All Task"
    })
})

const createTask = asyncHandler(async (req,res) => {
    res.status(200).json({
        message : "Hello Bab from Create Task"
    })
})

const updateTask = asyncHandler(async (req,res) => {
    res.status(200).json({
        message : "Hello Bab from Update Task"
    })
})

const deleteTask = asyncHandler(async (req,res) => {
    res.status(200).json({
        message : "Hello Bab from Delete Task"
    })
})

module.exports = {
    getAllTask,
    createTask,
    deleteTask,
    updateTask
}