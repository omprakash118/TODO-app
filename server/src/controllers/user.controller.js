const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');


const getAllUser = asyncHandler(async (req,res) => {
    res.status(200).json({
        message : "Hello bab from the Get All User"
    })
})

const getUserById = asyncHandler(async (req,res) => {
    res.status(200).json({
        message : "Hello bab from the GEt User By Id"
    })
})

const updateUserById = asyncHandler(async (req,res) => {
    res.status(200).json({
        message : "Hello bab from the Update User By ID"
    })
})

const deleteUser = asyncHandler(async (req,res) => {
    res.status(200).json({
        message : "Hello bab from the Delete User"
    })
})


module.exports = {
    updateUserById,
    getAllUser,
    deleteUser,
    getUserById
}