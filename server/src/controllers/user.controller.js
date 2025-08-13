const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/user.models.js');

// This is for get All Users
const getAllUser = asyncHandler(async (req,res) => {
    const users = await User.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, users , "All Users Find Successfully"));
})

const getUserById = asyncHandler(async (req,res) => {

    const { userId } = req.params;
    const user = await User.findById(userId).select('-password -refreshToken');

    if(!user){
        throw new ApiError(404, "User Not found");
    }

    return res.status(200).json(new ApiResponse(200, user , "User fetch successfully"));
})

const updateUserById = asyncHandler(async (req,res) => {
    const { userID } = req.params ;
    const updateData = req.body ;

    console.log("User ID :- ", userID);
    console.log("Updated Date :- ", updateData);
    const updateUser = await User.findByIdAndUpdate(userID, updateData, { new : true}).select("-password -refreshToken");

    if(!updateData){
        throw new ApiError(404, "User nor found");
    }
    return res.status(200).json(new ApiResponse(200, updateUser , "The User Data updated successfully"));
})

const deleteUser = asyncHandler(async (req,res) => {

    const {userId} = req.params;

    const deleteUser = await User.findByIdAndDelete(userId);

    if(!deleteUser){
        throw new ApiError(404, "User not deleted");
    }

    return res.status(200).json(new ApiResponse(200 , {} , "User Deleted successfully"));
})


module.exports = {
    updateUserById,
    getAllUser,
    deleteUser,
    getUserById
}